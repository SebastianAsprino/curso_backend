// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import { ion } from "starlight-ion-theme";

// https://astro.build/config
export default defineConfig({
	site: 'https://innova.asprino.dev',
	integrations: [
		starlight({
			title: 'Curso Backend',
			logo: {
				src: './src/assets/innova.svg',
			},
			social: {
				github: 'https://github.com/Innova-Uninorte',
				instagram: 'https://www.instagram.com/innova_uninorte/'
			},
			plugins: [
				ion()
			]
		}),
	],
});
