// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

interface ICredigibleCertificateFactory {
    function userCollectionCallback(address user) external;
}


contract CredigibleCertificateCollection is ERC721, Ownable {
    
    event CredigibleMint(uint256, address);
    address public factoryAddress;

    constructor(
        string memory name_,
        string memory symbol_,
        address _owner,
        address _factoryAddress
    ) ERC721(name_, symbol_) {
        _transferOwnership(_owner);
        factoryAddress = _factoryAddress;
    }

    uint256 private supply = 0;

    struct CredigibleMetadata{
        uint256 id;
        //string IPFS_hash;
        address publisher;
        string title;
        string description;
        uint256 timestamp;
        address targetAddress;
        //string encrypted_IPFS_hash;
    }

    mapping(address => uint256) private balances;
    mapping(uint256 => CredigibleMetadata) public metadata;
    mapping(address => CredigibleMetadata[]) public certificates;
    CredigibleMetadata[] certs;

    function getCertificatesOfUser(address user) view public returns (CredigibleMetadata[] memory) {
        return certificates[user];
    }

    function getAllCerts() view public returns (CredigibleMetadata[] memory) {
        return certs;
    }

    function mint(
        address targetAddress,
        string calldata title,
        string calldata description,
        uint256 timestamp
        //string calldata _IPFS_hash,
        //string calldata _encrypted_IPFS_hash
    ) onlyOwner public {
        balances[targetAddress]++;
        _mint(targetAddress, supply+1);
        CredigibleMetadata memory current = CredigibleMetadata({
            id: supply+1,
            //IPFS_hash: _IPFS_hash,
            publisher: msg.sender,
            title: title,
            description: description,
            targetAddress: targetAddress,
            timestamp: timestamp
            //encrypted_IPFS_hash: _encrypted_IPFS_hash
        });

        metadata[supply+1] = current;
        if(certificates[targetAddress].length == 0){
            // callback
            ICredigibleCertificateFactory(factoryAddress).userCollectionCallback(targetAddress);
        }
        certificates[targetAddress].push(current);
        certs.push(current);
        supply++;
        emit CredigibleMint(supply, targetAddress);


    }

    function _beforeTokenTransfer(address from, address to, uint256 tokenID) internal virtual override(ERC721) {
        require(from == 0x0000000000000000000000000000000000000000, "Cannot transfer cert");
        super._beforeTokenTransfer(from, to, tokenID);
    }


    function getAmountOfCertificate(address targetAddress) public view returns (uint256) {
        return balances[targetAddress];
    }
}
