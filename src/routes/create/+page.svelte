<script lang="ts">
	import { onMount } from "svelte";
	import { createGalang } from "../../services";
	import {account, isWalletConnected} from '../../stores/web3.store';
	import web3 from 'web3';

	let address = '';
	let nama = '';
	let image: FileList;
	let deskripsi = '';
	let target = 0;
	let deadline = '';

	async function createGalangDana() {
		const targetGwei = web3.utils.toWei(target.toString(), 'ether');
		const ded = new Date(deadline).getTime() / 1000;

		const img = image[0];

        const create = await createGalang(nama, deskripsi, img, targetGwei, ded);
        if (create) {
			alert('Berhasil membuat penggalangan dana');
		} else {
			alert('Gagal membuat penggalangan dana');
		}
	}

	onMount(() => {
		account.subscribe((value) => {
			address = value ?? '';
		});
	});
</script>

<title>Buat Penggalangan Dana</title>
<div class="row">
	<div class="col-md-12 page-title">
		<h1>Buat Galang Dana</h1>
	</div>

	<div class="col-12" id="main">
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
                                    class:is-valid={address}
									bind:value={address}
									id="address"
									placeholder="Alamat Penggalangan Dana"
									readonly
								/>
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
								<label for="image" class="form-label">Image</label>
								<input
									type="file"
									class="form-control"
									bind:files={image}
									id="image"
									placeholder="Image Penggalangan Dana"
								/>
							</div>

							<div class="mb-3">
								{#if image}
									<!-- svelte-ignore a11y-img-redundant-alt -->
									<img src={URL.createObjectURL(image[0])} alt="Image" class="img-fluid" width="200" />
								{/if}
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

    .is-valid {
        border-color: #198754;
    }

	#main {
		margin-bottom: 4rem;
	}
</style>
