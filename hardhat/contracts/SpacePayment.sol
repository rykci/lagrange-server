// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/access/Ownable.sol";

import "./LagrangeDAOToken.sol";

contract SpacePayment is Ownable {
    mapping(address => uint) private balance;

    // rate is 1 LAD = $0.03
    mapping(uint => uint) public hardwareToPricePerHour;

    LagrangeDAOToken public ladToken;

    constructor(address tokenAddress) {
        ladToken = LagrangeDAOToken(tokenAddress);

        hardwareToPricePerHour[1] = 0;
        hardwareToPricePerHour[2] = 1;
        hardwareToPricePerHour[3] = 20;
        hardwareToPricePerHour[4] = 30;
        hardwareToPricePerHour[5] = 35;
        hardwareToPricePerHour[6] = 105;
    }

    function deposit(uint amount) public {
        require(ladToken.allowance(msg.sender, address(this)) >= amount, "ERC20: allowance is too low");

        ladToken.transferFrom(msg.sender, address(this), amount);
        balance[msg.sender] += amount;
    }

    function balanceOf(address account) public view returns (uint) {
        return balance[account];
    }

    function buySpace(uint hardwareType) public {
        require(balance[msg.sender] >= hardwareToPricePerHour[hardwareType], "not enough balance");

        balance[msg.sender] -= hardwareToPricePerHour[hardwareType];
    }

    function withdraw(uint amount) public onlyOwner {
        require(amount <= ladToken.balanceOf(address(this)), "not enough tokens to withdraw");

        ladToken.transfer(msg.sender, amount);
    }

}