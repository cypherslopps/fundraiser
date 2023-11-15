import React, { useState, useEffect } from 'react'
import { Input, Textarea } from '../components/Input';
import getWeb3 from "../utils/getWeb3";
import FactoryContract from "../contracts/FundraiserFactory.json";

const NewFundraiser = () => {
  const [newFundraiser, setNewFundraiser] = useState({
    name: "",
    website: "",
    description: "",
    image: "",
    address: "",
    custodian: "",
  });

  const [state, setState] = useState({
    contract: null,
    accounts: null
});
  
  const [nameError, setNameError] = useState("");
  const [websiteError, setWebsiteError] = useState("");
  const [descriptionError, setDescriptionError] = useState("");
  const [imageError, setImageError] = useState("");
  const [addressError, setAddressError] = useState("");
  const [custodianError, setCustodianError] = useState("");
 
  useEffect(() => {
    async function init() {
      try {
          const web3 = await getWeb3();
          const networkId = await web3.eth.new.getId();
          const deployedNetwork = FactoryContract.networks[networkId];
          const accounts = await web3.eth.getAccounts();
          const instance = new web3.eth.Contract(
              FactoryContract.abi,
              deployedNetwork && deployedNetwork.address
          );
          console.log(
              networkId,
              "Network Id",
              deployedNetwork,
              "Deployed Network",
              accounts,
              "Accounts",
              instance,
              "Contract Instance"
          );

          setState({
            ...state,
            contract: instance,
            accounts
          });
      } catch(err) {
          alert("Failed to load web3, accounts, or contract. Check console for details.");
          console.error(err);
      }
        console.log("initializing")
    }

    init();
}, []);

  const handleChange = ({ target }) => {
    const { value, name } = target;

    setNewFundraiser({
      ...newFundraiser,
      [name]: value
    });
  }

  const submitNewFundraiser = async (e) => {
    e.preventDefault();

    try {
      const { name, website, description, image, address, custodian } = newFundraiser;
      await contract.methods.createFundraiser(
        name,
        website,
        description,
        image,
        address, 
        custodian
      ).send({ from: accounts[0] });

      alert("Successfully created fundraiser");
    } catch(err) {
      console.log(err);
    }
  }

  return (
    <div className='flex justify-center pt-10'>
      <div className="w-[40%] border border-zinc-800/80 py-4 px-5">
        <h1 className="text-2xl font-bold text-gray-300 mb-6 text-center">New Fundraiser</h1> 
        
        <form 
          className='grid gap-y-3'
          onSubmit={submitNewFundraiser}
        >
          <Input 
            type="test"
            name="name"
            lable="Name"
            placeholder="Fundraiser Name"
            value={newFundraiser.name}
            onChange={handleChange}
            error={nameError}
          />

          <Input 
            type="text"
            name="website"
            lable="Website"
            placeholder="Fundraiser Website"
            value={newFundraiser.website}
            onChange={handleChange}
            error={websiteError}
          />

          <Textarea
            lable="Description"
            name="description"
            placeholder="Fundraiser Description"
            value={newFundraiser.description}
            onChange={handleChange}
            error={descriptionError}
          />

          <Input 
            type="file"
            name="image"
            lable="Image"
            placeholder="Fundraiser Image"
            value={newFundraiser.image}
            onChange={handleChange}
            error={imageError}
          />

          <Input 
            type="text"
            name="address"
            lable="Address"
            placeholder="Fundraiser Ethereum Address"
            value={newFundraiser.address}
            onChange={handleChange}
            error={addressError}
          />

          <Input 
            type="text"
            name="custodian"
            lable="Custodian"
            placeholder="Fundraiser Custodian"
            value={newFundraiser.custodian}
            onChange={handleChange}
            error={custodianError}
          />

          <button
            type="submit" 
            className='mt-2 w-full flex justify-center h-10 rounded-md text-[.93rem] cursor-pointer transition-colors hover:bg-teal-700 items-center gap-x-3 bg-teal-600 focus:ring-2 focus:ring-teal-600 focus:ring-offset-2 focus:ring-offset-[#110f0f]'
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  )
}

export default NewFundraiser;