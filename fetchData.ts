import { Connection as ClusterConnection, PublicKey, clusterApiUrl, LAMPORTS_PER_SOL } from "@solana/web3.js";
//importing necessary dependencies

async function getAddressData(address: string) {
    try {
        // connection
        const connection = new ClusterConnection('https://api.mainnet-beta.solana.com');

        
        const publicKey = new PublicKey(address)

        const accountinfo = await connection.getAccountInfo(publicKey);

        const balance = await connection.getBalance(publicKey);
        const balanceInSol = balance / LAMPORTS_PER_SOL;
        if (accountinfo === null) {
            console.log('Account Not Found');
        }

        const data = accountinfo!.data.toString();
        console.log('Account data', data, balanceInSol);
    } catch (error) {
        console.error('error fetching data', error);
    }
}

getAddressData('HuDEMx6hGxCYWYJKivCSFM8UX21Acgkwgd1UfFJ3qaGN',);