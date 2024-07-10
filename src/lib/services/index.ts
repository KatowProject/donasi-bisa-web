import Web3 from "web3";
const { VITE_RPC_URL, VITE_ADDRESS_DEPLOYER } = import.meta.env;

export const web3 = new Web3(VITE_RPC_URL);

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
                "internalType": "address",
                "name": "_adr",
                "type": "address"
            },
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
];

export const contract = new web3.eth.Contract(abi, VITE_ADDRESS_DEPLOYER);

export const getBalance = async (address: string) => {
    return await web3.eth.getBalance(address);
}

export const getGalangData = async () => {
    const galangs = await contract.methods.getGalangData().call();

    return galangs;
}

export const createGalang = async (adr: string, nama: string, desc: string, target: number, deadline: number) => {
    await contract.methods.createGalang(adr, nama, desc, target, deadline).send({ from: adr });

    return true;
}