<script lang="ts">
	import Icon from '$lib/images/icon.png';

	import {account, isWalletConnected, connectWallet, initWeb3, selectPlatform, logout} from '../stores/web3.store';
	import { page } from '$app/stores';
	import { onMount } from 'svelte';

	let accountData = '';
	let isWalletConnectedData = false;

	onMount(async () => {
		handleInit();
	});

	async function handleInit() {
		await initWeb3();

		const savedAccount = sessionStorage.getItem('account');
		const walletConnected = sessionStorage.getItem('walletConnected');

		if (walletConnected && savedAccount) {
            account.set(savedAccount);
            isWalletConnected.set(true);
        }

        account.subscribe((value) => {
            accountData = value ?? '';
        });

        isWalletConnected.subscribe((value) => {
            isWalletConnectedData = value;
        });
	}

	async function handleConnectWallet() {
		selectPlatform();

		await connectWallet();
	}

	async function handleLogout() {
		logout();
	}
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

					<!-- your campaign -->
					<li class="nav-item" aria-current={$page.url.pathname === 'campaign' ? 'page' : undefined}>
						<a class="nav-link" href="/campaign">
							<i class="bi bi-card-list me-1"></i>
							Campaign
						</a>
					</li>

					<li class="nav-item" aria-current={$page.url.pathname === 'create' ? 'page' : undefined}>
						<a class="nav-link" href="/create">
							<i class="bi bi-plus-circle me-1"></i>
							Create
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
						<li class="nav-item">
                            <button class="btn btn-danger" on:click={handleLogout}>
                                <i class="bi bi-box-arrow-right me-1"></i>
                                Logout
                            </button>
                        </li>
					{:else}
						<b class="nav-item" aria-current={$page.url.pathname === 'create' ? 'page' : undefined}>
							<!-- ... for text -->
							<button class="nav-link" on:click={handleConnectWallet}>
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

	.nav-link:hover {
		color: #495353 !important;
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
