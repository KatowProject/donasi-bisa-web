import Web3 from 'web3';
import { web3, contract } from '../stores/web3.store';
import { get } from 'svelte/store';

export async function getBalance(address: string) {
    const web3Instance = get(web3);
    if (!web3Instance) return 0;

    const balance = await web3Instance.eth.getBalance(address);
    return web3Instance.utils.fromWei(balance, 'ether');
}

export async function getGalangData(): Promise<Penggalang[]> {
    await new Promise(resolve => setTimeout(resolve, 1000));

    const contractInstance = get(contract);
    if (!contractInstance) return [];

    const data = await contractInstance.methods.getGalangData().call();
    return data as Penggalang[];
}

export async function getGalangById(id: string): Promise<GalangDataDetail | null> {
    await new Promise(resolve => setTimeout(resolve, 1000));

    const contractInstance = get(contract);
    if (!contractInstance) throw new Error('Contract not found');

    const data = await contractInstance.methods.GalangData(id).call() as GalangData;
    if (!data) return null;

    const donaturs = await contractInstance.methods.getDonatur(id).call() as Donaturs[];
    if (!donaturs) return { ...data, donaturs: [] };

    return { ...data, donaturs };
}

export async function createGalang(nama: string, desc: string, image: File, target: string, deadline: number) {
    const contractInstance = get(contract);
    const web3Instance = get(web3);

    if (!contractInstance || !web3Instance) throw new Error('Contract not found');

    const address = await web3Instance.eth.getAccounts();
    try {
        await contractInstance.methods.createGalang(nama, desc, '', target, deadline).call();
    } catch (e) {
        console.error(e);
        return false;
    }

    const img = await uploadImage(image);
    if (!img) return false;

    await contractInstance.methods.createGalang(nama, desc, img.file.path, target, deadline).send({ from: address[0] });

    return true;
}

export async function donateGalang(id: string, value: string) {
    const contractInstance = get(contract);
    const web3Instance = get(web3);

    const valueInWei = Web3.utils.toWei(value, 'ether');
    if (!contractInstance || !web3Instance) throw new Error('Contract not found');

    const address = await web3Instance.eth.getAccounts();
    try {
        await contractInstance.methods.depo(id).call({ value: valueInWei });
    } catch (e) {
        console.error(e);
        return false;
    }

    await contractInstance.methods.depo(id).send({ from: address[0], value: valueInWei });

    return true;
}

export async function uploadImage(file: File) {
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