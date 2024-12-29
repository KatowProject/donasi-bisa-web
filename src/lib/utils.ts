import Web3 from "web3";

export function formatTimestamp(timestamp: number) {
    const date = new Date(timestamp * 1000);
    return date.toLocaleString();
}

export function handleTime(time: bigint) {
    const date = new Date(Number(time) * 1000);

    return date.toLocaleDateString();
}

export function handleTarget(target: bigint) {
    const targetEth = Web3.utils.fromWei(target.toString(), 'ether');

    return targetEth;
}