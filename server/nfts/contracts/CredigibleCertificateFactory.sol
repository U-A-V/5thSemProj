// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

import {CredigibleCertificateCollection} from "./CredigibleCertificate.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract CredigibleCertificateFactory is Ownable {
    event Create(address);
    event UserCollectionCallback(address index , address);

    mapping(address => address[]) public userCollections;
    mapping(address => bool) public collectionList;
    constructor(){
        _transferOwnership(msg.sender);
    }

    function create(
        string calldata name,
        string calldata symbol
    ) external returns(address created) {
        created = address(
            new CredigibleCertificateCollection(
                name,
                symbol,
                msg.sender,
                address(this)
            )
        );
        collectionList[created] = true;
        emit Create(created);
    }

    function getUserCollection(address user) public view returns (address[] memory) {
        return userCollections[user];
    }

    function userCollectionCallback(
        address user
    ) external {
        require(collectionList[msg.sender], "Not a collection!");
        userCollections[user].push(msg.sender);
        emit UserCollectionCallback(user, msg.sender);
    }
}
