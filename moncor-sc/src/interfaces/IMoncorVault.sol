// SPDX-License-Identifier: MIT
pragma solidity 0.8.36;
interface IMoncorVault {
    function lockStake(bytes32,address,address,uint128,uint128) external payable;
    function accruePayout(bytes32,address,uint128,uint128) external;
    function accrueRefund(bytes32,address,uint128) external;
    function claimTo(bytes32,address) external returns (uint256);
    function protectedBalance() external view returns(uint256);
    function freeReserve() external view returns(uint256);
    function withdrawableProtocolFees() external view returns(uint256);
    function solvency(address) external view returns (uint256,uint256,uint256);
}
