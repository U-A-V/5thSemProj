// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract CredigibleCertificate is ERC721, Ownable {
    
    constructor(string memory name_, string memory symbol_) ERC721(name_, symbol_) {
        //_owner = msg.sender;
        //Ownable();
        //ERC721("PU CERTS", "PUC");
        _transferOwnership(msg.sender);
    }

    uint256 private supply = 0;

    struct CredigibleMetadata{
        uint256 id;
        string IPFS_hash;
        address publisher;
        string encrypted_IPFS_hash;
    }

    mapping(address => uint256) private balances;
    mapping(uint256 => CredigibleMetadata) public metadata;
    mapping(address => CredigibleMetadata[]) public certificates;



    function mint(address targetAddress, string calldata _IPFS_hash, string calldata _encrypted_IPFS_hash) onlyOwner public {
        balances[targetAddress]++;
        _mint(targetAddress, supply+1);
        CredigibleMetadata memory current = CredigibleMetadata({
            id: supply+1,
            IPFS_hash: _IPFS_hash,
            publisher: msg.sender,
            encrypted_IPFS_hash: _encrypted_IPFS_hash
        });

        metadata[supply+1] = current;
        certificates[targetAddress].push(current);
        supply++;


    }

    function _beforeTokenTransfer(address from, address to, uint256 tokenID) internal virtual override(ERC721) {
        require(from == 0x0000000000000000000000000000000000000000, "Cannot transfer cert");
        super._beforeTokenTransfer(from, to, tokenID);
    }


    function getAmountOfCertificate(address targetAddress) public view returns (uint256) {
        return balances[targetAddress];
    }
}
