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
                    "internalType": "string",
                    "name": "image",
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
                    "internalType": "string",
                    "name": "_img",
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
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "_idGalang",
                    "type": "uint256"
                }
            ],
            "name": "getDonatur",
            "outputs": [
                {
                    "components": [
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
                    "internalType": "struct Galang.IDonatur[]",
                    "name": "",
                    "type": "tuple[]"
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
                            "internalType": "string",
                            "name": "image",
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

export const getBalance = async (address: string) => {
    const web3 = get(w);
    if (!web3) return 0;

    const balance = await web3.eth.getBalance(address);

    return web3.utils.fromWei(balance, 'ether');
}


export const getGalangData = async (): Promise<GalangData[]> => {
    const contract = get(c);
    if (!contract) return [];

    const data = await contract.methods.getGalangData().call() as GalangData[];

    return data;
}

export const createGalang = async (nama: string, desc: string, image: File, target: string, deadline: number) => {
    const contract = get(c);
    const web3 = get(w);

    if (!contract || !web3) throw new Error('Contract not found');

    const address = await web3.eth.getAccounts();
    try {
        await contract.methods.createGalang(nama, desc, '', target, deadline).call();
    } catch (e) {
        console.error(e);
        return false;
    }

    const img = await uploadImage(image);
    if (!img) return false;

    await contract.methods.createGalang(nama, desc, img.file.path, target, deadline).send({ from: address[0] });

    return true;
}

export const uploadImage = async (file: File) => {
    try {
        const url = 'http://localhost:5000/api/upload';

        const formData = new FormData();
        formData.append('file', file);

        const response = await fetch(url, {
            method: 'POST',
            body: formData
        });

        const data = await response.json();

        return data;
    } catch (e) {
        console.error(e);
        return null;
    }
}

// export const isValidAddress = (web3: Web3, address: string) => {
//     return web3.utils.isAddress(address);
// }