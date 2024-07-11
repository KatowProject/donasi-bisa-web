<script lang="ts">
	import { isValidAddress, createGalang } from "$lib/services";


	let address = '';
	let nama = '';
	let deskripsi = '';
	let target = 0;
	let deadline = '';

	function createGalangDana() {
		// convert target to gwei
        const targetGwei = target * 10 ** 9;
        const ded = new Date(deadline).getTime() / 1000;

        const create = createGalang(address, nama, deskripsi, targetGwei, ded);
        console.log(create);
	}

    let isValid = true;
    function validateAddress(event: any) {
        const value = event.target.value;

        if (isValidAddress(value)) {
            isValid = true;
        } else {
            isValid = false;
        }
    }
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
                                    on:input={validateAddress}
									type="text"
                                    class="form-control"
									class:is-invalid={address && !isValid}
                                    class:is-valid={address && isValid}
									bind:value={address}
									id="address"
									placeholder="Alamat Penggalangan Dana"
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
