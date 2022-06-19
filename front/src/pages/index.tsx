import * as React from "react";
import type { NextPage } from "next";
import HomeTemplate from "../components/templates";
import { ethers } from "ethers";
import * as Config from "../config/constant";
import { ContractContext } from "../generated-type/contract";

import abi from "../config/abi.json";
declare var window: any;

const Home: NextPage = () => {
  const onClick = async (mintNum: number) => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    await provider.send("eth_requestAccounts", []);
    const signer = provider.getSigner();
    const contract = (await new ethers.Contract(
      Config.contractAddress,
      abi,
      signer
    )) as unknown as ContractContext;
    const mintCost = (Config.publicSalePrice * mintNum).toString();
    const mintConfig = {
      value: ethers.utils.parseEther(mintCost),
    };

    await contract.publicMint(mintNum, mintConfig);
  };

  return <HomeTemplate onClick={onClick} />;
};

export default Home;
