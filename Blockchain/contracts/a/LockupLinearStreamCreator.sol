// SPDX-License-Identifier: GPL-3.0-or-later
pragma solidity >=0.8.19;

import {IERC20} from "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import {ud60x18} from "@prb/math/src/UD60x18.sol";
import {ISablierV2LockupLinear} from "@sablier/v2-core/src/interfaces/ISablierV2LockupLinear.sol";
import {Broker, LockupLinear} from "@sablier/v2-core/src/types/DataTypes.sol";

/// @noticeeeee Example of how to create a Lockup Linear stream.
/// @dev This code is referenced in the docs: https://docs.sablier.com/contracts/v2/guides/create-stream/lockup-linear
contract LockupLinearStreamCreator {
    // Mainnet addresses
    IERC20 public constant DAI = IERC20(0x8d573a4EBe0AC93d9cBCF1A3046C91DbF2ADD45A);
    // IERC20 public constant DAI = IERC20(0x776b6fC2eD15D6Bb5Fc32e0c89DE68683118c62A);

    ISablierV2LockupLinear public constant LOCKUP_LINEAR =
        // ISablierV2LockupLinear(0xa3e36b51B7A456812c92253780f4B15bad56e34c);
        ISablierV2LockupLinear(0x483bdd560dE53DC20f72dC66ACdB622C5075de34);

    function createStream(
        uint128 totalAmount,
        address recipient
    ) public returns (uint256 streamId) {
        // Transfer the provided amount of DAI tokens to this contract
        DAI.transferFrom(msg.sender, address(this), totalAmount);

        // Approve the Sablier contract to spend DAI
        DAI.approve(address(LOCKUP_LINEAR), totalAmount);

        // Declare the params struct
        LockupLinear.CreateWithDurations memory params;

        // Declare the function parameters
        params.sender = msg.sender; // The sender will be able to cancel the stream
        params.recipient = recipient; // The recipient of the streamed assets
        params.totalAmount = totalAmount; // Total amount is the amount inclusive of all fees
        params.asset = DAI; // The streaming asset
        params.cancelable = true; // Whether the stream will be cancelable or not
        params.transferable = true; // Whether the stream will be transferable or not
        params.durations = LockupLinear.Durations({
            cliff: 1 minutes, // Assets will be unlocked only after 4 weeks
            total: 1 hours // Setting a total duration of ~1 year
        });
        params.broker = Broker(address(0), ud60x18(0)); // Optional parameter for charging a fee

        // Create the LockupLinear stream using a function that sets the start time to `block.timestamp`
        streamId = LOCKUP_LINEAR.createWithDurations(params);
    }
}