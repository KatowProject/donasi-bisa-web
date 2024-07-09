<script lang="ts">
    import Header from './Header.svelte';
</script>

<style>
    main {
        margin-top: 60px;
        
        /* min-height got length width of header and footer */
        min-height: calc(100vh - 60px - 60px);
    }

</style>
<div class="app">
	<Header />

	<main>
        <div class="container">
            <slot />
        </div>
	</main>

    <footer class="d-flex flex-wrap justify-content-between align-items-center py-3 border-top bg-body-tertiary fixed-bottom">
        <div class="container">
            <div class="row">
                <p class="col-md-4 mb-0 text-muted">©2024 KatowProject</p>
            </div>
        </div>
    </footer>
</div>