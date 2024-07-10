<script lang="ts">
	import { getBalance } from '../../lib/services';

	let address = '';
	let saldo: bigint = 0n;

	async function checkSaldo() {
		const balance = await getBalance(address);

		// convert wei to ether
		saldo = BigInt(balance) / BigInt(10 ** 18);
	}
</script>

<div class="row justify-content-center align-items-center">
	<div class="col-md-12 page-title">
		<h1>Balance</h1>
	</div>

	<div class="col-12">
		<div class="card">
			<div class="card-body">
				<h5 class="card-title">Cek Balance</h5>
				<div class="form-group mb-3">
					<label for="address">Address</label>
					<input
						type="text"
						class="form-control"
						bind:value={address}
						placeholder="Enter your address"
					/>

					<button class="btn btn-primary mt-3" on:click={checkSaldo}>Get Balance</button>
				</div>

				<!-- saldo -->
				<div class="form-group mb-3">
					<label for="balance">Balance</label>
					<input
						type="text"
						class="form-control"
						id="balance"
						value={saldo}
						placeholder="Balance"
						readonly
					/>
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
