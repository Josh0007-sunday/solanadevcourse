if your seeing this, this is the repo for the recent course 
to initialize your project follow through the steps or clone the repo
First create a file on your machine 
    mkdir solanadevcourse
    cd  solanadevcourse
    npm init 
    npm install typescript @solana/web3.js esrun @solana-developers/helpers

To generate transaction between two keypairs, first we are going to generate a keypair using the solana cli to speed things up 
    solana-keygen grind --starts-with sen:1 (generating a vanity keypair for the sender)
     solana-keygen grind --starts-with rec:1 (generating a vanity keypair for the receiver)
or you can go ahead and follow through the steps of generating a new keypair https://www.soldev.app/course/intro-to-cryptography

next we would import all necessary tools
    import { getKeypairFromEnvironment } from "@solana-developers/helpers";
    import { Connection as ClusterConnection, PublicKey, clusterApiUrl, LAMPORTS_PER_SOL, GetLatestBlockhashConfig, Transaction, SystemProgram, Keypair, sendAndConfirmTransaction, Blockhash } from "@solana/web3.js";

with this were good to go
look for ==> sendTransaction.ts and run the already designed code
    use the line 
      npx esrun sendTransaction.ts

note this code can be easily modified
big w ✅✅
>>>>>>> 6cb5ac3412fd10fdaa288e1aeab80132a0c54ab2
