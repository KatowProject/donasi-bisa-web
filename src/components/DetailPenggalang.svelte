<script lang="ts">
	import { formatTimestamp, handleStatus, handleTarget } from "$lib/utils";
	import { onMount } from "svelte";
	import { isOwner } from "../stores/web3.store";
	import Loading from "./Loading.svelte";


    export let isLoading: boolean;
    export let data: GalangData | null;
    export let donateValue: number;
    export let acc: string;
    
    export let donate;
    export let withdraw;

    let owner = false;
    
	function canWithdraw() {
		if (!data) return false;

		const targetReached = data.terkumpul >= data.target;
		const deadlinePassed = Date.now() >= Number(data.deadline) * 1000;

		return targetReached || deadlinePassed;
    }

    
    onMount(async () => {
        owner = await isOwner() ?? false;
    });

</script>

<div class="card">
    <div class="card-header">
        <h3>Detail Penggalangan Dana</h3>
    </div>
    <div class="card-body">
        <div class="row">
            {#if isLoading}
                <Loading />
            {:else if data === null}
                <h2>Data tidak ditemukan</h2>
            {:else}
                <div class="col-6">
                    <img
                        class="img-fluid img-card"
                        src="http://localhost:5000/{data.image}"
                        alt={data.nama}
                    />
                </div>

                <div class="col-6">
                    <!-- table list -->
                    <table class="table">
                        <tbody>
                            <tr>
                                <td>Address Penggalang</td>
                                <td>{data.penggalang}</td>
                            </tr>
                            <tr>
                                <td>Nama</td>
                                <td>{data.nama}</td>
                            </tr>
                            <tr>
                                <td>Target</td>
                                <td>{handleTarget(data.target)} ETH</td>
                            </tr>
                            <tr>
                                <td>Terkumpul</td>
                                <td>{handleTarget(data.terkumpul)} ETH</td>
                            </tr>
                            <tr>
                                <td>Deskripsi</td>
                                <td>{data.deskripsi}</td>
                            </tr>
                            <tr>
                                <td>Deadline</td>
                                <td>{formatTimestamp(data.deadline)}</td>
                            </tr>
                            <tr>
                                <td>Status</td>
                                <td>
                                    {handleStatus(data.status.toString())}
                                </td>
                            </tr>
                        </tbody>
                    </table>

                    <div class="row">
                        <div class="col-6">
                            <!-- input donate -->
                            <div class="form-group">
                                <input type="number" bind:value={donateValue} class="form-control" id="donate" placeholder="Masukkan jumlah donasi" />
                            </div>
                        </div>

                        {#if acc}
                            <div class="col-6">
                                <!-- button donate -->
                                <button on:click={donate} class="btn btn-primary w-100">
                                    Donate Sekarang
                                </button>
                            </div>
                        {:else}
                            <div class="col-6">
                                <button class="btn btn-primary w-100" disabled>
                                    Login untuk donasi
                                </button>
                            </div>
                        {/if}
                        {#if data.penggalang === acc}
                            <div class="col-12 mt-3">
                                <button on:click={withdraw} class="btn btn-danger w-100" disabled={!canWithdraw()}>
                                    Withdraw
                                </button>
                            </div>
                        {/if}
                        {#if owner}
                            <!-- button fraud -->
                            <div class="col-12 mt-3">
                                <button class="btn btn-danger w-100">
                                    Fraud
                                </button>
                            </div>
                        {/if}
                    </div>
                </div>
            {/if}
        </div>
    </div>
</div>