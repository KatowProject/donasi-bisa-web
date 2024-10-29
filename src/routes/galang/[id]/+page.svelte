<script lang="ts">
	import Web3 from 'web3';

	import { onMount } from 'svelte';
	import { page } from '$app/stores';
	import { Circle2 } from 'svelte-loading-spinners';
	import { donateGalang, getGalangByIndex, type GalangDataDetail } from '../../../services';
	import Modal from '../../../components/Modal.svelte';

    let modalOpen = false;

	let id = parseInt($page.params.id) - 1;
	let data: GalangDataDetail | null;
	let isLoading = true;

    let donateValue = 0;

	onMount(async () => {
		await handleGalangData();
	});

	async function handleGalangData() {
		isLoading = true;
		const galangData = await getGalangByIndex(id);
		data = galangData;

		isLoading = false;
	}

	function formatDate(dateString: string): string {
		const date = new Date(parseInt(dateString) * 1000);
		return date.toLocaleDateString('en-GB', {
			day: '2-digit',
			month: '2-digit',
			year: 'numeric'
		});
	}

    function handleDonate() {
        modalOpen = true;
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

    function handleStatus(status: string): string {
        if (status == '0') {
            return 'Belum Tercapai';
        } else if (status == '1') {
            return 'Tercapai';
        } else if (status == '2') {
            return 'Fraud';
        } else {
            return 'Gagal';
        }
    }
</script>

<div class="row py-3 g-2">
	<div class="col-12">
		<div class="card">
			<div class="card-header">
				<h3>Detail Penggalangan Dana</h3>
			</div>
			<div class="card-body">
				<div class="row">
					{#if isLoading}
						<div class="svelte-loading-spinners">
							<Circle2 />
						</div>
					{:else if data === null}
						<h2>Data tidak ditemukan</h2>
					{:else}
						<div class="col-6">
							<img
								class="img-fluid img-card"
								src="http://localhost:5000/{data.image}"
								alt={data.nama}
							/>
						</div>

						<div class="col-6">
							<!-- table list -->
							<table class="table">
								<tbody>
									<tr>
										<td>Address Penggalang</td>
										<td>{data.penggalang}</td>
									</tr>
									<tr>
										<td>Nama</td>
										<td>{data.nama}</td>
									</tr>
									<tr>
										<td>Target</td>
										<td>{Web3.utils.fromWei(data.target, 'ether')} ETH</td>
									</tr>
									<tr>
										<td>Terkumpul</td>
										<td>{Web3.utils.fromWei(data.terkumpul, 'ether')} ETH</td>
									</tr>
									<tr>
										<td>Deskripsi</td>
										<td>{data.deskripsi}</td>
									</tr>
									<tr>
										<td>Deadline</td>
										<td>{formatDate(data.deadline.toString())}</td>
									</tr>
                                    <tr>
                                        <td>Status</td>
                                        <td>
                                            {handleStatus(data.status.toString())}
                                        </td>
                                    </tr>
								</tbody>
							</table>

                            <div class="row">
                                <div class="col-6">
                                    <!-- input donate -->
                                    <div class="form-group">
                                        <input type="number" bind:value={donateValue} class="form-control" id="donate" placeholder="Masukkan jumlah donasi" />
                                    </div>
                                </div>

                                <div class="col-6">
                                    <!-- button donate -->
                                    <button on:click={donate} class="btn btn-primary w-100">
                                        Donate Sekarang
                                    </button>
                                </div>
                            </div>
						</div>
					{/if}
				</div>
			</div>
		</div>
	</div>

	<div class="col-12">
		<div class="card">
			<div class="card-header">
				<h3>Donatur</h3>
			</div>
			<div class="card-body">
				{#if isLoading}
					<div class="svelte-loading-spinners">
						<Circle2 />
					</div>
				{:else if !data || data?.donaturs.length === 0}
					<h5 class="text-center">Belum ada donatur</h5>
				{:else}
					<table class="table">
						<thead>
							<tr>
								<th>No</th>
								<th>Address Donatur</th>
								<th>Jumlah Donasi</th>
							</tr>
						</thead>
						<tbody>
							{#each data.donaturs as donatur, index}
								<tr>
									<td>{index + 1}</td>
									<td>{donatur.donatur}</td>
									<td>{Web3.utils.fromWei(donatur.value, 'ether')} ETH</td>
								</tr>
							{/each}
						</tbody>
					</table>
				{/if}
			</div>
		</div>
	</div>
</div>

<Modal open={modalOpen} onClosed={() => modalOpen = false}>
    <span slot="title">Custom Modal Title</span>
    <div slot="body">
        <p>This is the custom body content of the modal.</p>
    </div>
    <div slot="footer">
        <button type="button" class="btn btn-secondary" on:click={() => modalOpen = false}>Close</button>
        <button type="button" class="btn btn-primary">Save changes</button>
    </div>
</Modal>

<style>
	/* make Circle2 Center */
	.svelte-loading-spinners {
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.img-card {
		width: 100%;
		height: auto;
		object-fit: cover;
		max-height: 300px; /* Adjust as needed for consistent landscape */
	}
</style>
