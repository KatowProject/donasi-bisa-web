<script lang="ts">
	export let data: any;

	console.log(data);
</script>

<div class="row">
	<div class="col-md-12 page-title">
		<h1>List Penggalangan Dana</h1>
	</div>

	<div class="col-12">
		<div class="row">
			<!-- if data length is 0, set "Belum Ada Penggalangan Dana" -->
			{#if data.props.galangs.length === 0}
				<div class="col-12">
					<p>Belum Ada Penggalangan Dana</p>
				</div>
			{:else}
				<!-- if data length is not 0, loop through data -->
				{#each data as item}
					<div class="col-md-4">
						<div class="card">
							<img src={item.image} class="card-img-top" alt={item.title} />
							<div class="card-body">
								<h5 class="card-title">{item.title}</h5>
								<p class="card-text">{item.description}</p>
								<a href="/penggalangan-dana/{item.id}" class="btn btn-primary">Lihat Detail</a>
							</div>
						</div>
					</div>
				{/each}
			{/if}
		</div>
	</div>
</div>

<style>
	.page-title {
		margin-bottom: 1.5rem;
		margin-top: 1.5rem;
	}
</style>
