module.exports = {
	root: true,
	env: {
		node: true,
		'vue/setup-compiler-macros': true
	},
	extends: ['plugin:vue/vue3-essential', 'eslint:recommended', '@vue/typescript/recommended', 'plugin:prettier/recommended'],
	parserOptions: {
		ecmaVersion: 2020
	},
	rules: {
		'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
		'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
		'@typescript-eslint/ban-ts-comment': 'off', // Bans @ts-<directive> comments from being used or requires descriptions after directive
		'@typescript-eslint/no-non-null-assertion': 'off', // Disallows non-null assertions using the ! postfix operator
		'@typescript-eslint/no-unused-vars': 'off', // Disallow unused variables.
		'@typescript-eslint/no-empty-function': 'off', // Disallow empty functions
		'@typescript-eslint/no-explicit-any': 'error'
	},
	overrides: [
		{
			files: ['**/__tests__/*.{j,t}s?(x)', '**/tests/unit/**/*.spec.{j,t}s?(x)'],
			env: {
				jest: true
			}
		}
	]
};
