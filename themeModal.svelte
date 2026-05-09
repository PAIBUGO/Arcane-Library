<script lang="ts">
	import { Modal, Button, Badge } from 'flowbite-svelte';
	import { PaletteOutline } from 'flowbite-svelte-icons';
	import { themeStore, themes, type Season } from '$lib/themeStore';
	
	let openModal = false;
	let currentTheme: Season = 'spring';

	themeStore.subscribe((theme) => {
		currentTheme = theme;
	});

	function handleThemeChange(theme: Season) {
		themeStore.set(theme);
		currentTheme = theme;
	}

	function getThemeEmoji(season: Season): string {
		const emojis: Record<Season, string> = {
			spring: '🌸',
			summer: '☀️',
			autumn: '🍂',
			winter: '❄️'
		};
		return emojis[season];
	}

	function getColorShades(baseColor: string) {
		return [baseColor, baseColor, baseColor]; // Simplified for display
	}
</script>

<div>
	<!-- Theme Toggle Button -->
	<button
		on:click={() => (openModal = true)}
		class="flex items-center gap-2 px-3 py-1 rounded text-white hover:opacity-80 transition-opacity"
		title="Trocar tema"
	>
		<PaletteOutline class="w-5 h-5" />
		<span class="hidden sm:inline text-sm font-medium">Tema</span>
	</button>

	<!-- Theme Modal -->
	<Modal bind:open={openModal} size="lg" title="Escolha seu Tema" outsideclose>
		<div class="grid grid-cols-2 gap-4 md:grid-cols-4">
			{#each Object.entries(themes) as [key, theme] (key)}
				<button
					on:click={() => handleThemeChange(key as Season)}
					class="p-4 rounded-lg border-2 transition-all {currentTheme === key
						? 'border-gray-900 dark:border-white bg-gray-50 dark:bg-gray-700'
						: 'border-gray-300 dark:border-gray-600 hover:border-gray-500 dark:hover:border-gray-400'}"
				>
					<div class="text-center">
						<div class="text-3xl mb-2">{getThemeEmoji(key as Season)}</div>
						<p class="font-semibold text-sm text-gray-900 dark:text-white mb-2">{theme.label}</p>

						<!-- Color Palette Preview -->
						<div class="flex gap-1 justify-center mb-2">
							<div
								class="w-6 h-6 rounded-full border border-gray-300"
								style="background-color: {theme.primaryColor};"
								title={theme.primaryColor}
							/>
							<div
								class="w-6 h-6 rounded-full border border-gray-300"
								style="background-color: {theme.secondaryColor};"
								title={theme.secondaryColor}
							/>
							<div
								class="w-6 h-6 rounded-full border border-gray-300"
								style="background-color: {theme.accentColor};"
								title={theme.accentColor}
							/>
						</div>

						{#if currentTheme === key}
							<Badge color="green" class="text-xs">Ativo</Badge>
						{/if}
					</div>
				</button>
			{/each}
		</div>

		<!-- Current Theme Colors -->
		<div class="mt-6 p-4 bg-gray-100 dark:bg-gray-800 rounded-lg">
			<h3 class="font-semibold text-gray-900 dark:text-white mb-3">Cores do Tema Atual:</h3>
			<div class="space-y-2">
				<div class="flex items-center justify-between">
					<span class="text-sm text-gray-700 dark:text-gray-300">Cor Primária:</span>
					<div class="flex items-center gap-2">
						<div
							class="w-8 h-8 rounded border border-gray-300"
							style="background-color: {themes[currentTheme].primaryColor};"
						/>
						<code class="text-xs bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded">
							{themes[currentTheme].primaryColor}
						</code>
					</div>
				</div>
				<div class="flex items-center justify-between">
					<span class="text-sm text-gray-700 dark:text-gray-300">Cor Secundária:</span>
					<div class="flex items-center gap-2">
						<div
							class="w-8 h-8 rounded border border-gray-300"
							style="background-color: {themes[currentTheme].secondaryColor};"
						/>
						<code class="text-xs bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded">
							{themes[currentTheme].secondaryColor}
						</code>
					</div>
				</div>
				<div class="flex items-center justify-between">
					<span class="text-sm text-gray-700 dark:text-gray-300">Cor de Destaque:</span>
					<div class="flex items-center gap-2">
						<div
							class="w-8 h-8 rounded border border-gray-300"
							style="background-color: {themes[currentTheme].accentColor};"
						/>
						<code class="text-xs bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded">
							{themes[currentTheme].accentColor}
						</code>
					</div>
				</div>
			</div>
		</div>

		<svelte:fragment slot="footer">
			<Button on:click={() => (openModal = false)}>Fechar</Button>
		</svelte:fragment>
	</Modal>
</div>

<style>
	:global(.theme-spring) {
		--color-primary-500: #10b981;
		--color-secondary-500: #fbbf24;
		--color-accent-500: #ec4899;
	}

	:global(.theme-summer) {
		--color-primary-500: #f59e0b;
		--color-secondary-500: #06b6d4;
		--color-accent-500: #f97316;
	}

	:global(.theme-autumn) {
		--color-primary-500: #dc2626;
		--color-secondary-500: #f97316;
		--color-accent-500: #b45309;
	}

	:global(.theme-winter) {
		--color-primary-500: #0ea5e9;
		--color-secondary-500: #60a5fa;
		--color-accent-500: #818cf8;
	}
</style>
