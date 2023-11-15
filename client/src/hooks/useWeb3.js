import { useState, useEffect } from "react";
import getWeb3 from "../utils/getWeb3";
import FactoryContract from "../contracts/FundraiserFactory.json";

const useWeb3 = () => {
    const [state, setState] = useState({
        web3: null,
        contract: null,
        accounts: null
    });

    useEffect(() => {
        async function init() {
            // try {
            //     const web3 = await getWeb3();
            //     const networkId = await web3.eth.new.getId();
            //     const deployedNetwork = FactoryContract.networks[networkId];
            //     const accounts = await web3.eth.getAccounts();
            //     const instance = new web3.eth.Contract(
            //         FactoryContract.abi,
            //         deployedNetwork && deployedNetwork.address
            //     );
            //     // console.log(
            //     //     networkId,
            //     //     "Network Id",
            //     //     deployedNetwork,
            //     //     "Deployed Network",
            //     //     accounts,
            //     //     "Accounts",
            //     //     instance,
            //     //     "Contract Instance"
            //     // );

            //     setState({
            //         ...state,
            //         web3,
            //         contract: instance,
            //         accounts
            //     });
            // } catch(err) {
            //     alert("Failed to load web3, accounts, or contract. Check console for details.");
            //     console.error(err);
            // }
            console.log("initializing")
        }

        init();
    }, []);

    return state;
}

export default useWeb3;