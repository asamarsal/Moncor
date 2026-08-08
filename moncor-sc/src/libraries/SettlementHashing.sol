// SPDX-License-Identifier: MIT
pragma solidity 0.8.36;

import {MoncorTypes} from "../types/MoncorTypes.sol";

library SettlementHashing {
    bytes32 internal constant SETTLEMENT_ATTESTATION_TYPEHASH = keccak256(
        "SettlementAttestation(bytes32 wagerId,bytes32 settlementId,bytes32 termsHash,bytes32 policyId,uint64 policyVersion,uint64 startAt,uint64 settlementAt,int192 startPrice,int192 settlementPrice,uint8 priceScale,uint8 outcome,uint128 payout,bytes32 evidenceHash,uint64 signerSetVersion,uint64 validUntil)"
    );

    function hash(MoncorTypes.SettlementAttestation memory att) internal pure returns (bytes32) {
        return keccak256(
            abi.encode(
                SETTLEMENT_ATTESTATION_TYPEHASH,
                att.wagerId,
                att.settlementId,
                att.termsHash,
                att.policyId,
                att.policyVersion,
                att.startAt,
                att.settlementAt,
                att.startPrice,
                att.settlementPrice,
                att.priceScale,
                att.outcome,
                att.payout,
                att.evidenceHash,
                att.signerSetVersion,
                att.validUntil
            )
        );
    }
}
