<script lang="ts">
    import { handleTarget, handleTime } from "$lib/utils";

    export let item: Penggalang;
</script>


<div class="card">
    <!-- random image -->
    <img src="http://localhost:5000/{item.penggalang.image}" class="card-img-top" alt="..." />
    <div class="card-body">
        <h5 class="card-title">{item.penggalang.nama}</h5>
        <p class="card-text">{item.penggalang.deskripsi}</p>
    </div>

    <div class="card-footer d-flex justify-content-between text-center">
        <small class="text-muted">
            <i class="bi bi-clock me-1"></i>
            {handleTime(item.penggalang.deadline)}
        </small>
    
        <small class="text-muted">
            <i class="bi bi-wallet2 me-1"></i>
            {handleTarget(item.penggalang.target)}
        </small>
    
        <small>
            <!-- jumlah donatur -->
            <i class="bi bi-people me-1"></i>
            {item.penggalang.totalDonatur}
        </small>
    </div>

    <div class="card-footer d-flex justify-content-between">
        <a href="/galang/{item.id}" class="btn btn-primary w-100">
            <i class="bi bi-eye me-2"></i>
            Detail
        </a>
    </div>
</div>