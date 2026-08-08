// SPDX-License-Identifier: MIT
pragma solidity 0.8.36;

library MoncorTypes {
    address internal constant NATIVE_ASSET = address(0);
    enum GameMode { FIXED, VARIABLE }
    enum WagerState { NONE, ACTIVE, DISPUTED, SETTLED, REFUNDABLE, CLAIMED, REFUNDED, CLOSED }
    enum Outcome { LOSS, WIN, REFUND }

    struct Quote {
        bytes32 quoteId; uint256 nonce; address wallet; address asset;
        bytes32 marketId; bytes32 policyId; uint64 policyVersion; uint64 signerSetVersion;
        uint64 issuedAt; uint64 expiresAt; uint64 startAt; uint64 settlementAt; uint64 refundAvailableAt;
        uint128 stake; uint128 maxPayout; uint128 fee; int192 targetPrice;
        uint8 priceScale; uint16 horizonSeconds; uint8 mode; uint8 selection;
    }
    struct Wager {
        address player; address asset; bytes32 quoteId; bytes32 marketId; bytes32 policyId; bytes32 termsHash;
        uint64 policyVersion; uint64 signerSetVersion; uint64 startAt; uint64 settlementAt; uint64 refundAvailableAt; uint64 acceptedAt;
        uint128 stake; uint128 maxPayout; uint128 fee; int192 targetPrice;
        uint8 priceScale; uint16 horizonSeconds; GameMode mode; uint8 selection; WagerState state;
    }
    struct SettlementAttestation {
        bytes32 wagerId; bytes32 settlementId; bytes32 termsHash; bytes32 policyId; uint64 policyVersion;
        uint64 startAt; uint64 settlementAt; int192 startPrice; int192 settlementPrice;
        uint8 priceScale; uint8 outcome; uint128 payout; bytes32 evidenceHash;
        uint64 signerSetVersion; uint64 validUntil;
    }
}
