<script lang="ts">
	import '../app.css';
	import Menu from '../components/Menu.svelte';
	import { themeStore, applyTheme } from '$lib/themeStore';
	import { onMount } from 'svelte';

	let { children } = $props();

	onMount(() => {
		themeStore.subscribe((theme) => {
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
