require('dotenv').config();
import { Connection as ClusterConnection, PublicKey, clusterApiUrl, LAMPORTS_PER_SOL } from "@solana/web3.js";
import * as token from '@solana/spl-token';
import { getKeypairFromEnvironment, getExplorerLink } from "@solana-developers/helpers";
import { getOrCreateAssociatedTokenAccount } from "@solana/spl-token";

const connection = new ClusterConnection('https://api.devnet.solana.com');

const senderKeypair = getKeypairFromEnvironment("SECRET_KEY");


const mint = new PublicKey('E2NfAVmHWVPHV8ezG7NTSkm6vUYdN8sL636Em1WbS6PA');

const payer = senderKeypair;

const owner = payer.publicKey;


async function ensureTokenAccount() {
  try {
    const associatedTokenAccount = await getOrCreateAssociatedTokenAccount(
      connection,
      payer, 
      mint, 
      owner 
    );

    console.log('Associated token account:', associatedTokenAccount.address.toBase58());
  } catch (error) {
    console.error('Failed to get or create associated token account:', error);
  }
}

ensureTokenAccount();


