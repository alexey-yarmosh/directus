<script setup lang="ts">
import SearchInput from '@/views/private/components/search-input.vue';
import { ref, watchEffect, watch, computed } from 'vue';
import { useI18n } from 'vue-i18n';
import SettingsNavigation from '../../components/navigation.vue';
import api from '@/api';
import { debounce } from 'lodash';
import { EXTENSION_TYPES } from '@directus/extensions';

const { t } = useI18n();

const liveSearch = ref('');

watch(
	liveSearch,
	debounce(() => {
		search.value = liveSearch.value;
	}, 450),
);

const perPage = 6;
const search = ref('');
const page = ref(1);
const type = ref<string>();

watch(search, ([newSearch, oldSearch]) => newSearch !== oldSearch && (page.value = 0));

const filterCount = ref(0);
const extensions = ref([]);

const pageCount = computed(() => Math.round(filterCount.value / perPage));

watchEffect(async () => {
	const { data } = await api.get('/extensions/registry', {
		params: {
			text: search.value,
			limit: perPage,
			offset: (page.value - 1) * perPage,
			type: type.value,
		},
	});

	filterCount.value = data.meta.filter_count;
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
			<button @click="type = undefined">All</button>
			<button v-for="extType in EXTENSION_TYPES" :key="extType" @click="type = extType">{{ extType }}</button>

			<v-list>
				<v-list-item v-for="extension in extensions" :key="extension.name" block clickable>
					<v-list-item-icon>
						<div class="icon"><v-icon name="storefront" /></div>
					</v-list-item-icon>
					<v-list-item-content>
						<p>{{ extension.name }}</p>
						<p>{{ extension.description }}</p>
					</v-list-item-content>
				</v-list-item>
			</v-list>

			<v-pagination v-if="pageCount > 1" v-model="page" :length="pageCount" :total-visible="5" />
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
