import { svelte } from "@sveltejs/vite-plugin-svelte";
import type { UserConfig } from "vite";

export default {
	base: "",
	plugins: [svelte({})],
} satisfies UserConfig;
