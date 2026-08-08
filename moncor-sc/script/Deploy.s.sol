// SPDX-License-Identifier: MIT
pragma solidity 0.8.36;

import "forge-std/Script.sol";
import {DeployMonadTestnet} from "./DeployMonadTestnet.s.sol";

contract DeployTestnet is Script {
    function run() external {
        uint256 deployerPrivateKey = vm.envUint("PRIVATE_KEY");
        address deployerAddr = vm.addr(deployerPrivateKey);

        address[] memory settlementSigners = new address[](1);
        settlementSigners[0] = deployerAddr;

        vm.startBroadcast(deployerPrivateKey);

        // Parameters: finalAdmin, treasury, quoteSigner, settlementSigners, threshold, maxQuoteTtl, maxStartDelay
        DeployMonadTestnet deployment = new DeployMonadTestnet(
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
