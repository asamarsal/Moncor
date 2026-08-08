// SPDX-License-Identifier: MIT
pragma solidity 0.8.36;
import {AccessControl} from "@openzeppelin/contracts/access/AccessControl.sol";
import {EIP712} from "@openzeppelin/contracts/utils/cryptography/EIP712.sol";
import {ECDSA} from "@openzeppelin/contracts/utils/cryptography/ECDSA.sol";
import {MoncorTypes} from "./types/MoncorTypes.sol";
import {SettlementHashing} from "./libraries/SettlementHashing.sol";
import {ISettlementVerifier} from "./interfaces/ISettlementVerifier.sol";

contract SettlementVerifier is AccessControl,EIP712,ISettlementVerifier {
    uint256 public constant TARGET_CHAIN_ID=10143; uint16 public constant MAX_SIGNERS=16;
    bytes32 public constant ROUTER_ROLE=keccak256("ROUTER_ROLE"); bytes32 public constant SIGNER_ADMIN_ROLE=keccak256("SIGNER_ADMIN_ROLE");
    struct SignerSet {uint16 threshold;bool active;bytes32 setHash;}
    uint64 public signerSetVersion; mapping(uint64=>SignerSet) public signerSets; mapping(uint64=>mapping(address=>bool)) public isSigner;
    mapping(bytes32=>bool) public consumedSettlementId; bool public routerConfigured;
    error WrongChain(uint256 actual,uint256 expected);error InvalidConfiguration();error InvalidQuorum(uint256 supplied,uint256 required);error SignersNotStrictlySorted(address signer);error AttestationExpired();error SettlementAlreadyConsumed(bytes32 id);error InactiveSignerSet(uint64 version);
    event SignerSetActivated(uint64 indexed version,bytes32 signerSetHash,uint16 threshold);event SignerRevoked(uint64 indexed version,address indexed signer);event SettlementConsumed(bytes32 indexed settlementId,bytes32 indexed wagerId);
    constructor(address admin,address[] memory signers,uint16 threshold_) EIP712("Moncor SettlementVerifier","1"){if(admin==address(0))revert InvalidConfiguration();_grantRole(DEFAULT_ADMIN_ROLE,admin);_grantRole(SIGNER_ADMIN_ROLE,admin);_activate(signers,threshold_);}
    function threshold() external view returns(uint16){return signerSets[signerSetVersion].threshold;}
    function signerSetActive(uint64 version) external view returns(bool){return signerSets[version].active;}
    function configureRouter(address router) external onlyRole(DEFAULT_ADMIN_ROLE){if(routerConfigured||router==address(0))revert InvalidConfiguration();routerConfigured=true;_grantRole(ROUTER_ROLE,router);}
    function activateSignerSet(address[] calldata signers,uint16 threshold_) external onlyRole(SIGNER_ADMIN_ROLE){_activate(signers,threshold_);}
    function revokeSigner(uint64 version,address signer) external onlyRole(SIGNER_ADMIN_ROLE){if(!signerSets[version].active||!isSigner[version][signer])revert InvalidConfiguration();isSigner[version][signer]=false;emit SignerRevoked(version,signer);}
    function _activate(address[] memory signers,uint16 threshold_) internal {if(signers.length==0||signers.length>MAX_SIGNERS||threshold_==0||threshold_>signers.length)revert InvalidConfiguration();uint64 v=signerSetVersion+1;address prev;for(uint256 i;i<signers.length;i++){if(signers[i]<=prev)revert SignersNotStrictlySorted(signers[i]);isSigner[v][signers[i]]=true;prev=signers[i];}bytes32 h=keccak256(abi.encode(signers));signerSets[v]=SignerSet(threshold_,true,h);signerSetVersion=v;emit SignerSetActivated(v,h,threshold_);}
    function verifyAndConsume(MoncorTypes.SettlementAttestation calldata a,bytes[] calldata sigs) external onlyRole(ROUTER_ROLE) returns(bool){if(block.chainid!=TARGET_CHAIN_ID)revert WrongChain(block.chainid,TARGET_CHAIN_ID);if(block.timestamp>a.validUntil)revert AttestationExpired();SignerSet memory set=signerSets[a.signerSetVersion];if(!set.active)revert InactiveSignerSet(a.signerSetVersion);if(consumedSettlementId[a.settlementId])revert SettlementAlreadyConsumed(a.settlementId);if(sigs.length!=set.threshold)revert InvalidQuorum(sigs.length,set.threshold);bytes32 digest=_hashTypedDataV4(SettlementHashing.hash(a));address prev;for(uint256 i;i<sigs.length;i++){address s=ECDSA.recover(digest,sigs[i]);if(s<=prev)revert SignersNotStrictlySorted(s);if(!isSigner[a.signerSetVersion][s])revert InvalidQuorum(i,set.threshold);prev=s;}consumedSettlementId[a.settlementId]=true;emit SettlementConsumed(a.settlementId,a.wagerId);return true;}
}
