// SPDX-License-Identifier: MIT

pragma solidity 0.8.19;

import {TablelandDeployments} from "@tableland/evm/contracts/utils/TablelandDeployments.sol";

import {ITablelandTables} from "@tableland/evm/contracts/interfaces/ITablelandTables.sol";

import {SQLHelpers} from "@tableland/evm/contracts/utils/SQLHelpers.sol";

import {Strings} from "@openzeppelin/contracts/utils/Strings.sol";

import {IRegistry} from "../interfaces/IRegistry.sol";

/// @title RegistryIndexer
abstract contract RegistryIndexer {
    ITablelandTables private tablelandContract;

    string[] createTableStatements;

    string[] public tables;

    uint256[] public tableIDs;

    string private constant PROFILE_TABLE_PREFIX = "profiles";

    string private constant PROFILE_SCHEMA =
        "profileID text, name text, metadata text, profileAddress text, adminHat text, reviewerHat text, managerHat text";

    string private constant PROFILE_POOLS_TABLE_PREFIX = "profilePools";

    string private constant PROFILE_POOLS_SCHEMA =
        "profileID text, profileAddress text, poolID text, isCreator text, metadata text";

    string private constant POOLS_TABLE_PREFIX = "pools";

    string private constant POOLS_SCHEMA =
        // SCHEMADESCRIPTION => "poolID text, strategyCOntractAddress, VotingReviewThreshold text, RoundOnePoolPercentage text,  registrationStartTime text, registrationEndTime text, allocationStartTime text, allocationEndTime text, projectsWorkingDuration text, projectsReviewDuration text";
        "poolID text, strategy text, votesPerAllocator text, threshold text, ROP text, RSTs text, RETs text, AETs text, DONET text, PWDs text, PRDs text";

    string private constant POOLS_REVIEW_TABLE_PREFIX = "pools_reviews";

    string private constant POOLS_REVIEW_SCHEMA =
        "poolID text, reviewRound text, reviewedBy text, reviewedAt text, status text, recipientID text, recipientAddress text";

    string private constant POOLS_ALLOCATION_TABLE_PREFIX = "pools_allocations";

    string private constant POOLS_ALLOCATION_SCHEMA =
        "poolID text, allocationFrom text, votesAmount text, recipientID text, recipientAddress text";

    string private constant POOLS_DISTRIBUTION_TABLE_PREFIX = "pools_distributions";

    string private constant POOLS_DISTRIBUTION_SCHEMA =
        "poolID text, distributionAmount text, streamID text, recipientID text, recipientAddress text";

    IRegistry public Registry;

    /// @dev Creates a new SchemaRegistry instance.
    constructor(address _registry) {
        Registry = IRegistry(_registry);

        tablelandContract = TablelandDeployments.get();

        createTableStatements.push(
            SQLHelpers.toCreateFromSchema(PROFILE_SCHEMA, PROFILE_TABLE_PREFIX)
        );
        createTableStatements.push(
            SQLHelpers.toCreateFromSchema(PROFILE_POOLS_SCHEMA, PROFILE_POOLS_TABLE_PREFIX)
        );

        createTableStatements.push(SQLHelpers.toCreateFromSchema(POOLS_SCHEMA, POOLS_TABLE_PREFIX));

        createTableStatements.push(
            SQLHelpers.toCreateFromSchema(POOLS_REVIEW_SCHEMA, POOLS_REVIEW_TABLE_PREFIX)
        );

        createTableStatements.push(
            SQLHelpers.toCreateFromSchema(POOLS_ALLOCATION_SCHEMA, POOLS_ALLOCATION_TABLE_PREFIX)
        );

        createTableStatements.push(
            SQLHelpers.toCreateFromSchema(
                POOLS_DISTRIBUTION_SCHEMA,
                POOLS_DISTRIBUTION_TABLE_PREFIX
            )
        );

        tableIDs = tablelandContract.create(address(this), createTableStatements);

        tables.push(SQLHelpers.toNameFromId(PROFILE_TABLE_PREFIX, tableIDs[0]));
        tables.push(SQLHelpers.toNameFromId(PROFILE_POOLS_TABLE_PREFIX, tableIDs[1]));
        tables.push(SQLHelpers.toNameFromId(POOLS_TABLE_PREFIX, tableIDs[2]));
        tables.push(SQLHelpers.toNameFromId(POOLS_REVIEW_TABLE_PREFIX, tableIDs[3]));
        tables.push(SQLHelpers.toNameFromId(POOLS_ALLOCATION_TABLE_PREFIX, tableIDs[4]));
        tables.push(SQLHelpers.toNameFromId(POOLS_DISTRIBUTION_TABLE_PREFIX, tableIDs[5]));
    }

    function PoolRegistration(
        InitializeParamsQVHatsSablier memory input,
        uint256 maxVoiceCreditsPerAllocator,
        uint256 poolID,
        address strategy,
        bytes32 profileID,
        string memory metadata
    ) internal {
        uint256 RST = block.timestamp + input.registrationBeginsIn;
        uint256 RET = RST + input.registrationDuration;
        uint256 tableID = tableIDs[2];
        mutate(
            tableID,
            SQLHelpers.toInsert(
                POOLS_TABLE_PREFIX,
                tableID,
                "poolID, strategy, votesPerAllocator, threshold, ROP, RSTs, RETs, AETs, DONET, PWDs, PRDs",
                string.concat(
                    SQLHelpers.quote(Strings.toString(poolID)),
                    ",",
                    SQLHelpers.quote(Strings.toHexString(strategy)),
                    ",",
                    SQLHelpers.quote(Strings.toString(maxVoiceCreditsPerAllocator)),
                    ",",
                    SQLHelpers.quote(Strings.toString(input.voteThreshold)),
                    ",",
                    SQLHelpers.quote(Strings.toString(input.roundOnePercentage)),
                    ",",
                    SQLHelpers.quote(Strings.toString(RST)),
                    ",",
                    SQLHelpers.quote(Strings.toString(RET)),
                    ",",
                    SQLHelpers.quote(Strings.toString(RET + input.allocationDuration)),
                    ",",
                    SQLHelpers.quote(""),
                    ",",
                    SQLHelpers.quote(Strings.toString(input.projectsWorkingDuration)),
                    ",",
                    SQLHelpers.quote(Strings.toString(input.projectsOutComeReviewDuration))
                )
            )
        );

        address profileAddress = Registry.getProfileById(profileID).anchor;

        addProfileInPool(poolID, profileID, profileAddress, true, metadata);
    }

    function AddFirstDistributionTime(
        uint256 poolID
    ) internal {
        mutate(
            tableIDs[2],
            SQLHelpers.toUpdate(
                POOLS_TABLE_PREFIX,
                tableIDs[2],
                string.concat(
                    "DONET=",
                    SQLHelpers.quote(Strings.toString(block.timestamp))
                ),
                string.concat(
                    "poolID=",
                    SQLHelpers.quote(Strings.toString(poolID))
                )
            )
        );
    }

    function addProfileInPool(
        uint256 poolID,
        bytes32 profileID,
        address profileAddress,
        bool isCreator,
        string memory metadata
    ) internal {
        string memory _profileID = bytes32ToString(profileID);

        mutate(
            tableIDs[1],
            SQLHelpers.toInsert(
                PROFILE_POOLS_TABLE_PREFIX,
                tableIDs[1],
                "profileID, profileAddress, poolID, isCreator, metadata",
                string.concat(
                    SQLHelpers.quote(_profileID),
                    ",",
                    SQLHelpers.quote(Strings.toHexString(profileAddress)),
                    ",",
                    SQLHelpers.quote(Strings.toString(poolID)),
                    ",",
                    SQLHelpers.quote(isCreator ? "true" : "false"),
                    ",",
                    SQLHelpers.quote(metadata)
                )
            )
        );
    }

    function RegisterProfileInPool(
        address _profileID,
        uint256 poolID,
        string memory metadata
    ) internal {
        bytes32 profileID = Registry.getProfileByAnchor(_profileID).id;

        addProfileInPool(poolID, profileID, _profileID, false, metadata);
    }

    function ProfileRegistration(
        bytes32 profileID,
        string memory name,
        string memory metadata,
        uint256 adminHatID,
        uint256 reviewerHatID,
        uint256 managerHatID
    ) internal {
        address profileAddress = Registry.getProfileById(profileID).anchor;

        mutate(
            tableIDs[0],
            SQLHelpers.toInsert(
                PROFILE_TABLE_PREFIX,
                tableIDs[0],
                "profileID, name, metadata, profileAddress, adminHat, reviewerHat, managerHat",
                string.concat(
                    SQLHelpers.quote(bytes32ToString(profileID)),
                    ",",
                    SQLHelpers.quote(name),
                    ",",
                    SQLHelpers.quote(metadata),
                    ",",
                    SQLHelpers.quote(Strings.toHexString(profileAddress)),
                    ",",
                    SQLHelpers.quote(Strings.toString(adminHatID)),
                    ",",
                    SQLHelpers.quote(Strings.toString(reviewerHatID)),
                    ",",
                    SQLHelpers.quote(Strings.toString(managerHatID))
                )
            )
        );
    }

    function InsertReviewsToPool(
        uint256 poolID,
        uint8 round,
        address reviewedBy,
        uint8[] memory status,
        address[] memory recipientIDs
    ) internal {
        uint reviewedAt = block.timestamp;

        bytes32 profileID;

        for (uint256 i = 0; i < recipientIDs.length; i++) {
            address currentRecipient = recipientIDs[i];
            profileID = Registry.getProfileByAnchor(currentRecipient).id;

            mutate(
                tableIDs[3],
                SQLHelpers.toInsert(
                    POOLS_REVIEW_TABLE_PREFIX,
                    tableIDs[3],
                    "poolID, reviewRound, reviewedBy, reviewedAt, status, recipientID, recipientAddress",
                    string.concat(
                        SQLHelpers.quote(Strings.toString(poolID)),
                        ",",
                        SQLHelpers.quote(Strings.toString(round)),
                        ",",
                        SQLHelpers.quote(Strings.toHexString(reviewedBy)),
                        ",",
                        SQLHelpers.quote(Strings.toString(reviewedAt)),
                        ",",
                        SQLHelpers.quote(Strings.toString(status[i])),
                        ",",
                        SQLHelpers.quote(bytes32ToString(profileID)),
                        ",",
                        SQLHelpers.quote(Strings.toHexString(currentRecipient))
                    )
                )
            );
        }
    }

    function InsertAllocationToPool(
        uint256 poolID,
        address allocationFrom,
        uint256 votesAmount,
        address recipientID
    ) internal {
        bytes32 profileID = Registry.getProfileByAnchor(recipientID).id;
        mutate(
            tableIDs[4],
            SQLHelpers.toInsert(
                POOLS_ALLOCATION_TABLE_PREFIX,
                tableIDs[4],
                "poolID, allocationFrom, votesAmount, recipientID, recipientAddress",
                string.concat(
                    SQLHelpers.quote(Strings.toString(poolID)),
                    ",",
                    SQLHelpers.quote(Strings.toHexString(allocationFrom)),
                    ",",
                    SQLHelpers.quote(Strings.toString(votesAmount)),
                    ",",
                    SQLHelpers.quote(bytes32ToString(profileID)),
                    ",",
                    SQLHelpers.quote(Strings.toHexString(recipientID))
                )
            )
        );
    }

    function InsertDistributionsToPool(
        uint256 poolID,
        uint256[] memory distributionAmount,
        uint256[] memory streamID,
        address[] memory recipientIDs
    ) internal {
        bytes32 profileID;
        for (uint256 i = 0; i < recipientIDs.length; i++) {
            profileID = Registry.getProfileByAnchor(recipientIDs[i]).id;
            mutate(
                tableIDs[5],
                SQLHelpers.toInsert(
                    POOLS_DISTRIBUTION_TABLE_PREFIX,
                    tableIDs[5],
                    "poolID, distributionAmount, streamID, recipientID, recipientAddress",
                    string.concat(
                        SQLHelpers.quote(Strings.toString(poolID)),
                        ",",
                        SQLHelpers.quote(Strings.toString(distributionAmount[i])),
                        ",",
                        SQLHelpers.quote(Strings.toString(streamID[i])),
                        ",",
                        SQLHelpers.quote(bytes32ToString(profileID)),
                        ",",
                        SQLHelpers.quote(Strings.toHexString(recipientIDs[i]))
                    )
                )
            );
        }
    }

    function bytes32ToString(bytes32 data) public pure returns (string memory) {
        // Fixed buffer size for hexadecimal convertion
        bytes memory converted = new bytes(data.length * 2);

        bytes memory _base = "0123456789abcdef";

        for (uint256 i = 0; i < data.length; i++) {
            converted[i * 2] = _base[uint8(data[i]) / _base.length];
            converted[i * 2 + 1] = _base[uint8(data[i]) % _base.length];
        }

        return string(abi.encodePacked("0x", converted));
    }

    /*
     * @dev Internal function to execute a mutation on a table.
     * @param {uint256} tableId - Table ID.
     * @param {string} statement - Mutation statement.
     */
    function mutate(uint256 tableId, string memory statement) internal {
        tablelandContract.mutate(address(this), tableId, statement);
    }

    /// @notice The parameters used to initialize the strategy
    struct InitializeParamsQVHatsSablier {
        uint8 roundOnePercentage;
        uint40 voteThreshold;
        uint40 registrationBeginsIn;
        uint40 registrationDuration;
        uint40 allocationDuration;
        uint40 projectsWorkingDuration;
        uint40 projectsOutComeReviewDuration;
        // slot 1
        uint256 reviewerHatId;
        // slot 2
        uint256 poolManagerHatId;
        // slot 3
        bytes data;
    }

    /// @notice The parameters used to initialize the strategy
    struct InitializeParams {
        // slot 0
        uint256 maxVoiceCreditsPerAllocator;
        // slot 1..n
        InitializeParamsQVHatsSablier params;
    }
}
