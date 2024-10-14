<script lang="ts">
	import Icon from '$lib/images/icon.png';

	import { init as ConnectWeb3, connectWallet} from '../services';
	import {account, isWalletConnected} from '../stores/web3.store';
	import { get } from 'svelte/store';
	import { page } from '$app/stores';
	import { onMount } from 'svelte';

	let accountData = get(account);
	let isWalletConnectedData = get(isWalletConnected);

	onMount(() => {
		ConnectWeb3().then(() => {
			account.subscribe((value) => {
				accountData = value;
			});

			isWalletConnected.subscribe((value) => {
				isWalletConnectedData = value;
			});
		});
	});

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

					<!-- check wallet connected or not -->
					{#if isWalletConnectedData}
						<!-- if connect give set connected text, not route to create page -->
						 <li class="nav-item">
							<!-- nama -->
							<div class="nav-link text-truncate">
								<i class="bi bi-person me-1"></i>
								{accountData}
							</div>
						</li>
					{:else}
						<b class="nav-item" aria-current={$page.url.pathname === 'create' ? 'page' : undefined}>
							<!-- ... for text -->
							<button class="nav-link" on:click={connectWallet}>
								<i class="bi bi-wallet me-1"></i>
								Connect Wallet
							</button>
						</b>
					{/if}
						
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
