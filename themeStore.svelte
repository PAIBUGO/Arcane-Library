import { writable } from 'svelte/store';

export type Season = 'spring' | 'summer' | 'autumn' | 'winter';

export interface Theme {
	name: Season;
	label: string;
	primaryColor: string;
	secondaryColor: string;
	accentColor: string;
}

export const themes: Record<Season, Theme> = {
	spring: {
		name: 'spring',
		label: 'Primavera',
		primaryColor: '#10b981', // emerald
		secondaryColor: '#fbbf24', // amber
		accentColor: '#ec4899' // pink
	},
	summer: {
		name: 'summer',
		label: 'Verão',
		primaryColor: '#f59e0b', // amber
		secondaryColor: '#06b6d4', // cyan
		accentColor: '#f97316' // orange
	},
	autumn: {
		name: 'autumn',
		label: 'Outono',
		primaryColor: '#dc2626', // red
		secondaryColor: '#f97316', // orange
		accentColor: '#b45309' // amber-900
	},
	winter: {
		name: 'winter',
		label: 'Inverno',
		primaryColor: '#0ea5e9', // sky
		secondaryColor: '#60a5fa', // blue
		accentColor: '#818cf8' // indigo
	}
};

function createThemeStore() {
	const storedTheme = typeof localStorage !== 'undefined' ? localStorage.getItem('theme') : null;
	const initialTheme: Season = (storedTheme as Season) || 'spring';

	const { subscribe, set } = writable<Season>(initialTheme);

	return {
		subscribe,
		set: (theme: Season) => {
			set(theme);
			if (typeof localStorage !== 'undefined') {
				localStorage.setItem('theme', theme);
			}
			applyTheme(theme);
		}
	};
}

export function applyTheme(theme: Season) {
	const themeConfig = themes[theme];
	const root = document.documentElement;

	// Set CSS variables for the theme
	root.style.setProperty('--color-primary-500', themeConfig.primaryColor);
	root.style.setProperty('--color-secondary-500', themeConfig.secondaryColor);
	root.style.setProperty('--color-accent-500', themeConfig.accentColor);

	// Add theme class to html element
	Object.keys(themes).forEach((t) => {
		root.classList.remove(`theme-${t}`);
	});
	root.classList.add(`theme-${theme}`);
}

  export const themeStore = createThemeStore();
