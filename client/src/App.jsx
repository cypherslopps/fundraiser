// import { useState, useEffect } from 'react';
import { Routes, Route, Link, useLocation } from "react-router-dom";
// import FactoryContract from "./contracts/FundraiserFactory.json";
// import getWeb3 from "./utils/getWeb3";
import {
  Home,
  NewFundraiser
} from "./pages";

function App() {
  const { pathname } = useLocation();
  const activeLinkStyle = path => pathname === path ? "text-white font-bold" : "text-gray-300 hover:text-white";
  // const [state, setState] = useState({
  //   web3: null,
  //   accounts: null,
  //   contract: null
  // });

  // useEffect(() => {
  //   const init = async () => {
  //     try {
  //       const web3 = await getWeb3();
  //       const accounts = await web3.eth.getAccounts();
  //       const networkId = await web3.eth.net.getId();
  //       const deployedNetwork = FactoryContract.networks[networkId];
  //       const instance = new web3.eth.Contract(
  //         FactoryContract.abi,
  //         deployedNetwork && deployedNetwork.address
  //       );
  //       console.log(
  //         web3,
  //         accounts,
  //         networkId,
  //         deployedNetwork,
  //         instance 
  //       )

  //       setState({
  //         ...state,
  //         web3,
  //         accounts,
  //         contract: instance
  //       })
  //     } catch(error) {
  //       alert("Failed to load web3, accounts, or contract. Check console for detaile.")
  //       console.error(error);
  //     }
  //   }

  //   init();
  // }, []);

  // const runExample = async () => {
  //   const { accounts, contract} = state;

  // }
  
  return (
    <main className='app text-white pb-12'>
      <nav className="flex py-2.5 px-4 border-b border-zinc-900">
        <ul className="flex items-center gap-x-2.5">
          <li>
            <Link to="/" className={`${activeLinkStyle("/")} transition-colors`}>Home</Link>
          </li>
          <li>
            <Link to="/new" className={`${activeLinkStyle("/new")} transition-colors`}>New</Link>
          </li>
        </ul>
      </nav>

      {/* Routes */}
      <Routes>
        <Route path="/" index element={<Home />} />
        <Route path="/new" element={<NewFundraiser />} />
      </Routes>
    </main>
  )
}

export default App
