import { defineConfig } from "tsup";

export default defineConfig(options => ({
	entry: ["./src/main.ts"],
	dts: !options.watch,
	minify: !options.watch,
	clean: true,
	splitting: false,
	format: ["cjs", "esm"],
}));
