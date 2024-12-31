<script lang="ts">
	import { handleTarget } from '$lib/utils';
	import Loading from './Loading.svelte';

	export let isLoading: boolean;
	export let donaturs: Donaturs[];
</script>

<div class="card">
	<div class="card-header">
		<h3>Donatur</h3>
	</div>
	<div class="card-body">
		{#if isLoading}
			<Loading />
		{:else if donaturs.length === 0}
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
					{#each donaturs as donatur, index}
						<tr>
							<td>{index + 1}</td>
							<td>{donatur.donatur}</td>
							<td>{handleTarget(donatur.value)} ETH</td>
						</tr>
					{/each}
				</tbody>
			</table>
		{/if}
	</div>
</div>
