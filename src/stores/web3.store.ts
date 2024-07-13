import { writable, get as getStore } from "svelte/store";
import Web3, { Contract, type ContractAbi } from "web3";

export const web3 = writable<Web3 | null>(null);
export const contract = writable<Contract<ContractAbi> | null>(null);
export const isWalletConnected = writable<boolean>(false);
export const account = writable<string | null>(null);

export function set(instance: Web3, contractInstance: Contract<ContractAbi>) {
    web3.set(instance);
    contract.set(contractInstance);
}

export function get() {
    // get value all store
    return {
        web3: getStore(web3),
        contract: getStore(contract),
        isWalletConnected: getStore(isWalletConnected),
        account: getStore(account)
    }
}