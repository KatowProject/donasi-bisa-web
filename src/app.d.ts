// See https://kit.svelte.dev/docs/types#app
// for information about these interface

declare global {
	interface Window {
		ethereum: import('ethers').providers.Web3Provider;
	}

	interface GalangData {
		id: bigint;
		penggalang: string;
		nama: string;
		deskripsi: string;
		image: string;
		target: bigint;
		terkumpul: bigint;
		deadline: bigint;
		totalDonatur: number;
		status: number;
	}

	interface Penggalang {
		id: bigint;
		penggalang: GalangData
	}

	interface GalangDataResponse {
		data: GalangData[];
	}

	interface GalangDataDetail extends GalangData {
		donaturs: Donaturs[];
	}

	interface Donaturs {
		donatur: string;
		value: bigint;
	}
}

export { }