import { OasisSapphireTestnet } from "./OasisSapphireTestnet";
import { ethers, verifyMessage, Wallet } from "ethers";
import contractABI from "./contractABI.json" assert { type: "json" };
const contractAddress = "0x141609F9B466b55736cBB4C680984Aef0358abe6";

let Contract: ethers.Contract | null = null;

if (!process.env.PRIVATE_KEY) {
    throw new Error('Invalid/Missing environment variable: "PRIVATE_KEY"')
}

// export default async function GetContract(){
//     if (Contract == null) {
//         const url = OasisSapphireTestnet.rpcUrls.public.http[0];
//         const privateKey = '0x' + process.env.PRIVATE_KEY;
//         const signer = await new ethers.Wallet(privateKey);
//         const provider = await new ethers.JsonRpcProvider(url);
//         const wallet = signer.connect(provider);
//         console.log(signer.address);
//         Contract = new ethers.Contract(contractAddress, contractABI, wallet);
//     }
//     return Contract;
// }

export default async function GetContract(){
    if (Contract == null) {
        const ethersProvider = new ethers.BrowserProvider(window.ethereum); 
        const signer = await ethersProvider.getSigner()
        Contract = new ethers.Contract(contractAddress, contractABI, signer);
    }
    return Contract;
}