import { mintTo } from "@solana/spl-token";
require('dotenv').config();
import { getKeypairFromEnvironment, getExplorerLink } from "@solana-developers/helpers";
import { Connection as ClusterConnection, PublicKey } from "@solana/web3.js";

// Ensure the connection to Solana devnet
const connection = new ClusterConnection('https://api.devnet.solana.com');

// Constants
const MINOR_UNITS_PER_MAJOR_UNITS = Math.pow(10, 2);

// Fetch the sender keypair from environment
const senderKeypair = getKeypairFromEnvironment("SECRET_KEY");

// Define the token mint account and owner
const tokenMintAccount = new PublicKey("E2NfAVmHWVPHV8ezG7NTSkm6vUYdN8sL636Em1WbS6PA");
const owner = new PublicKey("senmuM6dYSRHvLhYbfHwXXodKxJ2qkmUrjPNS9NHRad");

(async () => {
  try {
    // Mint tokens to the owner account
    const transactionSignature = await mintTo(
      connection,
      senderKeypair,
      tokenMintAccount,
      owner,
      senderKeypair,
      10000 * MINOR_UNITS_PER_MAJOR_UNITS
    );

    // Generate the Solana Explorer link
    const link = getExplorerLink("transaction", transactionSignature, "devnet");

    // Log success message with transaction link
    console.log(`✅ Success! Mint Token Transaction: ${link}`);
  } catch (error) {
    // Log the error if the transaction fails
    console.error('Error during minting tokens:', error);
  }
})();
