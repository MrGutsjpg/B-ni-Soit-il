import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';

export default defineConfig({
  site: 'https://MrGutsjpg.github.io/B-ni-Soit-il/',
  base: '/B-ni-Soit-il/',
  integrations: [tailwind()],
});
