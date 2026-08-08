// SPDX-License-Identifier: MIT
pragma solidity 0.8.36;
import {MoncorTypes} from "../types/MoncorTypes.sol";
library SettlementHashing {
    bytes32 internal constant TYPEHASH = keccak256("SettlementAttestation(bytes32 wagerId,bytes32 settlementId,bytes32 termsHash,bytes32 policyId,uint64 policyVersion,uint64 startAt,uint64 settlementAt,int192 startPrice,int192 settlementPrice,uint8 priceScale,uint8 outcome,uint128 payout,bytes32 evidenceHash,uint64 signerSetVersion,uint64 validUntil)");
    function hash(MoncorTypes.SettlementAttestation calldata a) internal pure returns (bytes32) {
        return keccak256(abi.encode(TYPEHASH,a.wagerId,a.settlementId,a.termsHash,a.policyId,a.policyVersion,a.startAt,a.settlementAt,a.startPrice,a.settlementPrice,a.priceScale,a.outcome,a.payout,a.evidenceHash,a.signerSetVersion,a.validUntil));
    }
}
