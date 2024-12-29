<script lang="ts">
	import { onMount } from 'svelte';
	import { getGalangData } from '../services';
	import { transactionLogs } from '../stores/web3.store';

	import ListPenggalang from '../components/ListPenggalang.svelte';
	import LogTransaksi from '../components/LogTransaksi.svelte';
	
	let data: Penggalang[] = [];
	let logs: any[] = [];
	let loading = true;

	onMount(async () => {
		try {
            data = await getGalangData();
        } catch (error) {
            console.error('Failed to load data:', error);
        } finally {
            loading = false;
        }

		transactionLogs.subscribe((value) => {
			logs = value;
		});
	});
</script>

<title>Donasi Bisa</title>

<div class="row">
	<div class="col-8 content">
		<ListPenggalang data={data} loading={loading} />
	</div>

	<div class="col-4 content">
        <LogTransaksi logs={logs} loading={loading} />
    </div>
</div>

<style>
	.content {
        margin-top: 20px;
    }

</style>
