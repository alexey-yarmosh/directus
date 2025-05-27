import { useEnv } from '@directus/env';
import { resolveFsExtensions, resolveModuleExtensions } from '@directus/extensions/node';
import { join } from 'node:path';
import { getExtensionsPath } from './get-extensions-path.js';

export const getExtensions = async () => {
	const env = useEnv();

	const localExtensions = await resolveFsExtensions(getExtensionsPath());

	// Rewriting path to extesion files from 'dist/index.js' to 'src/index.ts'
	localExtensions.forEach((extension) => {
		if ([
			// Bundle
			'bytes-value',
			// Interfaces
			'visible-token', 'token', 'tag-prefix-selector', 'probes-adapter', 'gp-tags', 'github-username', 'secrets'
		].includes(extension.name)) {
			return;
		}

		if (typeof extension.entrypoint === 'string') {
			extension.entrypoint = extension.entrypoint.replace('dist', 'src').replace('.js', '.ts');
		} else if (typeof extension.entrypoint === 'object') {
			extension.entrypoint.app = extension.entrypoint.app.replace('dist', 'src').replace('.js', '.ts');
			extension.entrypoint.api = extension.entrypoint.api.replace('dist', 'src').replace('.js', '.ts');
		}
	});

	const registryExtensions = await resolveFsExtensions(join(getExtensionsPath(), '.registry'));

	/** Extensions that are listed as dependencies in the root package.json */
	const moduleExtensions = await resolveModuleExtensions(env['PACKAGE_FILE_LOCATION'] as string);

	return { local: localExtensions, registry: registryExtensions, module: moduleExtensions };
};
