require('dotenv').config();
import { getKeypairFromEnvironment } from "@solana-developers/helpers";
import { Connection as ClusterConnection, PublicKey, clusterApiUrl, LAMPORTS_PER_SOL, GetLatestBlockhashConfig, Transaction, SystemProgram, Keypair, sendAndConfirmTransaction, Blockhash } from "@solana/web3.js";
//Here I imported all necessary function were going to use in creating a transaction
//clusterConnection
//Publickey
//clusterApiurl
//LAMPORT_PER_SOL etc

const connection = new ClusterConnection('https://api.devnet.solana.com');
// Here were going to create our network and we would be using devnet to run th

const senderKeypair = getKeypairFromEnvironment("SECRET_KEY");
//so here i imported in the senders keypair
// (the program uses the sender secret key to pay rent, send the desired lamport and sign the transaction)

const recipient = new PublicKey('reCCBTY37ZusLVGFguZ3EHbXUUxK8oT5cfC2zmdUcD9');
//recipient address(address receiving the sol)

async function transferSol(senderKeypair: Keypair, recipient: PublicKey) {
    //using an async function, let send sol from sender keypair to recipient publickey
    try {
        const recentBlockhash = (await connection.getLatestBlockhash());
        //we must add recent blockhash
        const transferInstruction = SystemProgram.transfer({
            fromPubkey: senderKeypair.publicKey,
            toPubkey: recipient,
            lamports: 200000000,
        });
        //add transfer instruction, from system takes in the parameters
        //fromPubkey --> senderkeypair -->publickey
        //toPublicKey --> recipient
        //lampport (1billion lamport == 1 sol)

        const transaction = new Transaction().add(transferInstruction);
        //create a new transaction

        transaction.recentBlockhash = recentBlockhash.blockhash;
        //recent blockhash must be added to a transaction

        transaction.sign(senderKeypair);
        //signer is the senders keypair

        const balance = await connection.getBalance(recipient);
        const sbalance = await connection.getBalance(senderKeypair.publicKey);

        const signature = await sendAndConfirmTransaction(connection, transaction, [senderKeypair]);
        //send snd confirm the signature with connection, transaction and senders keypair
        console.log("✅Transaction Signature:", signature);
        //lets print out the signature
        console.log ("✅The recipient Balance is:" , balance);
        //lets print out the recipient balance
        console.log ("✅The senders Balance is:" , sbalance);
        //lets print out the senders balance
    } catch (error) {
        console.error("Error:", error);
        //if theree are any errors in the process print it
    }
}

transferSol(senderKeypair, recipient);

//what will be printed out
//✅Transaction Signature: 5qh51cgnouAcoYJbNDkcmpM1XN3L8Wxks85esfSynN46biUwduUmFwq9imu8khWHgaYfCWAu7KXE9bJ7zRKpBM59
//✅The recipient Balance is: 900000000
//✅The senders Balance is: 1099985000
