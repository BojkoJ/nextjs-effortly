import next from "eslint-config-next/core-web-vitals";

/** @type {import("eslint").Linter.Config[]} */
const config = [
	{
		ignores: [".next/**", "node_modules/**", "lib/generated/**"],
	},
	...next,
	{
		rules: {
			// Tato pravidla přicházejí s eslint-plugin-react-hooks v6 (éra React
			// Compileru) v eslint-config-next 16 a nebyla součástí původního lint
			// baseline projektu. Označují zaběhlé, záměrné vzory (SSR mount guard,
			// jednorázový náhodný výběr). Ponecháváme je jako varování, ne chyby.
			"react-hooks/set-state-in-effect": "warn",
			"react-hooks/purity": "warn",
			"react-hooks/immutability": "warn",
		},
	},
];

export default config;
