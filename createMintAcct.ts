require('dotenv').config();
import { Connection as ClusterConnection, PublicKey, clusterApiUrl, LAMPORTS_PER_SOL } from "@solana/web3.js";
import * as token from '@solana/spl-token';
import { getKeypairFromEnvironment, getExplorerLink } from "@solana-developers/helpers";

const connection = new ClusterConnection('https://api.devnet.solana.com');

const senderKeypair = getKeypairFromEnvironment("SECRET_KEY");

console.log(`loaded env publickey ${senderKeypair.publicKey.toBase58}`);

const tokenMint = await token.createMint(connection, senderKeypair, senderKeypair.publicKey, null, 2);

const link = getExplorerLink("address", tokenMint.toString(), 'devnet');
console.log(`finished creating token mint: ${link}`);