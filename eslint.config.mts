import js from "@eslint/js"
import globals from "globals"
import tseslint from "typescript-eslint"
import {defineConfig} from "eslint/config"

export default defineConfig([
	{
		files: ["**/*.{js,mjs,cjs,ts,mts,cts}"],
		plugins: {js},
		extends: ["js/recommended"],
		rules: {
			"indent": ["error", "tab"],
			"no-mixed-spaces-and-tabs": ["error", "smart-tabs"],
			"linebreak-style": ["error", "unix"],
			"quotes": ["error", "double"],
			"semi": ["error", "never"]
		},
		languageOptions: {globals: globals.browser}
	},
	tseslint.configs.recommended,
])
