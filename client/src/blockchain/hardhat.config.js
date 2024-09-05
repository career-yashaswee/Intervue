require("dotenv").config();
require("@nomiclabs/hardhat-ethers");

const API_URL =
  "https://eth-sepolia.g.alchemy.com/v2/your_api_key";
const PRIVATE_KEY =
  "wallet_private_address_key";

module.exports = {
  solidity: "0.7.3",
  defaultNetwork: "sepolia",
  networks: {
    hardhat: {},
    sepolia: {
      url: API_URL,
      accounts: [`0x${PRIVATE_KEY}`],
    },
  },
};
