// SPDX-License-Identifier: MIT
pragma solidity 0.8.36;
import {MoncorTypes} from "../types/MoncorTypes.sol";
library QuoteHashing {
    bytes32 internal constant TYPEHASH = keccak256("Quote(bytes32 quoteId,uint256 nonce,address wallet,address asset,bytes32 marketId,bytes32 policyId,uint64 policyVersion,uint64 signerSetVersion,uint64 issuedAt,uint64 expiresAt,uint64 startAt,uint64 settlementAt,uint64 refundAvailableAt,uint128 stake,uint128 maxPayout,uint128 fee,int192 targetPrice,uint8 priceScale,uint16 horizonSeconds,uint8 mode,uint8 selection)");
    function hash(MoncorTypes.Quote calldata q) internal pure returns (bytes32) {
        return keccak256(abi.encode(TYPEHASH,q.quoteId,q.nonce,q.wallet,q.asset,q.marketId,q.policyId,q.policyVersion,q.signerSetVersion,q.issuedAt,q.expiresAt,q.startAt,q.settlementAt,q.refundAvailableAt,q.stake,q.maxPayout,q.fee,q.targetPrice,q.priceScale,q.horizonSeconds,q.mode,q.selection));
    }
}
