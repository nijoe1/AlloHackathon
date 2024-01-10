// SPDX-License-Identifier: AGPL-3.0-only
pragma solidity 0.8.19;

// Sablier External Contracts
import {ReentrancyGuard} from "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import {IERC20} from "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import {SafeERC20} from "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import {ISablierV2LockupLinear} from "@sablier/v2-core/src/interfaces/ISablierV2LockupLinear.sol";
import {Broker, LockupLinear} from "@sablier/v2-core/src/types/DataTypes.sol";

// External Hats Interface
import {IHats} from "../interfaces/IHats.sol";

// Interfaces
import {IAllo} from "../interfaces/IAllo.sol";

import {IRegistry} from "../interfaces/IRegistry.sol";
// Core Contracts
import {BaseStrategy} from "../BaseStrategy.sol";
// // Internal Libraries
import {Types, Metadata, IRegistryIndexer} from "../interfaces/Types.sol";

// ⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⣾⣿⣷⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣼⣿⣿⣷⣄⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢸⣿⣿⣿⣗⠀⠀⠀⢸⣿⣿⣿⡯⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
// ⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⣿⣿⣿⣿⣷⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣼⣿⣿⣿⣿⣿⡄⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢸⣿⣿⣿⣗⠀⠀⠀⢸⣿⣿⣿⡯⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
// ⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢸⣿⣿⣿⣿⣿⣿⡄⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣸⣿⣿⣿⢿⣿⣿⣿⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢸⣿⣿⣿⣗⠀⠀⠀⢸⣿⣿⣿⡯⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
// ⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠘⣿⣿⣿⣿⣿⣿⣿⣄⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣰⣿⣿⣿⡟⠘⣿⣿⣿⣷⡀⠀⠀⠀⠀⠀⠀⠀⠀⢸⣿⣿⣿⣗⠀⠀⠀⢸⣿⣿⣿⡯⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
// ⠀⠀⠀⠀⠀⠀⠀⠀⣀⣴⣾⣿⣿⣿⣿⣾⠻⣿⣿⣿⣿⣿⣿⣿⡆⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢠⣿⣿⣿⡿⠀⠀⠸⣿⣿⣿⣧⠀⠀⠀⠀⠀⠀⠀⠀⢸⣿⣿⣿⣗⠀⠀⠀⢸⣿⣿⣿⡯⠀⠀⠀⠀⠀⠀⢀⣠⣴⣴⣶⣶⣶⣦⣦⣀⡀⠀⠀⠀⠀⠀⠀
// ⠀⠀⠀⠀⠀⠀⠀⣴⣿⣿⣿⣿⣿⣿⡿⠃⠀⠙⣿⣿⣿⣿⣿⣿⣿⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢠⣿⣿⣿⣿⠁⠀⠀⠀⢻⣿⣿⣿⣧⠀⠀⠀⠀⠀⠀⠀⢸⣿⣿⣿⣗⠀⠀⠀⢸⣿⣿⣿⡯⠀⠀⠀⠀⣠⣾⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣶⡀⠀⠀⠀⠀
// ⠀⠀⠀⠀⠀⢀⣾⣿⣿⣿⣿⣿⣿⡿⠁⠀⠀⠀⠘⣿⣿⣿⣿⣿⡿⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⣾⣿⣿⣿⠃⠀⠀⠀⠀⠈⢿⣿⣿⣿⣆⠀⠀⠀⠀⠀⠀⢸⣿⣿⣿⣗⠀⠀⠀⢸⣿⣿⣿⡯⠀⠀⠀⣰⣿⣿⣿⡿⠋⠁⠀⠀⠈⠘⠹⣿⣿⣿⣿⣆⠀⠀⠀
// ⠀⠀⠀⠀⢀⣾⣿⣿⣿⣿⣿⣿⡿⠀⠀⠀⠀⠀⠀⠈⢿⣿⣿⣿⠃⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣾⣿⣿⣿⠏⠀⠀⠀⠀⠀⠀⠘⣿⣿⣿⣿⡄⠀⠀⠀⠀⠀⢸⣿⣿⣿⣗⠀⠀⠀⢸⣿⣿⣿⡯⠀⠀⢰⣿⣿⣿⣿⠁⠀⠀⠀⠀⠀⠀⠀⠘⣿⣿⣿⣿⡀⠀⠀
// ⠀⠀⠀⢠⣿⣿⣿⣿⣿⣿⣿⣟⠀⡀⢀⠀⡀⢀⠀⡀⢈⢿⡟⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣼⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡄⠀⠀⠀⠀⢸⣿⣿⣿⣗⠀⠀⠀⢸⣿⣿⣿⡯⠀⠀⢸⣿⣿⣿⣗⠀⠀⠀⠀⠀⠀⠀⠀⠀⣿⣿⣿⣿⡇⠀⠀
// ⠀⠀⣠⣿⣿⣿⣿⣿⣿⡿⠋⢻⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣷⣶⣄⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣸⣿⣿⣿⡿⢿⠿⠿⠿⠿⠿⠿⠿⠿⠿⢿⣿⣿⣿⣷⡀⠀⠀⠀⢸⣿⣿⣿⣗⠀⠀⠀⢸⣿⣿⣿⡯⠀⠀⠸⣿⣿⣿⣷⡀⠀⠀⠀⠀⠀⠀⠀⢠⣿⣿⣿⣿⠂⠀⠀
// ⠀⠀⠙⠛⠿⠻⠻⠛⠉⠀⠀⠈⢿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣷⣄⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣰⣿⣿⣿⣿⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢿⣿⣿⣿⣧⠀⠀⠀⢸⣿⣿⣿⣗⠀⠀⠀⢸⣿⣿⣿⡯⠀⠀⠀⢻⣿⣿⣿⣷⣀⢀⠀⠀⠀⡀⣰⣾⣿⣿⣿⠏⠀⠀⠀
// ⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠈⠛⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡄⠀⠀⠀⠀⠀⠀⠀⠀⠀⢰⣿⣿⣿⣿⠃⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠘⣿⣿⣿⣿⣧⠀⠀⢸⣿⣿⣿⣗⠀⠀⠀⢸⣿⣿⣿⡯⠀⠀⠀⠀⠹⢿⣿⣿⣿⣿⣾⣾⣷⣿⣿⣿⣿⡿⠋⠀⠀⠀⠀
// ⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠈⠙⠙⠋⠛⠙⠋⠛⠙⠋⠛⠙⠋⠃⠀⠀⠀⠀⠀⠀⠀⠀⠠⠿⠻⠟⠿⠃⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠸⠟⠿⠟⠿⠆⠀⠸⠿⠿⠟⠯⠀⠀⠀⠸⠿⠿⠿⠏⠀⠀⠀⠀⠀⠈⠉⠻⠻⡿⣿⢿⡿⡿⠿⠛⠁⠀⠀⠀⠀⠀⠀
//                    allo.gitcoin.co

/// @title QV_Hat_x_Sablier_BaseStrategy
/// @notice Base strategy for quadratic voting strategies
/// @author @thelostone-mc <aditya@gitcoin.co>, @0xKurt <kurt@gitcoin.co>, @codenamejason <jason@gitcoin.co>, @0xZakk <zakk@gitcoin.co>, @nfrgosselin <nate@gitcoin.co>
abstract contract QVHatsSablierStrategyBase is BaseStrategy, Types {
    /// ======================
    /// ======= Storage ======
    /// ======================

    // slot 0
    IRegistryIndexer public registryIndexer;

    // slot 1
    /// @notice Sablier lockup linear contract
    ISablierV2LockupLinear public lockupLinear;

    // slot 2
    /// @notice Hats protocol contract
    IHats public hats;

    // slot 3
    /// @notice The registry contract
    IRegistry public _registry;

    // slot 4
    /// @notice The number of votes required to review a recipient
    uint256 public voteThreshold;

    // slot 5
    /// @notice Wearer of HatId is allowed to review recipients projects
    uint256 public reviewerHatId;

    // slot 6
    /// @notice Wearer of HatId is allowed to allocate and review recipients projects
    uint256 public poolManagerHatId;

    // slot 7
    /// @notice The percentage of the total voice credits that can be allocated in round one
    uint8 public roundOnePercentage;
    /// @notice The start and end times for registrations and allocations
    /// @dev The values will be in milliseconds since the epoch
    uint40 public registrationStartTime;
    uint40 public registrationEndTime;
    uint40 public allocationStartTime;
    uint40 public allocationEndTime;
    // When the roundOneDistribution is over, the projects will start working
    uint40 public projectsWorkingStartTime;
    uint40 public projectsWorkingDuration;
    // Projects Working End Time = projectsWorkingStartTime + projectsWorkingDuration

    // slot 8
    uint40 public projectsOutComeReviewDuration;
    // Projects Outcome Review End Time = projectsWorkingStartTime + projectsWorkingDuration + projectsOutComeReviewDuration

    // slot 9
    /// @notice The total number of votes cast for all recipients
    uint256 public totalRecipientVotes;

    // slot 10-11
    /// @notice See https://docs.sablier.com/concepts/protocol/fees#broker-fees
    Broker public broker;

    // slot 12
    /// @notice The details of the recipient are returned using their ID
    /// @dev recipientId => Recipient
    mapping(address => Recipient) public recipients;

    // slot 13
    /// @notice The details of the allocator are returned using their address
    /// @dev allocator address => Allocator
    mapping(address => Allocator) public allocators;

    // slot 14
    // recipientId -> status -> count
    mapping(address => mapping(Status => uint256)) public reviewsByStatus;

    // slot 15
    // recipientId -> reviewer -> status
    mapping(address => mapping(address => Status)) public reviewedByReviewer;

    /// ====================================
    /// ========== Constructor =============
    /// ====================================

    constructor(address _allo, string memory _name) BaseStrategy(_allo, _name) {}

    /// ====================================
    /// =========== Initialize =============
    /// ====================================

    /// @notice Initialize the strategy
    /// @param _poolId The ID of the pool
    /// @param _data The initialization data for the strategy
    function initialize(uint256 _poolId, bytes memory _data) external virtual override {
        InitializeParamsQVHatsSablier memory initializeParams = abi.decode(
            _data,
            (InitializeParamsQVHatsSablier)
        );
        __QVHatsSablierStrategyBase_init(_poolId, initializeParams);
        emit Initialized(_poolId, _data);
    }

    /// @notice Internal initialize function
    /// @param _poolId The ID of the pool
    /// @param _params The initialize params for the strategy
    function __QVHatsSablierStrategyBase_init(
        uint256 _poolId,
        InitializeParamsQVHatsSablier memory _params
    ) internal {
        __BaseStrategy_init(_poolId);

        address _registryIndexer;
        address _lockupLinear;
        address _hats;

        (_registryIndexer, _lockupLinear, _hats) = abi.decode(
            _params.data,
            (address, address, address)
        );

        registryIndexer = IRegistryIndexer(_registryIndexer);

        lockupLinear = ISablierV2LockupLinear(_lockupLinear);

        hats = IHats(_hats);

        _registry = allo.getRegistry();

        voteThreshold = _params.voteThreshold;

        reviewerHatId = _params.reviewerHatId;

        poolManagerHatId = _params.poolManagerHatId;

        if (_params.roundOnePercentage > 100) revert INVALID_ROUND_ONE_PERCENTAGE();

        roundOnePercentage = _params.roundOnePercentage;

        registrationStartTime = uint40(block.timestamp) + _params.registrationBeginsIn;
        registrationEndTime = registrationStartTime + _params.registrationDuration;
        allocationStartTime = registrationEndTime;
        allocationEndTime = allocationStartTime + _params.allocationDuration;
        projectsWorkingDuration = _params.projectsWorkingDuration;
        projectsOutComeReviewDuration = _params.projectsOutComeReviewDuration;
    }

    /// @notice Submit application to pool
    /// @dev The '_data' parameter is encoded as follows:
    ///     - If registryGating is false, then the data is encoded as (address registryAnchor, Metadata metadata)
    /// @param _data The data to be decoded
    /// @param _sender The sender of the transaction
    /// @return recipientId The ID of the recipient
    function _registerRecipient(
        bytes memory _data,
        address _sender
    ) internal virtual override returns (address recipientId) {
        // make sure the pool is active and the registration has not ended
        // Otherwise, revert
        _checkOnlyActiveRegistration();

        bytes32 profileID;
        Metadata memory metadata;

        (profileID, metadata) = abi.decode(_data, (bytes32, Metadata));

        recipientId = _registry.getProfileById(profileID).anchor;

        if (recipientId == address(0)) {
            recipientId = _sender;
        } else {
            // If not EOA and using registry anchor, the ID of the recipient must be a profile member
            if (!_isProfileMember(recipientId, _sender)) revert UNAUTHORIZED();
        }
        // make sure metadata are provided
        if ((bytes(metadata.pointer).length == 0 || metadata.protocol == 0)) {
            revert INVALID_METADATA();
        }

        Recipient storage recipient = recipients[recipientId];

        // update the recipients data
        recipient.metadata = metadata;

        Status currentStatus = recipient.recipientStatus;

        if (currentStatus == Status.None) {
            // recipient registering new application
            recipient.recipientStatus = Status.Pending;
            registryIndexer.RegisterProfile(
                recipientId,
                poolId,
                // Proposal metadata pointer
                metadata.pointer
            );
        } else if (currentStatus == Status.Pending) {
            // recipient updating pending application
            // TODO CREATE UPDATE PROFILE REGISTRY INDEXER FUNCTION
        }
    }

    /// @notice Review recipient(s) application(s)
    /// @dev You can review multiple recipients at once or just one. This can only be called by a pool manager and
    ///      only during active registration.
    /// @param _recipientIds Ids of the recipients
    /// @param _recipientStatuses Statuses of the recipients
    function reviewRecipients(
        address[] calldata _recipientIds,
        uint8[] calldata _recipientStatuses
    ) external {
        // make sure the sender is a pool Reviewer
        // Admin and Pool Managers can also review recipients
        _checkOnlyPoolReviewer(msg.sender);

        uint8 reviewRound = getReviewPeriod();

        if (reviewRound == 0) revert("Review periods have not started or ended");

        // make sure the arrays are the same length
        uint256 recipientLength = _recipientIds.length;
        if (recipientLength != _recipientStatuses.length) revert INVALID();

        for (uint256 i; i < recipientLength; ) {
            Status recipientStatus = Status(_recipientStatuses[i]);
            address recipientId = _recipientIds[i];
            Recipient storage recipient = recipients[recipientId];

            if (reviewRound == 1) {
                // Reviewer Status must be either Accepted or Rejected on round 1
                if (recipientStatus != Status.Accepted && recipientStatus != Status.Rejected) {
                    revert("Status must be either Accepted or Rejected on round 1");
                }
                // if the recipient is not in Pending then revert
                // The recipient has not registered yet or has already been reviewed
                if (recipient.recipientStatus != Status.Pending) {
                    revert("recipient is not in Pending");
                }

                if (reviewedByReviewer[recipientId][msg.sender] != Status.None) {
                    revert("You cannot review a recipient twice");
                }
            } else if (reviewRound == 2) {
                // Reviewer Voted Status on round 2 must be only Canceled
                if (recipientStatus != Status.Canceled) {
                    revert("Reviewer Voted Status on round 2 must be only Canceled ");
                }
                // Cannot cancel a recipient that has not been accepted to round 1
                if (recipient.recipientStatus != Status.Accepted) {
                    revert("Cannot cancel a recipient that has not been accepted to round 1");
                }

                if (reviewedByReviewer[recipientId][msg.sender] == Status.Canceled) {
                    revert("You cannot cancel a recipient twice");
                }
            } else {
                revert("Review periods has ended");
            }
            // track the review cast for the recipient and update status counter
            reviewedByReviewer[recipientId][msg.sender] = recipientStatus;
            reviewsByStatus[recipientId][recipientStatus]++;

            // update the recipient status if the review threshold has been reached
            if (reviewsByStatus[recipientId][recipientStatus] >= voteThreshold) {
                recipient.recipientStatus = recipientStatus;
            }
            unchecked {
                ++i;
            }
        }

        registryIndexer.InsertReviews(
            poolId,
            reviewRound,
            msg.sender,
            _recipientStatuses,
            _recipientIds
        );
    }

    /// @notice Allocate voice credits to a recipient
    /// @dev This can only be called during active allocation period
    /// @param _allocator The allocator details
    /// @param _recipient The recipient details
    /// @param _recipientId The ID of the recipient
    /// @param _voiceCreditsToAllocate The voice credits to allocate to the recipient
    /// @param _sender The sender of the transaction
    function _qv_allocate(
        Allocator storage _allocator,
        Recipient storage _recipient,
        address _recipientId,
        uint256 _voiceCreditsToAllocate,
        address _sender
    ) internal {
        // make sure the pool is active and the allocation has not ended
        _checkOnlyActiveAllocation();

        // update the allocator voice credits
        _allocator.voiceCredits += _voiceCreditsToAllocate;

        // creditsCastToRecipient is the voice credits used to cast a vote to the recipient
        // votesCastToRecipient is the actual votes cast to the recipient
        uint256 creditsCastToRecipient = _allocator.voiceCreditsCastToRecipient[_recipientId];
        uint256 votesCastToRecipient = _allocator.votesCastToRecipient[_recipientId];

        // get the total credits and calculate the vote result
        uint256 totalCredits = _voiceCreditsToAllocate + creditsCastToRecipient;
        // determine actual votes cast
        uint256 voteResult = _sqrt(totalCredits * 1e18);

        // update the values
        voteResult -= votesCastToRecipient;
        totalRecipientVotes += voteResult;
        _recipient.totalVotesReceived += voteResult;

        _allocator.voiceCreditsCastToRecipient[_recipientId] += _voiceCreditsToAllocate;
        _allocator.votesCastToRecipient[_recipientId] += voteResult;

        registryIndexer.InsertAllocation(poolId, _sender, voteResult, _recipientId);
    }

    /// @notice Distribute the upcoming milestone
    /// @param _sender The sender of the distribution
    function _distribute(
        address[] memory _recipientIds,
        bytes memory,
        address _sender
    ) internal virtual override {
        // make sure the sender is a pool admin
        _checkOnlyPoolAdmin(_sender);

        uint8 distributionPeriod = getDistributionPeriod();

        if (distributionPeriod == 0) revert("Distribution periods have not started or ended");
        if (distributionPeriod == 1) {
            projectsWorkingStartTime = uint40(block.timestamp);
            uint256 recipientLength = _recipientIds.length;
            uint256[] memory amounts = new uint256[](recipientLength);
            uint256[] memory streamIDs = new uint256[](recipientLength);
            for (uint256 i; i < recipientLength; ) {
                (amounts[i], streamIDs[i]) = _distributeRoundOneStream(_recipientIds[i]);
                unchecked {
                    i++;
                }
            }
            registryIndexer.InsertDistributions(poolId, distributionPeriod, amounts, streamIDs, _recipientIds);
            
        } else if (distributionPeriod == 2) {
            _distributeRoundTwo(_recipientIds, _sender);
        }
    }

    /// @notice Distribute the tokens to the recipient using Sablier Linear Lockup Stream contract
    /// @dev The '_sender' must be a pool manager and the allocation must have ended
    /// @param _recipientId The recipient ids
    function _distributeRoundOneStream(
        address _recipientId
    ) internal returns (uint128 amount, uint256 streamID) {
        Recipient memory recipient = recipients[_recipientId];
        IAllo.Pool memory pool = allo.getPool(poolId);

        PayoutSummary memory payout = _getPayout(_recipientId, "");

        amount = uint128(payout.amount);

        if (recipient.paidOut == PaidStatus.PaidStream) {
            revert("Recipient has already been paid out on round one");
        }

        if (!_isAcceptedRecipient(_recipientId) || amount == 0) {
            revert("Recipient is not accepted or amount is 0");
        }

        LockupLinear.CreateWithDurations memory params = LockupLinear.CreateWithDurations({
            sender: address(this),
            recipient: _recipientId,
            totalAmount: amount,
            asset: IERC20(pool.token),
            cancelable: false,
            transferable: true,
            durations: LockupLinear.Durations(0, projectsWorkingDuration),
            broker: broker
        });

        // Approve the Sablier contract to spend the pool tokens
        IERC20(pool.token).approve(address(lockupLinear), amount);
        // Start the stream
        streamID = lockupLinear.createWithDurations(params);

        recipient.paidOut = PaidStatus.PaidStream;
    }

    /// @notice Distribute the tokens to the recipients
    /// @dev The '_sender' must be a pool manager and the allocation must have ended
    /// @param _recipientIds The recipient ids
    /// @param _sender The sender of the transaction
    function _distributeRoundTwo(address[] memory _recipientIds, address _sender) internal {
        uint256 payoutLength = _recipientIds.length;

        uint256[] memory amounts = new uint256[](payoutLength);
        uint256[] memory streamIDs = new uint256[](payoutLength);
        for (uint256 i; i < payoutLength; ) {
            address recipientId = _recipientIds[i];
            Recipient storage recipient = recipients[recipientId];

            PayoutSummary memory payout = _getPayout(recipientId, "");

            uint256 amount = payout.amount;

            amounts[i] = amount;

            if (recipient.paidOut == PaidStatus.Paid) {
                revert("Recipient has been already paid out");
            }

            if (!_isAcceptedRecipient(recipientId)) {
                revert("Recipient is not accepted");
            }

            IAllo.Pool memory pool = allo.getPool(poolId);
            _transferAmount(pool.token, recipientId, amount);

            recipient.paidOut = PaidStatus.Paid;

            emit Distributed(recipientId, recipientId, amount, _sender);

            unchecked {
                ++i;
            }
        }

        registryIndexer.InsertDistributions(poolId, 2, amounts, streamIDs, _recipientIds);
    }

    /// ====================================
    /// ============ QV Helper ==============
    /// ====================================

    /// @notice Calculate the square root of a number (Babylonian method)
    /// @param x The number
    /// @return y The square root
    function _sqrt(uint256 x) internal pure returns (uint256 y) {
        uint256 z = (x + 1) / 2;
        y = x;
        while (z < y) {
            y = z;
            z = (x / z + z) / 2;
        }
    }

    /// =========================
    /// ==== View Functions =====
    /// =========================

    /// @notice Get the review period we are in
    /// @return reviewRound The review period we are in
    function getReviewPeriod() internal view returns (uint8 reviewRound) {
        uint120 roundTwoReviewStartTime = projectsWorkingStartTime + projectsWorkingDuration;

        uint120 roundTwoEndTime = roundTwoReviewStartTime + projectsOutComeReviewDuration;

        // Check if the allocation has ended if not we are in round one review
        if (block.timestamp >= registrationStartTime && block.timestamp <= allocationEndTime) {
            reviewRound = 1;
            // Check if we are in round two review
        } else if (
            block.timestamp >= roundTwoReviewStartTime && block.timestamp <= roundTwoEndTime
        ) {
            reviewRound = 2;
        }
    }

    /// @notice Get the distribution period we are in
    /// @return distributionPeriod The distribution period we are in
    function getDistributionPeriod() internal view returns (uint8 distributionPeriod) {
        uint120 roundTwoReviewStartTime = projectsWorkingStartTime + projectsWorkingDuration;

        uint120 roundTwoReviewEndTime = roundTwoReviewStartTime + projectsOutComeReviewDuration;

        // Check if we are in distribution period 0. By checking if the allocation has ended
        // and if the round one distribution has not started
        if (block.timestamp >= allocationEndTime && projectsWorkingStartTime == 0) {
            distributionPeriod = 1;
            // Check if we are in distribution period 2. By checking if the round one distribution
            // has started and if the round two review has ended
        } else if (block.timestamp >= roundTwoReviewEndTime && projectsWorkingStartTime != 0) {
            distributionPeriod = 2;
        }
    }

    /// @notice Get the recipient
    /// @param _recipientId ID of the recipient
    /// @return The recipient
    function getRecipient(address _recipientId) external view returns (Recipient memory) {
        return _getRecipient(_recipientId);
    }

    /// @notice Get recipient status
    /// @param _recipientId Id of the recipient
    function _getRecipientStatus(
        address _recipientId
    ) internal view virtual override returns (Status) {
        return _getRecipient(_recipientId).recipientStatus;
    }

    /// @notice Checks if a pool is active or not
    /// @return Whether the pool is active or not
    function _isPoolActive() internal view virtual override returns (bool) {
        if (registrationStartTime <= block.timestamp && block.timestamp <= registrationEndTime) {
            return true;
        }
        return false;
    }

    /// @notice Get the payout for a single recipient
    /// @param _recipientId The ID of the recipient
    /// @return The payout as a 'PayoutSummary' struct
    function _getPayout(
        address _recipientId,
        bytes memory
    ) internal view virtual override returns (PayoutSummary memory) {
        Recipient memory recipient = recipients[_recipientId];

        // Calculate the payout amount based on the percentage of total votes received
        // But also count the amount based on the roundOnePercentage if the recipient has not been paid out yet
        uint256 amount;
        if (recipient.paidOut == PaidStatus.None && totalRecipientVotes != 0) {
            amount = (poolAmount * recipient.totalVotesReceived) / totalRecipientVotes;
            amount = (amount * roundOnePercentage) / 100;
        }
        // If the recipient has been paid out in round one, then calculate
        //  the payout amount based on the percentage of total votes received
        if (recipient.paidOut == PaidStatus.PaidStream && totalRecipientVotes != 0) {
            uint256 roundTwoPercentage = 100 - roundOnePercentage;

            amount = (poolAmount * recipient.totalVotesReceived) / totalRecipientVotes;
            amount = (amount * roundTwoPercentage) / 100;
        }
        return PayoutSummary(_recipientId, amount);
    }

    /// ================================
    /// =========== Hooks ==============
    /// ================================

    function _beforeIncreasePoolAmount(uint256) internal virtual override {
        if (block.timestamp > allocationEndTime) {
            revert INVALID();
        }
    }

    /// ====================================
    /// ============ Internal ==============
    /// ====================================

    /// @notice Check if the registration is active
    /// @dev Reverts if the registration is not active
    function _checkOnlyActiveRegistration() internal view virtual {
        if (registrationStartTime > block.timestamp || block.timestamp > registrationEndTime) {
            revert REGISTRATION_NOT_ACTIVE();
        }
    }

    /// @notice Check if the allocation is active
    /// @dev Reverts if the allocation is not active
    function _checkOnlyActiveAllocation() internal view virtual {
        if (allocationStartTime > block.timestamp || block.timestamp > allocationEndTime) {
            revert ALLOCATION_NOT_ACTIVE();
        }
    }

    function _checkOnlyPoolAdmin(address _sender) internal view virtual {
        if (!hats.isAdminOfHat(_sender, poolManagerHatId)) {
            revert UNAUTHORIZED();
        }
    }

    function _checkOnlyPoolAllocator(address _sender) internal view virtual {
        if (!hats.isAdminOfHat(_sender, reviewerHatId)) {
            revert UNAUTHORIZED();
        }
    }

    function _checkOnlyPoolReviewer(address _sender) internal view virtual {
        if (
            !hats.isWearerOfHat(_sender, reviewerHatId) &&
            !hats.isAdminOfHat(_sender, reviewerHatId)
        ) {
            revert UNAUTHORIZED();
        }
    }

    /// @notice Checks if address is valid allocator.
    /// @param _allocator The allocator address
    /// @return Returns true if address is wearer of hatId
    function _isValidAllocator(address _allocator) internal view override returns (bool) {
        return hats.isWearerOfHat(_allocator, poolManagerHatId);
    }

    /// @notice Returns if the recipient is accepted
    /// @param _recipientId The recipient id
    /// @return true if the recipient is accepted
    function _isAcceptedRecipient(address _recipientId) internal view returns (bool) {
        return recipients[_recipientId].recipientStatus == Status.Accepted;
    }

    /// @notice Check if sender is a profile member
    /// @param _anchor Anchor of the profile
    /// @param _sender The sender of the transaction
    /// @return If the '_sender' is a profile member
    function _isProfileMember(address _anchor, address _sender) internal view returns (bool) {
        IRegistry.Profile memory profile = _registry.getProfileByAnchor(_anchor);
        return _registry.isOwnerOrMemberOfProfile(profile.id, _sender);
    }

    /// @notice Getter for a recipient using the ID
    /// @param _recipientId ID of the recipient
    /// @return The recipient
    function _getRecipient(address _recipientId) internal view returns (Recipient memory) {
        return recipients[_recipientId];
    }

    /// @notice Withdraw the tokens from the pool
    /// @dev Callable by the pool manager only 30 days after the allocation has ended
    /// @param _token The token to withdraw
    function withdraw(address _token) external {
        _checkOnlyPoolAdmin(msg.sender);

        uint256 ProjectsOutcomeReviewEndTime = projectsWorkingStartTime +
            projectsWorkingDuration +
            projectsOutComeReviewDuration;

        // The pool Admin can withdraw only after the projects outcome review period has ended
        // and 10 days have passed since the projects outcome review period has ended
        // To ensure all the valid projects have been paid out
        if (block.timestamp <= ProjectsOutcomeReviewEndTime + 10 days) {
            revert INVALID();
        }

        uint256 amount = _getBalance(_token, address(this));

        // Transfer the tokens to the 'msg.sender' (pool manager calling function)
        _transferAmount(_token, msg.sender, amount);
    }

    /// @notice Contract should be able to receive NATIVE
    receive() external payable {}
}
