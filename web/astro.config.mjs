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
				github: 'https://github.com/SebastianAsprino/curso_backend',
				linkedin:'https://www.linkedin.com/in/sebastian-alejandro-asprino-ortiz-432075249/',
				"x.com":'https://x.com/Seb_Asp'
			},
			plugins: [
				ion()
			]
		}),
	],
});
