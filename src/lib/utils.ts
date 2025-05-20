import Web3 from "web3";

export function formatTimestamp(timestamp: number | bigint) {
    if (typeof timestamp === 'bigint') {
        timestamp = Number(timestamp);
    }

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

export function handleStatus(status: string): string {
    if (status == '0') {
        return 'Berjalan';
    } else if (status == '1') {
        return 'Tercapai';
    } else if (status == '2') {
        return 'Fraud';
    } else {
        return 'Gagal';
    }
}