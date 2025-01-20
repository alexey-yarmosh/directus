import type { OperationContext } from '@directus/extensions';
import { getFirmwareSubject, getNodeVersionSubject } from '../../../../lib/src/check-firmware-versions.js';

export type AdoptedProbe = {
	id: string;
	ip: string;
	userId: string | null;
	name: string | null;
	hardwareDeviceFirmware: string | null;
	nodeVersion: string | null;
}

export const getAlreadyNotifiedProbes = async ({ env, services, database, getSchema }: OperationContext) => {
	const { ItemsService } = services;

	const notificationsService = new ItemsService('directus_notifications', {
		schema: await getSchema({ database }),
		knex: database,
	});

	const notifications: { item: string }[] = await notificationsService.readByQuery({
		fields: [ 'id' ],
		filter: {
			subject: {
				_in: [ getFirmwareSubject(env.TARGET_HW_DEVICE_FIRMWARE), getNodeVersionSubject(env.TARGET_NODE_VERSION) ],
			},
			collection: 'gp_adopted_probes',
		},
	});

	return new Set(notifications.map(({ item }) => item));
};


export const getProbesToCheck = async (offsetId: string, { env, database }: OperationContext) => {
	const probes: AdoptedProbe[] = await database.raw(`
		SELECT *
		FROM gp_adopted_probes
		WHERE (
			(nodeVersion != ? AND nodeVersion IS NOT NULL)
			OR (hardwareDeviceFirmware != ? AND hardwareDeviceFirmware IS NOT NULL)
		)
		AND id > ?
		LIMIT 100
	`, [ env.TARGET_NODE_VERSION, env.TARGET_HW_DEVICE_FIRMWARE, offsetId ]);

	return probes;
};
