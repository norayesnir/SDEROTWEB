<script setup lang="ts">
import type { Page } from "#payload/types";

interface CollectionResponse<T> {
    docs: T[];
}

const { data } = useCollection<CollectionResponse<Page>>('pages', { id: 1 })

const fields = computed(() => data.value?.fields)
const blocks = computed(() => fields.value?.blocks)
</script>

<template>
    <div>
        <template v-if="blocks && blocks.length">
            <template v-for="block in blocks" :key="block?.id">
                <component :is="`blocks-${block?.blockType}`" :data="block" />
            </template>
        </template>
    </div>
</template>
