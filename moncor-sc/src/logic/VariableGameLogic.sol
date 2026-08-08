// SPDX-License-Identifier: MIT
pragma solidity 0.8.36;
library VariableGameLogic {
    error InvalidVariableHorizon(uint16 secondsValue);
    error InvalidSelection(uint8 selection);
    function validate(uint16 h, uint8 selection) internal pure {
        if (h < 10 || h > 60) revert InvalidVariableHorizon(h);
        if (selection > 1) revert InvalidSelection(selection);
    }
}
