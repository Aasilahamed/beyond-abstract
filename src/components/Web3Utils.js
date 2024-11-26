import { ethers } from "ethers";

// Connect to the wallet and return provider, signer, and address
export const connectWallet = async () => {
  if (typeof window.ethereum === "undefined") {
    throw new Error("MetaMask is not installed!");
  }

  // Request user to connect their wallet
  await window.ethereum.request({ method: "eth_requestAccounts" });

  // Create provider and signer
  const provider = new ethers.BrowserProvider(window.ethereum); // Correct for Ethers.js v6
  const signer = await provider.getSigner(); // Asynchronous in v6
  const address = await signer.getAddress(); // Retrieve the wallet address

  return { provider, signer, address };
};

// Get the balance of the provided address
export const getBalance = async (address, provider) => {
  if (!provider) {
    throw new Error("Provider is not available");
  }

  // Get balance from the Ethereum network
  const balance = await provider.getBalance(address);
  return ethers.formatEther(balance); // Format the balance in Ether
};
