<script lang="ts">
	import Icon from '$lib/images/icon.png';
	import { page } from '$app/stores';
</script>

<header>
	<nav class="navbar navbar-expand-lg bg-body-tertiary border-bottom fixed-top shadow">
		<div class="container">
			<a class="navbar-brand mb-0 h1" href="/">
				<img src={Icon} alt="Icon" width="25" class="d-inline-block align-top" />
				<span class="gradient-text">Donasi Bisa</span>
			</a>

			<div class="collapse navbar-collapse" id="navbarText">
				<ul class="navbar-nav ms-auto mb-2 mb-lg-0">
					<li class="nav-item" aria-current={$page.url.pathname === 'home' ? 'page' : undefined}>
						<a class="nav-link" href="/">
							<i class="bi bi-house-door me-1"></i>
							Home
						</a>
					</li>

					<li class="nav-item" aria-current={$page.url.pathname === 'balance' ? 'page' : undefined}>
						<a class="nav-link" href="/balance">
							<i class="bi bi-wallet me-1"></i>
							Balance
						</a>
					</li>
				</ul>
			</div>
		</div>
	</nav>
</header>

<style>
	.nav-link {
		color: #000 !important;
	}
	.navbar-brand span {
		font-weight: 700;
		/* gradient text */
		background: linear-gradient(90deg, #215783, #495353);
		-webkit-background-clip: text;
		background-clip: text;
		-webkit-text-fill-color: transparent;
		text-transform: uppercase;
	}

	.navbar-brand span:hover {
		color: #495353;

		/* gradient text */
		background: linear-gradient(90deg, #495353, #215783);
		-webkit-background-clip: text;
		background-clip: text;
		-webkit-text-fill-color: transparent;
	}
</style>
