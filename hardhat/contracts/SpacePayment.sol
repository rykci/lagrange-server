// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

import "./LagrangeDAOToken.sol";

contract SpacePayment is Ownable {
    using Counters for Counters.Counter;
    Counters.Counter private spaceCounter;

    mapping(uint256 => Space) public idToSpace;
    mapping(address => uint256) private balance;

    // rate is 1 LAD = $0.03
    mapping(uint256 => uint256) public hardwareToPricePerEpoch;
    uint256 public epochDuration = 1 hours;

    struct Space {
        address owner;
        uint256 hardwareType;
        uint256 expiryTime;
    }

    LagrangeDAOToken public ladToken;

    event SpaceCreated(uint256 id, address owner, uint256 hardwareType, uint256 expiryTime);
    event ExpiryExtended(uint256 id, uint256 expiryTime);
    event EpochDurationChanged(uint256 epochDuration);
    event HardwarePriceChanged(uint256 hardwareType, uint256 price);

    constructor(address tokenAddress) {
        ladToken = LagrangeDAOToken(tokenAddress);

        hardwareToPricePerEpoch[1] = 0 ether;
        hardwareToPricePerEpoch[2] = 1 ether;
        hardwareToPricePerEpoch[3] = 20 ether;
        hardwareToPricePerEpoch[4] = 30 ether;
        hardwareToPricePerEpoch[5] = 35 ether;
        hardwareToPricePerEpoch[6] = 105 ether;
    }

    function deposit(uint256 amount) public {
        require(
            ladToken.allowance(msg.sender, address(this)) >= amount,
            "ERC20: allowance is too low"
        );

        ladToken.approve(msg.sender, amount);
        ladToken.transferFrom(msg.sender, address(this), amount);
        balance[msg.sender] += amount;
    }

    function balanceOf(address account) public view returns (uint256) {
        return balance[account];
    }

    function buySpace(uint256 hardwareType, uint256 duration) public {
        uint256 price = (hardwareToPricePerEpoch[hardwareType] * duration) / epochDuration;
        require(balance[msg.sender] >= price, "not enough balance");

        uint256 spaceId = spaceCounter.current();
        spaceCounter.increment();

        uint256 expiryTime = block.number + duration;
        balance[msg.sender] -= price;
        idToSpace[spaceId] = Space(msg.sender, hardwareType, expiryTime);

        emit SpaceCreated(spaceId, msg.sender, hardwareType, expiryTime);
    }

    function extendSpace(uint256 spaceId, uint256 duration) public {
        Space memory space = idToSpace[spaceId];
        require(space.expiryTime > 0, "space not found");
        uint256 price = (hardwareToPricePerEpoch[space.hardwareType] * duration) / epochDuration;
        require(balance[msg.sender] >= price, "not enough balance");

        balance[msg.sender] -= price;
        if (isExpired(spaceId)) {
            idToSpace[spaceId].expiryTime += block.number + duration;
        } else {
            idToSpace[spaceId].expiryTime += duration;
        }

        emit ExpiryExtended(spaceId, idToSpace[spaceId].expiryTime);
    }

    function isExpired(uint256 spaceId) public view returns (bool) {
        return idToSpace[spaceId].expiryTime <= block.number;
    }

    function spaceInfo(uint256 spaceId) public view returns (Space memory) {
        return idToSpace[spaceId];
    }

    function changeEpochDuration(uint256 newDuration) public onlyOwner {
        epochDuration = newDuration;
        emit EpochDurationChanged(newDuration);
    }

    function changeHardwarePrice(uint256 hardwareType, uint256 newPrice) public onlyOwner {
        hardwareToPricePerEpoch[hardwareType] = newPrice;
        emit HardwarePriceChanged(hardwareType, newPrice);
    }

    function withdraw(uint256 amount) public onlyOwner {
        require(amount <= ladToken.balanceOf(address(this)), "not enough tokens to withdraw");

        ladToken.transfer(msg.sender, amount);
    }
}
