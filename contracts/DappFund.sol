//SPDX-License-Identifier: MIT
pragma solidity >=0.7.0 <0.9.0;

import '@openzeppelin/contracts/access/Ownable.sol';
import '@openzeppelin/contracts/utils/Counters.sol';
import '@openzeppelin/contracts/access/AccessControl.sol';

contract DappFund is Ownable, AccessControl {
  using Counters for Counters.Counter;
  Counters.Counter private _totalCharities;
  Counters.Counter private _totalDonation;

  uint256 public charityTax;

  mapping(uint256 => CharityStruct) charities;
  mapping(uint256 => SupportStruct[]) supportersOf;
  mapping(uint256 => bool) public charityExist;

  struct CharityStruct {
    uint256 id;
    address owner;
    string name;
    string fullname;
    string description;
    string image;
    string profile;
    uint256 amount;
    uint256 donations;
    uint256 raised;
    uint256 timestamp;
    bool deleted;
    bool banned;
  }

  struct SupportStruct {
    uint256 id;
    uint256 cid;
    string fullname;
    uint256 amount;
    uint256 timestamp;
    string comment;
    address supporter;
  }

  constructor(uint256 _charityTax) {
    charityTax = _charityTax;
  }

  function createCharity(
    string memory name,
    string memory fullname,
    string memory profile,
    string memory description,
    string memory image,
    uint256 amount
  ) public {
    require(bytes(name).length > 0, 'Name cannot be empty');
    require(bytes(fullname).length > 0, 'Fullname cannot be empty');
    require(bytes(description).length > 0, 'Description cannot be empty');
    require(bytes(profile).length > 0, 'Profile cannot be empty');
    require(bytes(image).length > 0, 'Image cannot be empty');
    require(amount > 0 ether, 'Amount cannot be zero');

    _totalCharities.increment();
    CharityStruct memory charity;
    charity.id = _totalCharities.current();
    charity.owner = msg.sender;
    charity.name = name;
    charity.fullname = fullname;
    charity.description = description;
    charity.image = image;
    charity.profile = profile;
    charity.amount = amount;
    charity.timestamp = currentTime();

    charities[charity.id] = charity;
    charityExist[charity.id] = true;
  }

  function updateCharity(
    uint256 id,
    string memory name,
    string memory fullname,
    string memory profile,
    string memory description,
    string memory image,
    uint256 amount
  ) public {
    require(charityExist[id], 'Charity Not Found');
    require(msg.sender == charities[id].owner, 'Unauthorized Entity');
    require(bytes(name).length > 0, 'Name cannot be empty');
    require(bytes(fullname).length > 0, 'Fullname cannot be empty');
    require(bytes(description).length > 0, 'Description cannot be empty');
    require(bytes(profile).length > 0, 'Profile cannot be empty');
    require(bytes(image).length > 0, 'Image cannot be empty');
    require(amount > 0 ether, 'Amount cannot be zero');

    charities[id].name = name;
    charities[id].fullname = fullname;
    charities[id].image = image;
    charities[id].amount = amount;
    charities[id].profile = profile;
    charities[id].description = description;
  }

  function deleteCharity(uint256 id) public {
    require(charityExist[id], 'Charity Not Found');
    require(msg.sender == charities[id].owner, 'Unauthorized Entity');

    charities[id].deleted = true;
  }

  function toggleBan(uint256 id) public onlyOwner {
    require(charityExist[id], 'Charity Not Found');
    charities[id].banned = !charities[id].banned;
  }

  function donate(uint256 id, string memory fullname, string memory comment) public payable {
    require(charityExist[id], 'Charity Not Found');
    require(!charities[id].banned, 'Charity Banned, contact admin');
    require(msg.value > 0 ether, 'Donation cannot be zero');
    require(charities[id].raised < charities[id].amount, 'Charity budget fulfilled');

    _totalDonation.increment();

    SupportStruct memory support;
    support.id = _totalDonation.current();
    support.cid = id;
    support.fullname = fullname;
    support.supporter = msg.sender;
    support.amount = msg.value;
    support.comment = comment;
    support.timestamp = currentTime();
    supportersOf[id].push(support);

    charities[id].raised += msg.value;
    charities[id].donations += 1;

    uint256 fee = (msg.value * charityTax) / 100;
    uint256 payment = msg.value - fee;

    payTo(charities[id].owner, payment);
    payTo(owner(), fee);
  }

  function changeTax(uint256 _taxPct) public onlyOwner {
    require(_taxPct > 0 && _taxPct <= 100, 'Percent must be between 0 - 100');
    charityTax = _taxPct;
  }

  function getCharity(uint256 id) public view returns (CharityStruct memory) {
    return charities[id];
  }

  function getCharities() public view returns (CharityStruct[] memory Charities) {
    uint256 available;
    for (uint i = 1; i <= _totalCharities.current(); i++) {
      if (
        !charities[i].deleted && !charities[i].banned && charities[i].raised < charities[i].amount
      ) {
        available++;
      }
    }

    Charities = new CharityStruct[](available);

    uint256 index;
    for (uint i = 1; i <= _totalCharities.current(); i++) {
      if (
        !charities[i].deleted && !charities[i].banned && charities[i].raised < charities[i].amount
      ) {
        Charities[index++] = charities[i];
      }
    }
  }

  function getMyCharities() public view returns (CharityStruct[] memory Charities) {
    uint256 available;
    for (uint i = 1; i <= _totalCharities.current(); i++) {
      if (
        !charities[i].deleted &&
        charities[i].raised < charities[i].amount &&
        charities[i].owner == msg.sender
      ) {
        available++;
      }
    }

    Charities = new CharityStruct[](available);

    uint256 index;
    for (uint i = 1; i <= _totalCharities.current(); i++) {
      if (
        !charities[i].deleted &&
        charities[i].raised < charities[i].amount &&
        charities[i].owner == msg.sender
      ) {
        Charities[index++] = charities[i];
      }
    }
  }

  function getSupports(uint256 id) public view returns (SupportStruct[] memory) {
    return supportersOf[id];
  }

  function payTo(address to, uint256 amount) internal {
    (bool success, ) = payable(to).call{ value: amount }('');
    require(success);
  }

  function currentTime() internal view returns (uint256) {
    return (block.timestamp * 1000) + 1000;
  }
}
