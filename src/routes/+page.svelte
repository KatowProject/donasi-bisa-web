<script lang="ts">
	export let data: any;
</script>

<div class="row">
	<div class="col-md-12 page-title">
		<h1>List Penggalangan Dana</h1>
	</div>

	<div class="col-12">
		<div class="card">
			<div class="card-body">
				<div class="row justify-content-center align-items-center">
					<!-- if data length is 0, set "Belum Ada Penggalangan Dana" -->
					{#if data.props.galangs.length === 0}
						<div class="col-12 text-center">
							<p>Belum Ada Penggalangan Dana</p>

							<a href="/create" class="btn btn-primary">
								<i class="bi bi-plus-circle me-2"></i>
								Buat
							</a>
						</div>
					{:else}
						<!-- if data length is not 0, loop through data -->
						{#each data.props.galangs as item}
							<div class="col-md-4">
								<div class="card">
									<!-- random image -->
									<img src="https://picsum.photos/200/200" class="card-img-top" alt="..." />
									<div class="card-body">
										<h5 class="card-title">{item.nama}</h5>
										<p class="card-text">{item.deskripsi}</p>
									</div>

									<div class="card-footer d-flex justify-content-between text-center">
										<small class="text-muted">
											<i class="bi bi-clock me-1"></i>
											{item.deadline}
										</small>
									
										<small class="text-muted">
											<i class="bi bi-wallet2 me-1"></i>
											{item.target}
										</small>
									
										<small>
											<!-- jumlah donatur -->
											<i class="bi bi-people me-1"></i>
											{item.totalDonatur}
										</small>
									</div>
								</div>
							</div>
						{/each}
					{/if}
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
