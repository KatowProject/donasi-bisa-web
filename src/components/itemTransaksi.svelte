<script lang="ts">
	import { formatTimestamp, handleTarget } from '$lib/utils';

	export let log: any;
</script>

<li class="list-group-item">
	<div class="d-flex flex-column">
		<h6 class="text-bold">
			{#if log.event === 'GalangCreated'}
				<span class="badge bg-success p-2">
					<i class="bi bi-plus-circle"></i> Galang Created
				</span>
			{:else if log.event === 'Deposited'}
				<span class="badge bg-primary p-2">
					<i class="bi bi-arrow-down-circle"></i> Deposited
				</span>
			{:else if log.event === 'Withdrawn'}
				<span class="badge bg-warning p-2">
					<i class="bi bi-arrow-up-circle"></i> Withdrawn
				</span>
			{:else if log.event === 'FraudedGalang'}
				<span class="badge bg-danger p-2">
					<i class="bi bi-exclamation-circle"></i> Frauded Galang
				</span>
			{/if}
		</h6>
		<div class="mt-2">
			<i class="bi bi-calendar-event"></i> <strong>Date:</strong>
			{formatTimestamp(log.returnValues.timestamp)}
		</div>
		<div class="mt-2">
			{#if log.event === 'GalangCreated'}
                <p>
                    <strong>{log.returnValues.penggalang}</strong> 
                    membuat penggalangan dana dengan nama <strong>{log.returnValues.nama}</strong>
                    dengan target <strong>{handleTarget(log.returnValues.target)} ETH</strong>
                    sampai tanggal <strong>{formatTimestamp(log.returnValues.deadline)}</strong>

                </p>
			{:else if log.event === 'Deposited'}
				<!-- <strong>Donatur:</strong> {log.returnValues.donatur} -->
                 <strong>{log.returnValues.donatur}</strong> baru saja melakukan donasi sebesar <strong>{handleTarget(log.returnValues.value)} ETH</strong>
			{:else if log.event === 'Withdrawn'}
				<strong>{log.returnValues.penggalang}</strong> baru saja melakukan penarikan sebesar <strong>{handleTarget(log.returnValues.value)} ETH</strong>
			{:else if log.event === 'FraudedGalang'}
                <strong>{log.returnValues.penggalang}</strong> melakukan penipuan pada penggalangan dana yang dibuat oleh <strong>{log.returnValues.penggalang}</strong>
			{/if}
		</div>
	</div>
</li>
