<script lang="ts">
	import { getGalangData, type GalangData } from '../services';
	import { onMount } from 'svelte';
	import Web3 from 'web3';

	
	const web3 = new Web3();
	
	let data = [] as GalangData[];

	onMount(async () => {
		await handleGalangData();
	});

	async function handleGalangData() {
		const galangData = await getGalangData();
		data = galangData;
	}

	function handleTime(time: bigint) {
		const date = new Date(Number(time) * 1000);

		return date.toLocaleDateString();
	}

	function handleTarget(target: bigint) {
		const targetEth = web3.utils.fromWei(target.toString(), 'ether');

		return targetEth;
	}
</script>

<div class="row">
	<div class="col-md-12 page-title">
		<h1>List Penggalangan Dana</h1>
	</div>

	<div class="col-12">
		<div class="card">
			<div class="card-body">
				<div class="row justify-content-center align-items-center">
					<!-- if data length is 0, set "Belum Ada Penggalangan Dana" -->
					{#if data.length === 0}
						<div class="col-12 text-center">
							<p>Belum Ada Penggalangan Dana</p>

							<a href="/create" class="btn btn-primary">
								<i class="bi bi-plus-circle me-2"></i>
								Buat
							</a>
						</div>
					{:else}
						<!-- if data length is not 0, loop through data -->
						{#each data as item, index}
							<div class="col-md-4">
								<div class="card">
									<!-- random image -->
									<img src="http://localhost:5000/{item.image}" class="card-img-top" alt="..." />
									<div class="card-body">
										<h5 class="card-title">{item.nama}</h5>
										<p class="card-text">{item.deskripsi}</p>
									</div>

									<div class="card-footer d-flex justify-content-between text-center">
										<small class="text-muted">
											<i class="bi bi-clock me-1"></i>
											{handleTime(item.deadline)}
										</small>
									
										<small class="text-muted">
											<i class="bi bi-wallet2 me-1"></i>
											{handleTarget(item.target)}
										</small>
									
										<small>
											<!-- jumlah donatur -->
											<i class="bi bi-people me-1"></i>
											{item.totalDonatur}
										</small>
									</div>

									<div class="card-footer d-flex justify-content-between">
										<a href="/galang/{index + 1}" class="btn btn-primary w-100">
											<i class="bi bi-eye me-2"></i>
											Detail
										</a>
									</div>
								</div>
							</div>
						{/each}
					{/if}
				</div>
			</div>
		</div>
	</div>
</div>

<style>
	.page-title {
		margin-bottom: 1.5rem;
		margin-top: 1.5rem;
	}
</style>
