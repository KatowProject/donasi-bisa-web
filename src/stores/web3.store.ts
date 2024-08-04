import { writable, get as getStore, type Readable } from "svelte/store";
import Web3, { Contract, type ContractAbi } from "web3";

export const web3 = writable<Web3 | null>(null);
export const contract = writable<Contract<ContractAbi> | null>(null);
export const isWalletConnected = writable<boolean>(false);
export const account = writable<string | null>(null);

export function set(instance: Web3, contractInstance: Contract<ContractAbi>) {
    web3.set(instance);
    contract.set(contractInstance);
}

export function get<T>(store: Readable<T>) {
    // get the store value
    return getStore(store);
}