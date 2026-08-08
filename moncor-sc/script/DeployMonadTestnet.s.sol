// SPDX-License-Identifier: MIT
pragma solidity 0.8.36;
import {MoncorVault} from "../src/MoncorVault.sol";import {SettlementVerifier} from "../src/SettlementVerifier.sol";import {GameRouter} from "../src/GameRouter.sol";
/// Constructor-only atomic deployer. It reads no keys and leaves no helper-held role.
/// Addresses are emitted because constructor return values are not available to callers.
contract DeployMonadTestnet {
 error WrongChain(uint256 actual,uint256 expected);error InvalidAdmin();
 event DeploymentCreated(address indexed vault,address indexed verifier,address indexed router,address finalAdmin);
 constructor(address finalAdmin,address treasury,address quoteSigner,address[] memory settlementSigners,uint16 threshold,uint64 maxQuoteTtl,uint64 maxStartDelay){
  if(block.chainid!=10143)revert WrongChain(block.chainid,10143);if(finalAdmin==address(0))revert InvalidAdmin();
  MoncorVault vault=new MoncorVault(address(this),treasury);SettlementVerifier verifier=new SettlementVerifier(address(this),settlementSigners,threshold);GameRouter router=new GameRouter(finalAdmin,address(vault),address(verifier),quoteSigner,maxQuoteTtl,maxStartDelay);
  vault.configureRouter(address(router));verifier.configureRouter(address(router));
  vault.grantRole(vault.DEFAULT_ADMIN_ROLE(),finalAdmin);vault.grantRole(vault.FEE_PAUSER_ROLE(),finalAdmin);vault.renounceRole(vault.FEE_PAUSER_ROLE(),address(this));vault.renounceRole(vault.DEFAULT_ADMIN_ROLE(),address(this));
  verifier.grantRole(verifier.DEFAULT_ADMIN_ROLE(),finalAdmin);verifier.grantRole(verifier.SIGNER_ADMIN_ROLE(),finalAdmin);verifier.renounceRole(verifier.SIGNER_ADMIN_ROLE(),address(this));verifier.renounceRole(verifier.DEFAULT_ADMIN_ROLE(),address(this));
  emit DeploymentCreated(address(vault),address(verifier),address(router),finalAdmin);
 }
}
