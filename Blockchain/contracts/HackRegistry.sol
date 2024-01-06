// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import {IERC20} from "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import {Metadata} from "./libraries/Metadata.sol";

// External Libraries
import {IHatsModuleFactory} from "./interfaces/IHatsModuleFactory.sol";
import {IHats} from "./interfaces/IHats.sol";
import {IAllo} from "./interfaces/IAllo.sol";
import {IAnchor} from "./interfaces/IAnchor.sol";
import {RegistryIndexer} from "./libraries/RegistryIndexer.sol";
import {IRegistry} from "./interfaces/IRegistry.sol";
import {Clone} from "./libraries/Clone.sol";

contract HackRegistry is RegistryIndexer {
    IHats public Hats;
    IHatsModuleFactory public HatsModuleFactory;
    IAllo public Allo;
    IAnchor public Anchor;

    address internal module;
    address internal strategy_implementation;

    uint256 deployNonce;

    bytes initData;

    constructor(
        address _hatsModuleFactory,
        address _registry,
        address _hats,
        address _lockupLinear,
        address _allo,
        address _module
    ) RegistryIndexer(_registry) {
        HatsModuleFactory = IHatsModuleFactory(_hatsModuleFactory);
        Hats = IHats(_hats);
        Allo = IAllo(_allo);
        module = _module;

        initData = abi.encode(address(this), _lockupLinear, _hats);
    }

    struct Profile {
        address anchor;
        uint256 topHatId;
        uint256 poolManagerHatId;
        uint256 poolReviewerHatId;
    }

    uint256 public _nonce; // Nonce used to generate the 'anchor' address

    mapping(bytes32 => Profile) public profiles;

    mapping(uint256 => bytes32) public poolIdToProfileId;

    /// ====================================
    /// ==== External/Public Functions =====
    /// ====================================

    /// @dev Creates a new 'Profile' and returns the 'profileId' of the new profile
    ///
    /// Note: The 'name' and 'nonce' are used to generate the 'anchor' address
    ///
    /// Requirements: None, anyone can create a new profile
    ///
    /// @param _name The name to use to generate the 'anchor' address
    /// @param _metadata The 'Metadata' to use to generate the 'anchor' address
    /// @return profileId The 'profileId' of the new profile
    function createProfile(
        string memory _name,
        Metadata memory _metadata
    ) external returns (bytes32 profileId) {
        address[] memory _members;

        profileId = Registry.createProfile(++_nonce, _name, _metadata, address(this), _members);

        uint256[4] memory hatIDs = CreateProfileHats();

        profiles[profileId] = Profile({
            anchor: Registry.getProfileById(profileId).anchor,
            topHatId: hatIDs[1],
            poolManagerHatId: hatIDs[2],
            poolReviewerHatId: hatIDs[3]
        });

        ProfileRegistration(profileId, _name, _metadata.pointer, hatIDs[1], hatIDs[2], hatIDs[3]);
    }

    function createPoolWithQVHatsSablierStrategy(
        bytes32 _profileId,
        InitializeParams memory initializeParams,
        address _token,
        uint256 _amount,
        Metadata memory _metadata
    ) external {
        address[] memory _managers;

        Profile memory profile = profiles[_profileId];

        uint256 topHatId = profile.topHatId;

        if (!Hats.isWearerOfHat(msg.sender, topHatId)) {
            revert("You are not the owner of this hat");
        }

        initializeParams.params.reviewerHatId = profile.poolReviewerHatId;
        initializeParams.params.poolManagerHatId = profile.poolManagerHatId;
        initializeParams.params.data = initData;

        IERC20(_token).transferFrom(msg.sender, address(this), _amount);

        IERC20(_token).approve(address(Allo), _amount);

        address strategy = Clone.createClone(strategy_implementation, deployNonce++);

        bytes memory _initStrategyData = abi.encode(initializeParams);

        uint256 poolID = Allo.createPoolWithCustomStrategy(
            _profileId,
            strategy,
            _initStrategyData,
            _token,
            _amount,
            _metadata,
            _managers
        );

        poolIdToProfileId[poolID] = _profileId;

        PoolRegistration(
            initializeParams.params,
            initializeParams.maxVoiceCreditsPerAllocator,
            poolID,
            strategy,
            _profileId,
            _metadata.pointer
        );
    }

    function updatePoolMetadata(uint256 _poolId, Metadata memory _metadata) external {
        bytes32 _profileId = poolIdToProfileId[_poolId];
        uint256 profileAdminHat = profiles[_profileId].topHatId;

        if (!Hats.isWearerOfHat(msg.sender, profileAdminHat)) {
            revert("You are not the owner of this hatt");
        }

        Allo.updatePoolMetadata(_poolId, _metadata);
    }

    function registerRecipient(
        uint256 _poolId,
        bytes32 _profileId,
        Metadata memory _metadata
    ) external {
        uint256 profileAdminHat = profiles[_profileId].topHatId;

        if (!Hats.isWearerOfHat(msg.sender, profileAdminHat)) {
            revert("You are not the owner of this hat");
        }

        bytes memory _data = abi.encode(_profileId, _metadata);

        Allo.registerRecipient(_poolId, _data);
    }

    function callWithAnchor(
        bytes32 _profileId,
        address _target,
        uint256 _value,
        bytes memory _data
    ) external {
        Profile memory profile = profiles[_profileId];

        address anchor = profile.anchor;
        uint256 profileAdminHat = profile.topHatId;

        if (!Hats.isWearerOfHat(msg.sender, profileAdminHat)) {
            revert("You are not the owner of this hat");
        }

        IAnchor(anchor).execute(_target, _value, _data);
    }

    /// ONLY POOL STRATEGY CAN CALL THESE FUNCTIONS

    function RegisterProfile(address profileID, uint256 poolID, string memory metadata) external {
        _checkCallerIsPoolStrategy(poolID);

        RegisterProfileInPool(profileID, poolID, metadata);
    }

    function InsertReviews(
        uint256 poolID,
        uint8 round,
        address reviewedBy,
        uint8[] memory status,
        address[] memory recipientIDs
    ) external {
        _checkCallerIsPoolStrategy(poolID);

        InsertReviewsToPool(poolID, round, reviewedBy, status, recipientIDs);
    }

    function InsertAllocation(
        uint256 poolID,
        address allocationFrom,
        uint256 voteAmount,
        address recipientID
    ) external {
        _checkCallerIsPoolStrategy(poolID);

        InsertAllocationToPool(poolID, allocationFrom, voteAmount, recipientID);
    }

    function InsertDistributions(
        uint256 poolID,
        uint256[] memory distributionAmount,
        uint256[] memory streamID,
        address[] memory recipientIDs
    ) external {
        _checkCallerIsPoolStrategy(poolID);

        InsertDistributionsToPool(poolID, distributionAmount, streamID, recipientIDs);
    }

    function _checkCallerIsPoolStrategy(uint256 _poolId) internal view {
        address strategy = address(Allo.getPool(_poolId).strategy);
        if (strategy != msg.sender) {
            revert("You are not the owner of this poolll");
        }
    }

    /// =============HATS UTIL FUNC==================

    function CreateProfileHats() internal returns (uint256[4] memory hatIds) {
        address ThisContract = address(this);

        uint256 topHatId = Hats.mintTopHat(ThisContract, "", "");

        address toggle = 0x0000000000000000000000000000000000004A75;

        hatIds[0] = topHatId;

        string memory emptyData;
        for (uint8 i = 1; i < 4; i++) {
            uint256 prev = i - 1;
            uint256 nextLvLHatId = Hats.buildHatId(hatIds[prev], 1);
            address eligibility = HatsModuleFactory.createHatsModule(
                module,
                nextLvLHatId,
                abi.encode(topHatId),
                bytes(emptyData)
            );

            hatIds[i] = Hats.createHat(
                hatIds[prev],
                emptyData,
                i == 1 ? 1 : type(uint16).max,
                eligibility,
                toggle,
                false,
                emptyData
            );

            Hats.mintHat(hatIds[i], msg.sender);
        }
    }

    function getProfileData(
        bytes32 _profileId
    ) external view returns (IRegistry.Profile memory profile) {
        profile = Registry.getProfileById(_profileId);
    }

    function setPoolStrategyImplementation(address _strategy_implementation) external {
        strategy_implementation = _strategy_implementation;
    }

    function getTime() external view returns (uint256) {
        return block.timestamp;
    }
}
