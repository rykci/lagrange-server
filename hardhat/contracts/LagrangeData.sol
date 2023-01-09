// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract LagrangeData is ERC1155, Ownable {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIdCounter;

    mapping(uint => string) private dataCID;

    constructor() ERC1155("") {}

    function setURI(string memory newuri) public onlyOwner {
        _setURI(newuri);
    }

    function mint(address account, uint256 amount, string memory cid)
        public
        onlyOwner
    {
        _tokenIdCounter.increment();
        uint256 tokenId = _tokenIdCounter.current();

        dataCID[tokenId] = cid;
        _mint(account, tokenId, amount, "");
    }

    // get the current id count of tokens
    function idCount() public view returns (uint256) {
        return _tokenIdCounter.current();
    }

    function getData(uint id) public view returns (string memory) {
        require(balanceOf(msg.sender, id) > 0, 'data access denied');

        return dataCID[id];
    }

}