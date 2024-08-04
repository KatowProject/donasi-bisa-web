<script lang="ts">
	import { createGalang } from '../../services';

	import { onMount } from 'svelte';
	let isConnected: boolean = false;
	import Web3 from 'web3';

	let isValid = false;
	let address = '';
	let web3: Web3;
	let nama = '';
	let deskripsi = '';
	let target = 0;
	let deadline = '';

	async function createGalangDana() {
		// convert target to gwei
		const targetGwei = target * 10 ** 9;
		const ded = new Date(deadline).getTime() / 1000;

		const create = await createGalang(nama, deskripsi, targetGwei, ded);
		console.log(create);
	}

	async function init() {
		web3 = new Web3(window.ethereum);
		const acc = await web3.eth.getAccounts();
		if (acc.length != 0) {
			isConnected = false;
			try {
				await web3.eth.requestAccounts();	
			
				isConnected = true;
				const acc = await web3.eth.getAccounts();
				address = acc[0];

				isValid = true;
			} catch (e: any) {
				console.log('b');

				console.log(e);
			}
		} else {
			isConnected = true;
			address = acc[0];

			isValid = true;
		}
	}
	onMount(() => {
		init();
	});
</script>

<div class="row">
	<div class="col-md-12 page-title">
		<h1>Buat Galang Dana</h1>
	</div>

	<div class="col-12">
		<div class="card">
			<div class="card-body">
				<!-- create form -->
				<form on:submit|preventDefault={createGalangDana}>
					<div class="row justify-content-center align-items-center">
						<div class="col-12">
							<div class="mb-3">
								<label for="address" class="form-label">Address</label>
								<input
									type="text"
									class="form-control"
									class:is-invalid={address && !isValid}
									class:is-valid={address && isValid}
									bind:value={address}
									id="address"
									placeholder="Alamat Penggalangan Dana"
									readonly
								/>
								{#if address && !isValid}
									<div class="invalid-feedback">Alamat tidak valid</div>
								{/if}
							</div>
							<div class="mb-3">
								<label for="nama" class="form-label">Nama</label>
								<input
									type="text"
									class="form-control"
									bind:value={nama}
									id="nama"
									placeholder="Nama Penggalangan Dana"
								/>
							</div>

							<div class="mb-3">
								<label for="deskripsi" class="form-label">Deskripsi</label>
								<textarea
									class="form-control"
									bind:value={deskripsi}
									id="deskripsi"
									rows="3"
									placeholder="Deskripsi Penggalangan Dana"
								></textarea>
							</div>

							<div class="mb-3">
								<label for="target" class="form-label">Target</label>
								<input
									type="number"
									step="0.0001"
									class="form-control"
									bind:value={target}
									id="target"
									placeholder="Target Penggalangan Dana"
								/>
							</div>

							<div class="mb-3">
								<label for="deadline" class="form-label">Deadline</label>
								<input
									type="date"
									class="form-control"
									bind:value={deadline}
									id="deadline"
									placeholder="Deadline Penggalangan Dana"
								/>
							</div>

							<button type="submit" class="btn btn-primary">Buat</button>
						</div>
					</div>
				</form>
			</div>
		</div>
	</div>
</div>

<style>
	.page-title {
		margin-bottom: 1.5rem;
		margin-top: 1.5rem;
	}

	.is-invalid {
		border-color: #dc3545;
	}

	.is-valid {
		border-color: #198754;
	}
</style>
