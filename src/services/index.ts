import Web3 from 'web3';
import { web3 as w, contract as c, isWalletConnected, account } from '../stores/web3.store';
import { get } from 'svelte/store';
const { VITE_ADDRESS_DEPLOYER } = import.meta.env;

export interface GalangData {
    penggalang: string;
    nama: string;
    deskripsi: string;
    target: number;
    terkumpul: number;
    deadline: number;
    totalDonatur: number;
    status: number;
}

export interface GalangDataResponse {
    data: GalangData[];
}

declare global {
    interface Window {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        ethereum: any;
    }
}

const web3 = get(w);
const contract = get(c);

export async function init() {
    const abi = [
        {
            "inputs": [],
            "stateMutability": "nonpayable",
            "type": "constructor"
        },
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "_idGalang",
                    "type": "uint256"
                }
            ],
            "name": "FraudDonation",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "name": "GalangData",
            "outputs": [
                {
                    "internalType": "address",
                    "name": "penggalang",
                    "type": "address"
                },
                {
                    "internalType": "string",
                    "name": "nama",
                    "type": "string"
                },
                {
                    "internalType": "string",
                    "name": "deskripsi",
                    "type": "string"
                },
                {
                    "internalType": "uint256",
                    "name": "target",
                    "type": "uint256"
                },
                {
                    "internalType": "uint256",
                    "name": "terkumpul",
                    "type": "uint256"
                },
                {
                    "internalType": "uint256",
                    "name": "deadline",
                    "type": "uint256"
                },
                {
                    "internalType": "uint256",
                    "name": "totalDonatur",
                    "type": "uint256"
                },
                {
                    "internalType": "uint256",
                    "name": "status",
                    "type": "uint256"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "string",
                    "name": "_nama",
                    "type": "string"
                },
                {
                    "internalType": "string",
                    "name": "_desc",
                    "type": "string"
                },
                {
                    "internalType": "uint256",
                    "name": "_target",
                    "type": "uint256"
                },
                {
                    "internalType": "uint256",
                    "name": "_deadline",
                    "type": "uint256"
                }
            ],
            "name": "createGalang",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "_idGalang",
                    "type": "uint256"
                }
            ],
            "name": "depo",
            "outputs": [],
            "stateMutability": "payable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                },
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "name": "donatur",
            "outputs": [
                {
                    "internalType": "address",
                    "name": "donatur",
                    "type": "address"
                },
                {
                    "internalType": "uint256",
                    "name": "value",
                    "type": "uint256"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "getGalangData",
            "outputs": [
                {
                    "components": [
                        {
                            "internalType": "address",
                            "name": "penggalang",
                            "type": "address"
                        },
                        {
                            "internalType": "string",
                            "name": "nama",
                            "type": "string"
                        },
                        {
                            "internalType": "string",
                            "name": "deskripsi",
                            "type": "string"
                        },
                        {
                            "internalType": "uint256",
                            "name": "target",
                            "type": "uint256"
                        },
                        {
                            "internalType": "uint256",
                            "name": "terkumpul",
                            "type": "uint256"
                        },
                        {
                            "internalType": "uint256",
                            "name": "deadline",
                            "type": "uint256"
                        },
                        {
                            "internalType": "uint256",
                            "name": "totalDonatur",
                            "type": "uint256"
                        },
                        {
                            "internalType": "uint256",
                            "name": "status",
                            "type": "uint256"
                        }
                    ],
                    "internalType": "struct Galang.Penggalang[]",
                    "name": "",
                    "type": "tuple[]"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "owner",
            "outputs": [
                {
                    "internalType": "address",
                    "name": "",
                    "type": "address"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "_owner",
                    "type": "address"
                }
            ],
            "name": "setOwner",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "_idGalang",
                    "type": "uint256"
                }
            ],
            "name": "withdraw",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        }
    ] as const;

    const instance = new Web3(window.ethereum);
    // get accounts
    const accounts = await instance.eth.getAccounts();
    if (accounts.length > 0) {
        isWalletConnected.set(true);
        account.set(accounts[0]);
    }

    const contractInstance = new instance.eth.Contract(abi, VITE_ADDRESS_DEPLOYER);

    w.set(instance);
    c.set(contractInstance);
}

export async function connectWallet() {

}

export const getBalance = async (address: string) => {
    if (!web3) return 0;

    const balance = await web3.eth.getBalance(address);

    return web3.utils.fromWei(balance, 'ether');
}


export const getGalangData = async (): Promise<GalangData[]> => {
    if (!contract) return [];

    const data = await contract.methods.getGalangData().call();

    return data as GalangData[];
}

export const createGalang = async (nama: string, desc: string, target: number, deadline: number) => {
    if (!contract || !web3) throw new Error('Contract not found');

    const address = await web3.eth.getAccounts();
    try {

        await contract.methods.createGalang(nama, desc, target, deadline).call();
    } catch (e) {
        console.log(e);
    }

    await contract.methods.createGalang(nama, desc, target, deadline).send({ from: address.shift() });

    return true;
}

// export const isValidAddress = (web3: Web3, address: string) => {
//     return web3.utils.isAddress(address);
// }