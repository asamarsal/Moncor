// SPDX-License-Identifier: MIT
pragma solidity 0.8.36;

import "forge-std/Script.sol";
import {DeployMonadTestnet} from "./DeployMonadTestnet.s.sol";

contract DeployLocal is Script {
    function run() external {
        uint256 deployerPrivateKey = 0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80; // Anvil account 0
        address deployerAddr = vm.addr(deployerPrivateKey);

        address[] memory settlementSigners = new address[](1);
        settlementSigners[0] = deployerAddr;

        vm.startBroadcast(deployerPrivateKey);

        // Parameters: admin, treasury, quoteSigner, settlementSigners, threshold, maxQuoteTtl, maxStartDelay
        new DeployMonadTestnet(
            deployerAddr, 
            deployerAddr, 
            deployerAddr, 
            settlementSigners, 
            1, 
            86400, 
            86400
        );

        vm.stopBroadcast();
    }
}
