<script lang="ts">
	import { getGalangData } from '../services';
	import { transactionLogs } from '../stores/web3.store';
	import { onMount } from 'svelte';
	import { Circle2 } from 'svelte-loading-spinners';

	import Web3 from 'web3';

	
	const web3 = new Web3();
	
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

	function handleTime(time: bigint) {
		const date = new Date(Number(time) * 1000);

		return date.toLocaleDateString();
	}

	function handleTarget(target: bigint) {
		const targetEth = web3.utils.fromWei(target.toString(), 'ether');

		return targetEth;
	}

	function formatTimestamp(timestamp: number) {
        const date = new Date(timestamp * 1000);
        return date.toLocaleString();
    }
</script>

<title>Donasi Bisa</title>

<div class="row">
	<div class="col-8">
		<div class="card content">
			<div class="card-header">
				<h5 class="card-title">Penggalangan Dana</h5>
			</div>

			<div class="card-body">
				<div class="row justify-content-center align-items-center">
					{#if loading}
						<div class="col-12 text-center">
							<div class="svelte-loading-spinners">
								<Circle2 />
							</div>
						</div>
					<!-- if data length is 0, set "Belum Ada Penggalangan Dana" -->
					{:else if data.length === 0}
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
									<img src="http://localhost:5000/{item.penggalang.image}" class="card-img-top" alt="..." />
									<div class="card-body">
										<h5 class="card-title">{item.penggalang.nama}</h5>
										<p class="card-text">{item.penggalang.deskripsi}</p>
									</div>

									<div class="card-footer d-flex justify-content-between text-center">
										<small class="text-muted">
											<i class="bi bi-clock me-1"></i>
											{handleTime(item.penggalang.deadline)}
										</small>
									
										<small class="text-muted">
											<i class="bi bi-wallet2 me-1"></i>
											{handleTarget(item.penggalang.target)}
										</small>
									
										<small>
											<!-- jumlah donatur -->
											<i class="bi bi-people me-1"></i>
											{item.penggalang.totalDonatur}
										</small>
									</div>

									<div class="card-footer d-flex justify-content-between">
										<a href="/galang/{item.id}" class="btn btn-primary w-100">
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

	<div class="col-4">
        <div class="card content">
            <div class="card-header">
                <h5 class="card-title">Log Transaksi</h5>
            </div>

			<div class="card-body">
                {#if logs.length === 0}
                    <p>Belum ada transaksi</p>
                {:else}
                    <ul class="list-group">
						{#each logs as log}
						<li class="list-group-item">
							<div class="d-flex flex-column">
								<h6 class="text-bold">
									{#if log.event === 'GalangCreated'}
										Galang Created
									{:else if log.event === 'Deposited'}
										Deposited
									{:else if log.event === 'Withdrawn'}
										Withdrawn
									{:else if log.event === 'FraudedGalang'}
										Frauded Galang
									{/if}
								</h6>
								<div>
									<strong>Tanggal Transaksi:</strong> {formatTimestamp(log.returnValues.timestamp)}
								</div>
								<div>
									<strong>Judul:</strong> 
									{#if log.event === 'GalangCreated'}
										{log.returnValues.nama}
									{:else if log.event === 'Deposited'}
										{log.returnValues.donatur}
									{:else if log.event === 'Withdrawn'}
										{log.returnValues.penggalang}
									{:else if log.event === 'FraudedGalang'}
										{log.returnValues.penggalang}
									{/if}
								</div>
								<div>
									<strong>Value:</strong> 
									{#if log.event === 'GalangCreated'}
										{log.returnValues.deskripsi}
									{:else if log.event === 'Deposited'}
										{web3.utils.fromWei(log.returnValues.value, 'ether')} ETH
									{:else if log.event === 'Withdrawn'}
										{web3.utils.fromWei(log.returnValues.value, 'ether')} ETH
									{:else if log.event === 'FraudedGalang'}
										{web3.utils.fromWei(log.returnValues.value, 'ether')} ETH
									{/if}
								</div>
							</div>
						</li>
					{/each}
                    </ul>
                {/if}
            </div>
        </div>
    </div>
</div>

<style>
	.content {
        margin-top: 20px;
    }
    .svelte-loading-spinners {
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .list-group-item {
        display: flex;
        flex-direction: column;
    }
</style>
