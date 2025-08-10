<script setup lang="ts">
const { pages, pending } = await usePages();

const currentPage = computed(() => pages.value?.filter(p => p.slug === 'home')?.[0]);

const blocks = computed(() => currentPage.value?.fields.blocks);
</script>

<template>
    <div>
        <template v-if="!pending">
            <template v-for="block in blocks" :key="block?.id">
                <component :is="`blocks-${block?.blockType}`" :data="block" />
            </template>
        </template>
        <div v-else class="container">Loading...</div>
    </div>
</template>
