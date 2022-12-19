// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts-upgradeable/token/ERC20/ERC20Upgradeable.sol";
import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";


contract UpgradeableLagrangePlatform is Initializable, OwnableUpgradeable {
    IERC20 public lagrangeToken;

    event DataUpload(address uploader, uint size, uint reward);
    event ModelUpload(address uploader, uint reward);

    /// @custom:oz-upgrades-unsafe-allow constructor
    constructor() {
        _disableInitializers();
    }

    function initialize(address lagrangeTokenAddress) initializer public {
        lagrangeToken = IERC20(lagrangeTokenAddress);
        __Ownable_init();
    }


    /*
    * Concern: we cannot let the user call this function, otherwise they would repeatedly call it to reap rewards
    * (without uploading). So we set this function to onlyOwner. However, this would rack up gas fees on our side.
    *
    * Proposal (not sure how impactful), user uploads data to backend, backend called onlyOwner reward function,
    * user calls claim function, so they are the ones to pay the fee for the token transfer.
    * add some mapping (address => uint) userRewards? to track how many tokens a user is eligible to claim.
    */
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