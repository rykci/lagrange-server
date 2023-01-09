// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Capped.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract LagrangeDAOToken is ERC20Capped, Ownable {
    uint public constant TOKEN_CAP = 1 ether * 10 ** 9;


    constructor(address holder) ERC20Capped(TOKEN_CAP) ERC20("Lagrange DAO Token", "LAD") {
        ERC20._mint(holder, TOKEN_CAP * 15 / 100);  // premint 15%
    }


}