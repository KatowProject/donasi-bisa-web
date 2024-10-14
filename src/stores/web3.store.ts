import { writable } from "svelte/store";
import Web3, { Contract, type ContractAbi } from "web3";

export const web3 = writable<Web3 | null>(null);
export const contract = writable<Contract<ContractAbi> | null>(null);
export const isWalletConnected = writable<boolean>(false);
export const account = writable<string | null>(null);