<script lang="ts">
    import { getGalangByIndex, type GalangData } from '../../../services';
    import { page } from '$app/stores';
    import { onMount } from 'svelte';

    let id = parseInt($page.params.id) - 1;
    let data = {} as GalangData;
    let isLoading = true;

    onMount(async () => {
        await handleGalangData();
    });

    async function handleGalangData() {
        isLoading = true;
        const galangData = await getGalangByIndex(id);
        data = galangData;
        isLoading = false;
    }
</script>

<div class="row">
    <div class="col-md-12 page-title">
        <h1>Detail Penggalangan Dana</h1>
    </div>

    <div class="col-12">
        {#if isLoading}
            <p>Loading...</p>
        {:else}
            <!-- Display the data here -->
            <div>
                <h2>{data.nama}</h2>
                <img src="http://localhost:5000/{data.image}" alt="{data.nama}" />
                <p>{data.deskripsi}</p>
                <!-- Add more details as needed -->
            </div>
        {/if}
    </div>
</div>

<style>
    .page-title {
        margin-bottom: 1.5rem;
        margin-top: 1.5rem;
    }
</style>