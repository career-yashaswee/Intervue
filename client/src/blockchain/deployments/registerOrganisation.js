const { ethers } = require("ethers");

// Define your Alchemy HTTP endpoint for the Sepolia network
const API_URL = "";

// Connect to the Alchemy provider
const provider = new ethers.providers.JsonRpcProvider(API_URL);

// Your wallet's private key (keep it secure!)
const PRIVATE_KEY = "";

// Create a signer with your private key and connect it to the provider
const signer = new ethers.Wallet(PRIVATE_KEY, provider);

// Define the ABI for your contract (replace with the actual ABI of your contract)
const adminAbi = [];

// Your deployed contract's address
const adminContractAddress = "0x2ca79F78AA1643f92c81558175CB424dc2b5AB47";

// Create an instance of the contract
const adminContract = new ethers.Contract(
  adminContractAddress,
  adminAbi,
  signer
);

// Function to register an organization
async function registerOrganization() {
  try {
    const tx = await adminContract.registerUser(
      "0xBa04b91cc7aBF5E0DbDb7E5fd507657870Aefe56",
      "Amazon", // Name
      "New York", // Location
      "Amazon is a parent organisation to Prime Videos", // Description
      2 // Role (2 for Organization)
    );

    console.log("Transaction sent:", tx.hash);

    // Wait for the transaction to be mined
    await tx.wait();
    console.log("Organization registered!");
  } catch (error) {
    console.error("Error registering organization:", error);
  }
}

// Call the function to register an organization
registerOrganization();
