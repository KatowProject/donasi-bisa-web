<script lang="ts">
	import { onMount } from "svelte";
	import ItemTransaksi from "./itemTransaksi.svelte";
    import Loading from "./Loading.svelte";

    export let logs: any[];
    export let loading: boolean;

    if (logs.length > 0) logs.sort((a, b) => Number(b.returnValues.timestamp) - Number(a.returnValues.timestamp));
    
</script>

<div class="card">
    <div class="card-header">
        <h5 class="card-title">Log Transaksi</h5>
    </div>

    <div class="card-body">
        {#if loading}
            <Loading/>
        {:else if logs.length === 0}
            <p>Belum ada transaksi</p>
        {:else}
            <ul class="list-group">
                {#each logs as log}
                    <ItemTransaksi log={log} />
                {/each}
            </ul>
        {/if}
    </div>
</div>