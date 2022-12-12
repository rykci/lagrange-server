// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Capped.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract LagrangeToken is ERC20Capped, Ownable {
    uint public constant TOKEN_CAP = 1 ether * 10 ** 9;


    constructor() ERC20Capped(TOKEN_CAP) ERC20("Lagrange Token", "LAG") {
        _mint(address(this), TOKEN_CAP * 15 / 100);  // premint 15%
    }


}