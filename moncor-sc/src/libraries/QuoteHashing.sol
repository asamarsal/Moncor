// SPDX-License-Identifier: MIT
pragma solidity 0.8.36;

import {MoncorTypes} from "../types/MoncorTypes.sol";

library QuoteHashing {
    bytes32 internal constant QUOTE_TYPEHASH = keccak256(
        "Quote(bytes32 quoteId,uint256 nonce,address wallet,address asset,bytes32 marketId,bytes32 policyId,uint64 policyVersion,uint64 signerSetVersion,uint64 issuedAt,uint64 expiresAt,uint64 startAt,uint64 settlementAt,uint64 refundAvailableAt,uint128 stake,uint128 maxPayout,uint128 fee,int192 targetPrice,uint8 priceScale,uint16 horizonSeconds,uint8 mode,uint8 selection)"
    );

    function hash(MoncorTypes.Quote memory quote) internal pure returns (bytes32) {
        return keccak256(
            abi.encode(
                QUOTE_TYPEHASH,
                quote.quoteId,
                quote.nonce,
                quote.wallet,
                quote.asset,
                quote.marketId,
                quote.policyId,
                quote.policyVersion,
                quote.signerSetVersion,
                quote.issuedAt,
                quote.expiresAt,
                quote.startAt,
                quote.settlementAt,
                quote.refundAvailableAt,
                quote.stake,
                quote.maxPayout,
                quote.fee,
                quote.targetPrice,
                quote.priceScale,
                quote.horizonSeconds,
                quote.mode,
                quote.selection
            )
        );
    }
}
