<script setup lang="ts">
const { currentPage, pending } = await usePage();

const blocks = computed(() => currentPage.value.blocks);
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

