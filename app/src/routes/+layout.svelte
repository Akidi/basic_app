<script lang="ts">
	import '../app.css';
	import { page } from '$app/stores'; // Optional: for active link highlighting
	import { dev } from '$app/environment';
	import Header from '$lib/components/Header/Header.svelte';
	let { children } = $props();

	// State for dropdown visibility
	let isDemoOpen = $state(false);

	// Toggle dropdown
	function toggleDemo() {
		isDemoOpen = !isDemoOpen;
	}

	const title = "App Name";
</script>

<svelte:head>
	<title>{title}{dev ? '[DEV]' : ''}</title>
</svelte:head>

<Header {title} />

<!-- Navigation Menu -->
<nav class="bg-gray-800 text-white shadow-md">
	<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
		<div class="flex items-center justify-between h-16">
			<!-- Left side: Home Icon -->
			<a href="/" class="flex items-center space-x-2 hover:text-gray-300">
				<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l9-9 9 9M5 10v10a1 1 0 001 1h3a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1h3a1 1 0 001-1V10M9 21h6" />
				</svg>
				<span class="hidden sm:inline font-semibold">Home</span>
			</a>

			<!-- Right side: Demo Dropdown with SVG Icon -->
			<div class="relative">
				<button
					onclick={toggleDemo}
					class="flex items-center space-x-1 px-3 py-2 rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
				>
				<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
					<!-- Rounded square frame -->
					<rect x="4" y="4" width="16" height="16" rx="4" />
					<!-- Play triangle inside -->
					<path d="M10 8l6 4-6 4z" />
				</svg>
					<span>Demos</span>
					
				</button>

				{#if isDemoOpen}
					<div
						class="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 text-gray-800 z-10"
					>
						<a
							href="/demo/lucia"
							class="block px-4 py-2 hover:bg-gray-100 {$page.url.pathname === '/demo/lucia' ? 'bg-gray-200' : ''}"
							onclick={() => (isDemoOpen = false)}
						>
							Lucia Demo
						</a>
					</div>
				{/if}
			</div>
		</div>
	</div>
</nav>

<!-- Render children below the nav -->
<main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
	{@render children()}
</main>