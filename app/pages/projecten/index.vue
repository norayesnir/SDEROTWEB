<script setup lang="ts">
import type { Page, GlobalSettings } from "#payload/types";

const { data: globalSettings, error: globalError } = await useGlobal<GlobalSettings>('global-settings');

const isGlobalError = ref(globalError.value);
if (isGlobalError.value) console.log(isGlobalError);

const projectsPageId = globalSettings.value?.projects?.page?.id;

const isPageError = ref(false);
const pageErrorMessage = ref('');
let archiveBlocks: any[] = [];

if (!isGlobalError.value && projectsPageId) {
    const { data: pageData, error: pageError } = await useCollection<Page>('pages', { id: projectsPageId });

    isPageError.value = !!pageError.value || !pageData.value;
    pageErrorMessage.value = pageError.value?.message || 'Failed to load projects page';

    if (!isPageError.value) {
        archiveBlocks = (pageData.value as Page)?.archive?.blocks ?? [];
    }
} else if (!projectsPageId) {
    isPageError.value = true;
    pageErrorMessage.value = 'Projects page configuration not found';
}

if (import.meta.dev && process.env.NODE_ENV !== 'production') {
    console.log(`[Prerender /projecten] Global error: ${isGlobalError.value}, Page error: ${isPageError.value}`);
}
</script>

<template>
    <div>
        <template v-for="(block, blockIndex) in archiveBlocks" :key="blockIndex">
            <Component :is="`blocks-${block.blockType}`" v-if="block.id" :data="block" />
        </template>

        <OrganismsProjects />
    </div>
</template>
