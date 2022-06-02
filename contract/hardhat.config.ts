import "dotenv/config";
import "@nomiclabs/hardhat-waffle";
import type { HardhatUserConfig } from "hardhat/config";
require("./scripts/tasks");
import { getEnvVariable } from "./scripts/helpers";
import "@typechain/hardhat";

const config: HardhatUserConfig = {
  defaultNetwork: "localhost",
  solidity: "0.8.9",
  networks: {
    localhost: {
      url: "http://localhost:8545",
      chainId: 31337,
      accounts: {
        mnemonic: "test test test test test test test test test test test junk",
      },
    },
    mainnet: {
      url: getEnvVariable("MAINNET_RPC", "https://infura.io/v3/"),
      chainId: 1,
      accounts: [getEnvVariable("ACCOUNT_PRIVATE_KEY")],
    },
    rinkeby: {
      url: getEnvVariable("RINKEBY_RPC", "https://rinkeby.infura.io/v3/"),
      chainId: 4,
      accounts: [getEnvVariable("ACCOUNT_PRIVATE_KEY")],
    },
  },
};

export default config;
