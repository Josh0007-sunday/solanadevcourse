import { createCreateMetadataAccountV3Instruction } from "@metaplex-foundation/mpl-token-metadata";
require('dotenv').config();
import { Connection as ClusterConnection, PublicKey, clusterApiUrl, LAMPORTS_PER_SOL, Transaction, sendAndConfirmTransaction } from "@solana/web3.js";
import * as token from '@solana/spl-token';
import { getKeypairFromEnvironment, getExplorerLink } from "@solana-developers/helpers";

const connection = new ClusterConnection('https://api.devnet.solana.com');

const senderKeypair = getKeypairFromEnvironment("SECRET_KEY");

const TOKEN_METADATA_PROGRAM_ID = new PublicKey(
    "metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s"
);

const tokenMintAccount = new PublicKey("E2NfAVmHWVPHV8ezG7NTSkm6vUYdN8sL636Em1WbS6PA");

const metadataData = {
    name: "Solana Husky",
    symbol: "HUSKY",
    uri: "https://arweave.net/UlmmGmc4On5NjmK9na6Ek4sNx4sBIk19nfRwJF-Y9sQ",
    sellerFeeBasisPoints: 0,
    creators: null,
    collection: null,
    uses: null,
};

const metadataPDAAndBump = PublicKey.findProgramAddressSync(
    [
        Buffer.from("metadata"),
        TOKEN_METADATA_PROGRAM_ID.toBuffer(),
        tokenMintAccount.toBuffer(),
    ],
    TOKEN_METADATA_PROGRAM_ID
);

const metadataPDA = metadataPDAAndBump[0];

const transaction = new Transaction();

const createMetadataAccountInstruction = createCreateMetadataAccountV3Instruction(
    {
        metadata: metadataPDA,
        mint: tokenMintAccount,
        mintAuthority: senderKeypair.publicKey,
        payer: senderKeypair.publicKey,
        updateAuthority: senderKeypair.publicKey
    },
    {
        createMetadataAccountArgsV3: {
            collectionDetails: null,
            data: metadataData,
            isMutable: true,
        },
    }
);
transaction.add(createMetadataAccountInstruction);

const transactionSignature = await sendAndConfirmTransaction(
  connection,
  transaction,
  [senderKeypair]
);

const transactionLink = getExplorerLink(
  "transaction",
  transactionSignature,
  "devnet"
);
console.log(`✅ Transaction confirmed, explorer link is: ${transactionLink}!`);

const tokenMintLink = getExplorerLink(
  "address",
  tokenMintAccount.toString(),
  "devnet"
);

console.log(`✅ Look at the token mint again: ${tokenMintLink}!`);