// SPDX-License-Identifier: AGPL-3.0-only
pragma solidity 0.8.19;

import {IStrategy} from "./IStrategy.sol";
// Internal Libraries
import {Metadata} from "../libraries/Metadata.sol";

interface Types is IStrategy {
    error INVALID_ROUND_ONE_PERCENTAGE();

    /// @notice Emitted when a recipient is reviewed
    /// @param recipientId ID of the recipient
    /// @param status The status of the recipient
    /// @param sender The sender of the transaction
    event Reviewed(address indexed recipientId, Status status, address sender);

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

    enum PaidStatus {
        None,
        PaidStream,
        Paid
    }

    /// @notice The details of the recipient
    struct Recipient {
        // slot 0
        uint256 totalVotesReceived; // the total number of votes recipient has received
        // slot 1
        PaidStatus paidOut; // whether the recipient has been paid out or not
        Metadata metadata; // the metadata of the recipient proposal
        Status recipientStatus; // the status of the recipient proposal
    }

    /// @notice The details of the allocator
    struct Allocator {
        // slot 0
        uint256 voiceCredits;
        // slots [1...n]
        mapping(address => uint256) voiceCreditsCastToRecipient;
        mapping(address => uint256) votesCastToRecipient;
    }
}

/// @title RegistryIndexer
interface IRegistryIndexer {
    function RegisterProfile(address profileID, uint256 poolID, string memory metadata) external;

    function InsertReviews(
        uint256 poolID,
        uint8 round,
        address reviewedBy,
        uint8[] memory status,
        address[] memory recipientIDs
    ) external;

    function InsertAllocation(
        uint256 poolID,
        address allocationFrom,
        uint256 votesAmount,
        address recipientID
    ) external;

    function InsertDistributions(
        uint256 poolID,
        uint8 round,
        uint256[] memory distributionAmount,
        uint256[] memory streamID,
        address[] memory recipientIDs
    ) external;

}
