<script setup lang="ts">
import SearchInput from '@/views/private/components/search-input.vue';
import { ref, watchEffect, watch } from 'vue';
import { useI18n } from 'vue-i18n';
import SettingsNavigation from '../../components/navigation.vue';
import api from '@/api';
import { debounce } from 'lodash';

const { t } = useI18n();

const liveSearch = ref('');

watch(
	liveSearch,
	debounce(() => {
		search.value = liveSearch.value;
	}, 450),
);

const search = ref('');
const page = ref(0);
const perPage = ref(20);
const type = ref<string>();

watch(search, ([newSearch, oldSearch]) => newSearch !== oldSearch && (page.value = 0));

const extensions = ref([]);

watchEffect(async () => {
	const { data } = await api.get('/extensions/registry', {
		params: {
			text: search.value,
			limit: perPage.value,
			offset: page.value * perPage.value,
			type: type.value,
		},
	});

	extensions.value = data.data;
});
</script>

<template>
	<private-view :title="t('marketplace')">
		<template #headline><v-breadcrumb :items="[{ name: t('settings'), to: '/settings' }]" /></template>

		<template #title-outer:prepend>
			<v-button class="header-icon" rounded icon exact disabled>
				<v-icon name="storefront" />
			</v-button>
		</template>

		<template #actions>
			<search-input v-model="liveSearch" :show-filter="false" />
		</template>

		<template #navigation>
			<settings-navigation />
		</template>

		<template #sidebar>
			<!-- <extensions-info-sidebar-detail /> -->
		</template>

		<div class="page-container">
			<ul>
				<li v-for="extension in extensions" :key="extension.name">
					{{ extension.name }}
				</li>
			</ul>
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
