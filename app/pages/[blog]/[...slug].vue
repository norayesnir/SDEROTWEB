<script setup lang="ts">
const { data, pending } = useArticle();

const blocks = computed(() => data.value.blocks || []);
</script>

<template>
    <ClientOnly>
        <div>
            <template v-if="!pending && blocks.length">
                <template v-for="block in blocks" :key="block?.id">
                    <component :is="`blocks-${block?.blockType}`" :data="block" />
                </template>
            </template>
            <div v-else class="container">Loading...</div>
        </div>
    </ClientOnly>
</template>
