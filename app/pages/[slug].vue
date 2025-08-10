<script setup lang="ts">
const route = useRoute();
const slug = computed(() => {
    const raw = route.params.slug
    return Array.isArray(raw) ? raw.join('/') : raw;
})

const { pages, pending } = await usePages();

const currentPage = computed(() => pages.value?.filter(p => p.slug === slug.value)?.[0]);

const blocks = computed(() => slug.value === 'nieuws' || slug.value === 'projecten' ? currentPage.value?.archive.blocks : currentPage.value?.fields.blocks);
</script>

<template>
    <div>
        <template v-if="!pending">
            <template v-for="block in blocks" :key="block?.id">
                <component :is="`blocks-${block?.blockType}`" :data="block" />
            </template>
        </template>
        <div v-else class="container">Loading...</div>

        <OrganismsArticles v-if="slug === 'nieuws'" />
        <OrganismsProjects v-if="slug === 'projecten'" />
    </div>
</template>
