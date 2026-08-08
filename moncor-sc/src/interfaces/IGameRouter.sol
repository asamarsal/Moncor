// SPDX-License-Identifier: MIT
pragma solidity 0.8.36;
import {MoncorTypes} from "../types/MoncorTypes.sol";
interface IGameRouter {
 function acceptQuote(MoncorTypes.Quote calldata,bytes calldata) external payable returns(bytes32);
 function submitSettlement(MoncorTypes.SettlementAttestation calldata,bytes[] calldata) external;
 function claim(bytes32) external; function claimRefund(bytes32) external;
 function getWager(bytes32) external view returns(MoncorTypes.Wager memory);
}
