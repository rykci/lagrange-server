// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract LagrangePlatform is Ownable {
    IERC20 public lagrangeToken;

    event DataUpload(address uploader, uint size, uint reward);
    event ModelUpload(address uploader, uint reward);

    constructor(address lagrangeTokenAddress) {
        lagrangeToken = IERC20(lagrangeTokenAddress);
    }

    function rewardDataUpload(address uploader, uint size) public onlyOwner {
        require(uploader != address(0), 'zero address cannot be an uploader');
        require(size > 0, 'data cannot be size 0');

        uint numGB = size / (10 ** 9);

        uint reward;
        if (numGB == 0) {
            reward = 1 ether;
        } else {
            reward = 0.5 ether * numGB;
        }

        require(lagrangeToken.balanceOf(address(this)) > reward, 'not enough contract balance to pay uploader');

        lagrangeToken.transfer(uploader, reward);
        emit DataUpload(uploader, size, reward);
    }

    function rewardModelUpload(address uploader) public onlyOwner {
        uint reward = 2 ether;
        require(lagrangeToken.balanceOf(address(this)) > reward, 'not enough contract balance to pay uploader');

        lagrangeToken.transfer(uploader, reward);
        emit ModelUpload(uploader, reward);
    }

    function withdraw(uint amount) public onlyOwner {
        require (amount <= lagrangeToken.balanceOf(address(this)), 'Not enough balance to withdraw');
        lagrangeToken.transfer(msg.sender, amount);
    }
}