import React, { useState, useEffect } from 'react';
import getWeb3 from "../utils/getWeb3";
import FactoryContract from "../contracts/FundraiserFactory.json";

const NewFundraiser = () => {
  const [funds, setFunds] = useState(null);
  const [state, setState] = useState({
    contract: null,
    accounts: null
});
 
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

          // The below code calls our contract method to get the list of the fundraisers. We call our fundraisers() method
          const funds = await instance.methods.fundraisers(10, 0).call();
          setFunds(funds);
      } catch(err) {
          alert("Failed to load web3, accounts, or contract. Check console for details.");
          console.error(err);
      }
        console.log("initializing")
    }

    init();
  }, []);

  console.log(funds)

  return (
    <main>Fundraisers List</main>
  )
}

export default NewFundraiser;