import { loadEnv } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';
import { defineConfig } from 'vitest/config';

export default defineConfig(({ mode }) => ({
	test: {
		globals: true,
		environment: 'node',
		pool: 'threads',
		coverage: {
			provider: 'v8',
			reporter: ['text', 'json', 'html'],
			reportsDirectory: './coverage',
			all: true,
			include: ['src/**/*.ts'],
			exclude: [
				'src/**/*.test.ts',
				'src/main.ts',
				'src/server/index.ts',
				'src/server/plugins/**/*.ts',
				'src/database/**/*.ts',
				'src/types/**/*.ts',
			],
		},
		passWithNoTests: true,
		env: loadEnv(mode, process.cwd(), ''),
		projects: [
			{
				extends: true,
				test: {
					name: { label: 'unit', color: 'green' },
					include: ['src/**/*-unit.test.ts'],
					poolOptions: {
						threads: {
							isolate: true,
							minThreads: 1,
							maxThreads: 4,
						},
					},
				},
			},
			{
				extends: true,
				test: {
					name: { label: 'integration', color: 'yellow' },
					include: ['src/**/*-integration.test.ts'],
					singleThread: true,
				},
			},
		],
	},
	plugins: [tsconfigPaths()],
	esbuild: {
		sourcemap: true,
	},
}));
