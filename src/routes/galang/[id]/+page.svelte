<script lang="ts">
	import { onMount } from 'svelte';
	import { page } from '$app/stores';

	import { donateGalang, fraudGalang, getGalangById, withdrawGalang } from '../../../services';
	import { account } from '../../../stores/web3.store';
	
	import DetailPenggalang from '../../../components/DetailPenggalang.svelte';
	import ListDonatur from '../../../components/ListDonatur.svelte';
	
	let id = $page.params.id;
	let data: GalangDataDetail | null;
	let isLoading = true;

    let acc = '';
    let donateValue = 0;

	onMount(async () => {
		await handleGalangData();
	});

	async function handleGalangData() {
		const galangData = await getGalangById(id);
		
		data = galangData;

		account.subscribe((value) => {
			acc = value ?? '';
		});

		isLoading = false;
	}
    
    async function donate() {
        const conf = confirm(`Apakah anda yakin ingin mendonasikan ${donateValue} ETH?`);
        if (!conf) return;

        const donate = await donateGalang(id, donateValue.toString());
        if (donate) { 
            alert('Donasi berhasil');
            handleGalangData();
        } else {
            alert('Donasi gagal');
        }
    }

    async function withdraw() {
        const id = $page.params.id;

		const conf = confirm('Apakah anda yakin ingin menarik dana?');
		if (!conf) return;

		const withdraw = await withdrawGalang(id);
		if (!withdraw) {
			alert('Penarikan dana gagal');
			return;
		}

		alert('Penarikan dana berhasil');
		handleGalangData();
    }

	async function fraudDonation() {
		const conf = confirm('Apakah kamu yakin ingin mengindentifikasi donasi ini sebagai penipuan?');
		if (!conf) return;

		const fraud = await fraudGalang(id);
		if (fraud) {
			alert('Donasi berhasil diidentifikasi sebagai penipuan');
			handleGalangData();
		} else {
			alert('Donasi gagal diidentifikasi sebagai penipuan');
		}
	}
</script>

<title>Detail Penggalangan Dana</title>

<div class="row py-3 g-2">
	<div class="col-12">
		<DetailPenggalang 
			isLoading={isLoading} 
			data={data} 
			bind:donateValue={donateValue} 
			acc={acc} 
			donate={donate} 
			withdraw={withdraw}
			fraudDonation={fraudDonation}
		/>
	</div>

	<div class="col-12">
		<ListDonatur isLoading={isLoading} donaturs={data?.donaturs ?? []} />
	</div>
</div>
