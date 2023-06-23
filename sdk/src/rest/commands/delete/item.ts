import type { PrimaryKey } from '@directus/types';
import type { RestCommand } from '../../types.js';

export const deleteItem =
	<Schema extends object, Collection extends keyof Schema>(
		collection: Collection,
		key: PrimaryKey
	): RestCommand<void, Schema> =>
	() => {
		const _collection = String(collection);

		if (_collection.startsWith('directus_')) {
			throw new Error('Cannot use readItems for core collections');
		}

		return {
			path: `/items/${_collection}/${key}`,
			method: 'DELETE',
		};
	};