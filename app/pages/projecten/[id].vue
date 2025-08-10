<script setup lang="ts">
import type { Project } from "#payload/types";

const route = useRoute();
const id = ref(route.params.id as string);

const isError = ref(false);
const errorMessage = ref('');
const pending = ref(true);
let projectBlocks: any[] = [];

if (id.value) {
    try {
        const { data: projectData, error: fetchError } = await useCollection<Project>('projects', { id: id.value });

        pending.value = false;

        if (fetchError.value || !projectData.value) {
            isError.value = true;
            errorMessage.value = fetchError.value?.message || 'Project not found';
            if (import.meta.server) console.error(`[Prerender /projecten/${id.value}] Fetch error: ${fetchError.value?.message || 'No data'}`);
        } else {
            projectBlocks = projectData.value?.blocks ?? [];
        }
    } catch (err) {
        pending.value = false;
        isError.value = true;
        errorMessage.value = 'Unexpected error loading project';
        if (import.meta.server) console.error(`[Prerender /projecten/${id.value}] Unexpected error: ${err.message}`);
    }
} else {
    pending.value = false;
    isError.value = true;
    errorMessage.value = 'Project ID not provided';
}
</script>

<template>
    <div>
        <div v-if="pending" class="loading">Loading...</div>
        <div v-else-if="isError" class="error">{{ errorMessage }}</div>
        <template v-for="block in projectBlocks" v-else :key="block.id">
            <Component :is="`blocks-${block.blockType}`" :data="block" />
        </template>
    </div>
</template>
