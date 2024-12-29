<script lang="ts">
	import { formatTimestamp, handleTarget } from "$lib/utils";

    export let log: any;
</script>

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
                {handleTarget(log.returnValues.value)} ETH
            {:else if log.event === 'Withdrawn'}
                {handleTarget(log.returnValues.value)} ETH
            {:else if log.event === 'FraudedGalang'}
                {handleTarget(log.returnValues.value)} ETH
            {/if}
        </div>
    </div>
</li>