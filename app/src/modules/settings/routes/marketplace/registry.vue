<script setup lang="ts">
import { ExtensionType } from '@directus/extensions';
import { useI18n } from 'vue-i18n';
import SettingsNavigation from '../../components/navigation.vue';

const { t } = useI18n();
</script>

<template>
	<private-view :title="t('marketplace')">
		<template #headline><v-breadcrumb :items="[{ name: t('settings'), to: '/settings' }]" /></template>

		<template #title-outer:prepend>
			<v-button class="header-icon" rounded icon exact disabled>
				<v-icon name="storefront" />
			</v-button>
		</template>

		<template #navigation>
			<settings-navigation />
		</template>

		<template #sidebar>
			<!-- <extensions-info-sidebar-detail /> -->
		</template>

		<div class="page-container">
			<h1>Hello World</h1>
		</div>
	</private-view>
</template>

<style lang="scss" scoped>
.header-icon {
	--v-button-background-color-disabled: var(--theme--primary-background);
	--v-button-color-disabled: var(--theme--primary);
	--v-button-background-color-hover-disabled: var(--theme--primary-subdued);
	--v-button-color-hover-disabled: var(--theme--primary);
}

.page-container {
	padding: var(--content-padding);
	padding-top: 0;
}

.group-divider {
	margin-bottom: 12px;
}

.extension-group + .extension-group {
	margin-top: 24px;
}
</style>
