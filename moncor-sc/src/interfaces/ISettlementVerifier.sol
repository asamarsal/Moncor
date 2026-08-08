// SPDX-License-Identifier: MIT
pragma solidity 0.8.36;
import {MoncorTypes} from "../types/MoncorTypes.sol";
interface ISettlementVerifier {
    function verifyAndConsume(MoncorTypes.SettlementAttestation calldata att, bytes[] calldata signatures) external returns (bool);
    function signerSetVersion() external view returns (uint64);
    function threshold() external view returns (uint16);
    function signerSetActive(uint64 version) external view returns (bool);
}
