// SPDX-License-Identifier: MIT
pragma solidity 0.8.36;
import {FixedGameLogic} from "../src/logic/FixedGameLogic.sol";import {VariableGameLogic} from "../src/logic/VariableGameLogic.sol";
contract PureRulesHarness {function fixedHorizon(uint16 h) external pure returns(bool){FixedGameLogic.validate(h);return true;}function variableHorizon(uint16 h,uint8 s) external pure returns(bool){VariableGameLogic.validate(h,s);return true;}}
/// Self-contained compile-time test/harness; runtime execution still requires Foundry or another EVM.
contract PureRulesTest {PureRulesHarness immutable harness=new PureRulesHarness();function testValidDomains() external view {require(harness.fixedHorizon(60)&&harness.fixedHorizon(180)&&harness.fixedHorizon(300)&&harness.fixedHorizon(600));for(uint16 h=10;h<=60;h++)require(harness.variableHorizon(h,0)&&harness.variableHorizon(h,1));}}
