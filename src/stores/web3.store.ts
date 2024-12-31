/* eslint-disable @typescript-eslint/no-explicit-any */
import { get, writable } from "svelte/store";
import Web3, { Contract, type ContractAbi } from "web3";
const { VITE_ADDRESS_DEPLOYER } = import.meta.env;

export const web3 = writable<Web3 | null>(null);
export const contract = writable<Contract<ContractAbi> | null>(null);
export const isWalletConnected = writable<boolean>(false);
export const account = writable<string | null>(null);
export const isPlatformSelected = writable<boolean>(false);
export const transactionLogs = writable<any[]>([]);


export async function initWeb3() {
    const abi = [
        {
            "inputs": [],
            "stateMutability": "nonpayable",
            "type": "constructor"
        },
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": true,
                    "internalType": "address",
                    "name": "donatur",
                    "type": "address"
                },
                {
                    "indexed": false,
                    "internalType": "uint256",
                    "name": "value",
                    "type": "uint256"
                },
                {
                    "indexed": false,
                    "internalType": "bytes32",
                    "name": "galangId",
                    "type": "bytes32"
                },
                {
                    "indexed": false,
                    "internalType": "uint256",
                    "name": "timestamp",
                    "type": "uint256"
                }
            ],
            "name": "Deposited",
            "type": "event"
        },
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": true,
                    "internalType": "address",
                    "name": "penggalang",
                    "type": "address"
                },
                {
                    "indexed": false,
                    "internalType": "uint256",
                    "name": "value",
                    "type": "uint256"
                },
                {
                    "indexed": false,
                    "internalType": "bytes32",
                    "name": "galangId",
                    "type": "bytes32"
                },
                {
                    "indexed": false,
                    "internalType": "uint256",
                    "name": "timestamp",
                    "type": "uint256"
                }
            ],
            "name": "FraudedGalang",
            "type": "event"
        },
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": true,
                    "internalType": "address",
                    "name": "penggalang",
                    "type": "address"
                },
                {
                    "indexed": false,
                    "internalType": "string",
                    "name": "nama",
                    "type": "string"
                },
                {
                    "indexed": false,
                    "internalType": "string",
                    "name": "deskripsi",
                    "type": "string"
                },
                {
                    "indexed": false,
                    "internalType": "string",
                    "name": "image",
                    "type": "string"
                },
                {
                    "indexed": false,
                    "internalType": "uint256",
                    "name": "target",
                    "type": "uint256"
                },
                {
                    "indexed": false,
                    "internalType": "uint256",
                    "name": "deadline",
                    "type": "uint256"
                },
                {
                    "indexed": false,
                    "internalType": "uint256",
                    "name": "timestamp",
                    "type": "uint256"
                }
            ],
            "name": "GalangCreated",
            "type": "event"
        },
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": true,
                    "internalType": "address",
                    "name": "penggalang",
                    "type": "address"
                },
                {
                    "indexed": false,
                    "internalType": "uint256",
                    "name": "value",
                    "type": "uint256"
                },
                {
                    "indexed": false,
                    "internalType": "bytes32",
                    "name": "galangId",
                    "type": "bytes32"
                },
                {
                    "indexed": false,
                    "internalType": "uint256",
                    "name": "timestamp",
                    "type": "uint256"
                }
            ],
            "name": "Withdrawn",
            "type": "event"
        },
        {
            "inputs": [
                {
                    "internalType": "bytes32",
                    "name": "_idGalang",
                    "type": "bytes32"
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
                    "internalType": "bytes32",
                    "name": "",
                    "type": "bytes32"
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
            "inputs": [],
            "name": "GalangDatalength",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "",
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
                    "internalType": "bytes32",
                    "name": "_idGalang",
                    "type": "bytes32"
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
                    "internalType": "bytes32",
                    "name": "",
                    "type": "bytes32"
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
                    "internalType": "bytes32",
                    "name": "_idGalang",
                    "type": "bytes32"
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
                            "internalType": "bytes32",
                            "name": "id",
                            "type": "bytes32"
                        },
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
                            "internalType": "struct Galang.Penggalang",
                            "name": "penggalang",
                            "type": "tuple"
                        }
                    ],
                    "internalType": "struct Galang.PenggalangDetail[]",
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
                    "internalType": "bytes32",
                    "name": "_idGalang",
                    "type": "bytes32"
                }
            ],
            "name": "withdraw",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        }
    ];

    const instance = new Web3(window.ethereum);

    const contractInstance = new instance.eth.Contract(abi, VITE_ADDRESS_DEPLOYER);
    contract.set(contractInstance);
    web3.set(instance);

    const latestBlock = await instance.eth.getBlockNumber();

    const pastEvents = await contractInstance.getPastEvents('allEvents', {
        fromBlock: Number(latestBlock) > 25 ? Number(latestBlock) - 25 : 0,
        toBlock: 'latest'
    });

    transactionLogs.set(pastEvents);

    const platformSelected = sessionStorage.getItem('platformSelected') === 'true';
    if (platformSelected) {
        isPlatformSelected.set(true);
    }

    const unsubscribe = isPlatformSelected.subscribe(async (selected) => {
        if (selected) {
            const accounts = await instance.eth.getAccounts();
            if (accounts.length > 0) {
                isWalletConnected.set(true);
                account.set(accounts[0]);
                sessionStorage.setItem('walletConnected', 'true');
                sessionStorage.setItem('account', accounts[0]);
            }

            contractInstance.events.GalangCreated()
                .on('data', (event) => {
                    transactionLogs.update(logs => [...logs, event]);
                });

            contractInstance.events.Deposited()
                .on('data', (event) => {
                    transactionLogs.update(logs => [...logs, event]);
                });

            contractInstance.events.Withdrawn()
                .on('data', (event) => {
                    transactionLogs.update(logs => [...logs, event]);
                });

            contractInstance.events.FraudedGalang()
                .on('data', (event) => {
                    transactionLogs.update(logs => [...logs, event]);
                });

            unsubscribe();
        }
    });
}

export async function connectWallet() {
    const web3Instance = get(web3);
    if (!web3Instance) return;

    try {
        await window.ethereum.request({ method: 'eth_requestAccounts' });
        const accounts = await web3Instance.eth.getAccounts();
        account.set(accounts[0]);
        isWalletConnected.set(true);

        sessionStorage.setItem('walletConnected', 'true');
        sessionStorage.setItem('account', accounts[0]);
    } catch (e) {
        console.error(e);
    }
}

export function selectPlatform() {
    isPlatformSelected.set(true);

    sessionStorage.setItem('platformSelected', 'true');
}

export function logout() {
    account.set(null);
    isWalletConnected.set(false);
    sessionStorage.removeItem('walletConnected');
    sessionStorage.removeItem('account');
    sessionStorage.removeItem('platformSelected');
}