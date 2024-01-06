// SPDX-License-Identifier: AGPL-3.0
// Copyright (C) 2023 Haberdasher Labs
//
// This program is free software: you can redistribute it and/or modify
// it under the terms of the GNU Affero General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU Affero General Public License for more details.
//
// You should have received a copy of the GNU Affero General Public License
// along with this program.  If not, see <https://www.gnu.org/licenses/>.

pragma solidity >=0.8.13;

interface IHatsModuleFactory {
    /**
     * @notice Deploys a new HatsModule instance for a given `_hatId` to a deterministic address, if not
     * already deployed, and sets up the new instance with initial operational values.
     * @dev Will revert *after* the instance is deployed if their initial values are invalid.
     * @param _implementation The address of the implementation contract of which to deploy a clone
     * @param _hatId The hat for which to deploy a HatsModule.
     * @param _otherImmutableArgs Other immutable args to pass to the clone as immutable storage.
     * {setUp} is required.
     * @return _instance The address of the deployed HatsModule instance
     */
    function createHatsModule(
        address _implementation,
        uint256 _hatId,
        bytes calldata _otherImmutableArgs,
        bytes calldata /** _initData */
    ) external returns (address _instance);
}
