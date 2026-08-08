// SPDX-License-Identifier: MIT
pragma solidity 0.8.36;
library FixedGameLogic {
    error InvalidFixedHorizon(uint16 secondsValue);
    function validate(uint16 h) internal pure { if (h != 60 && h != 180 && h != 300 && h != 600) revert InvalidFixedHorizon(h); }
}
