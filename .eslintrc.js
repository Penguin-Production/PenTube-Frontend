module.exports = {
	env: {
		browser: true,
		amd: true,
		node: true,
	},
	parser: '@typescript-eslint/parser',
	parserOptions: {
		ecmaVersion: 2020,
		sourceType: 'module',
		ecmaFeatures: {
			jsx: true,
		},
	},
	settings: {
		react: {
			version: 'detect',
		},
		'import/resolver': {
			node: {
				paths: ['src'],
				extensions: ['.js', '.jsx', '.ts', '.tsx'],
			},
		},
	},
	extends: [
		'eslint:recommended',
		'plugin:react/recommended',
		'plugin:@typescript-eslint/recommended',
		'plugin:prettier/recommended',
		'plugin:jsx-a11y/recommended',
		'plugin:import/errors',
		'plugin:import/warnings',
	],
	overrides: [],

	plugins: ['prettier'],
	rules: {
		'prettier/prettier': ['error', {}, { usePrettierrc: true }],
		'no-console': 'warn',
		'no-eval': 'warn',
		'no-proto': 2,
		'react/display-name': 'off',
		'react/prop-types': 'off',
		'react/jsx-uses-react': 'off',
		'react/react-in-jsx-scope': 'off',
		'react-hooks/exhaustive-deps': 0,
		'import/no-named-as-default-member': 0,
		'import/no-named-as-default': 0,
		'import/named': 0,
		'import/export': 0,
		'import/default': 0,
		'import/namespace': 0,
		'import/no-cycle': 'error',
		'import/no-duplicates': 'error',
		'no-unused-vars': 'warn',
	},
};
