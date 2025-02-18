import * as fs from 'fs';
import * as path from 'path';
import { exec } from 'child_process';

function listDirectSubdirectoriesOfSubdirectories(dir: string): string[] {
	const subdirs = fs.readdirSync(dir).filter(file => {
		return fs.statSync(path.join(dir, file)).isDirectory();
	});

	const directSubdirsOfSubdirs: string[] = [];

	subdirs.forEach(subdir => {
		const fullPath = path.join(dir, subdir);

		const nestedSubdirs = fs.readdirSync(fullPath).filter(file => {
			return fs.statSync(path.join(fullPath, file)).isDirectory();
		});

		nestedSubdirs.forEach(nestedSubdir => {
			directSubdirsOfSubdirs.push(path.join(fullPath, nestedSubdir));
		});
	});

	return directSubdirsOfSubdirs;
}

function getPathesToSync (subdirs: string[]): Map<string, string> {
	const result = new Map<string, string>([
		[
			'/Users/baderfall/Documents/web/jsd/globalping-dash-directus/src/extensions/bytes-value',
			'/Users/baderfall/Documents/web/jsd/directus-repo-2/api/extensions'
		],
		[
			'/Users/baderfall/Documents/web/jsd/globalping-dash-directus/src/lib/src',
			'/Users/baderfall/Documents/web/jsd/directus-repo-2/api/lib'
		],
		...subdirs
			.filter(subdir => !subdir.includes('extensions/bytes-value') && !subdir.includes('extensions/lib'))
			.map(subdir => {
				const extensionName = subdir.split('/').at(-1);
				return [subdir, `/Users/baderfall/Documents/web/jsd/directus-repo-2/api/extensions`] as const
			})
	]);

	return result;
}

const subdirectories = listDirectSubdirectoriesOfSubdirectories('/Users/baderfall/Documents/web/jsd/globalping-dash-directus/src/extensions');
const pathesToSync = getPathesToSync(subdirectories);

pathesToSync.forEach((value, key) => {
	exec(`rsync -av ${key} ${value}`, (error, stdout, stderr) => {
		if (error) {
			console.error(`Error syncing ${key} to ${value}:`, error);
			return;
		}

		console.log(`Successfully synced ${key} to ${value}`);
		console.log(stdout);
		console.error(stderr);
	});
});
