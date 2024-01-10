//// SPDX-License-Identifier: MIT
pragma solidity 0.8.19;

/// @title RegistryIndexer
interface IRegistryIndexer {
    function addReviews(
        uint256 poolID,
        uint256 round,
        address reviewedBy,
        uint8[] memory statuses,
        address[] memory recipientIDs
    ) external;

    function addAllocations(
        uint256 poolID,
        uint256 round,
        address[] memory allocationFrom,
        uint256[] memory votesAmount,
        address[] memory recipientIDs
    ) external;

    function addDistributions(
        uint256 poolID,
        uint256 round,
        uint256[] memory distributionAmount,
        bytes32[] memory streamID,
        address[] memory recipientID
    ) external;
}
