// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

import { Fundraiser } from "./Fundraiser.sol";

contract FundraiserFactory {
  Fundraiser[] private _fundraisers;

  event FundraiserCreated(Fundraiser indexed fundraiser, address indexed owner);

  function fundraisersCount() public view returns(uint256) {
    return _fundraisers.length;
  }

  function createFundraiser(
    string memory name,
    string memory url,
    string memory imageURL,
    string memory description,
    address payable beneficiary
  ) public {
    Fundraiser fundraiser = new Fundraiser(
      name,
      url,
      imageURL,
      description,
      beneficiary,
      msg.sender
    );

    _fundraisers.push(fundraiser);
    emit FundraiserCreated(fundraiser, msg.sender);
  }

  // uint256 limit, uint256 offset
  function fundraisers(uint256 limit) public  view returns(Fundraiser[] memory coll) {
    uint256 size = fundraisersCount() < limit ? fundraisersCount() : limit;
    coll = new Fundraiser[](size);

    return coll;
  } 
}
