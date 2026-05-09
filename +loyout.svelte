<script lang="ts">
	import '../app.css';
	import Menu from '../components/Menu.svelte';
	import { onMount } from 'svelte';
	import { themeStore, applyTheme } from '$lib/themeStore';
	import type { Season } from '$lib/themeStore';

	let { children } = $props();
	let currentTheme: Season;

	// Subscribe to theme changes
	onMount(() => {
		themeStore.subscribe((theme) => {
			currentTheme = theme;
			applyTheme(theme);
		});
	});
</script>

<main class="flex flex-col items-center justify-center min-h-screen w-full bg-white dark:bg-gray-900">
	<Menu />
	<div class="w-full max-w-3xl px-4 md:px-8">
		{@render children()}
	</div>
</main>

