<script lang="ts">
	import PenggalangCard from './PenggalangCard.svelte';
	import Loading from './Loading.svelte';

    export let data: Penggalang[];
    export let loading: boolean;
</script>

<div class="card content">
    <div class="card-header">
        <h5 class="card-title">Penggalangan Dana</h5>
    </div>

    <div class="card-body">
        <div class="row justify-content-center align-items-center">
            {#if loading}
                <Loading />
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
                {#each data as item}
                    <div class="col-md-4">
                        <PenggalangCard item={item} />
                    </div>
                {/each}
            {/if}
        </div>
    </div>
</div>