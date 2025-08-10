<script setup lang="ts">
import type { Page } from '#payload/types'

const route = useRoute()
const slug  = computed(() => route.params.slug as string)

const { data } = useCollection<Page[]>('pages', { depth: 2 })
const pages = computed(() => unref(data)?.docs || [])

const currentPage = computed(() =>
  pages.value.find(p => p.slug === slug.value)
)

const fields = computed(() => currentPage.value?.fields)

const blocks = computed(() => fields.value?.blocks || [])
</script>

<template>
    <div>
        <template v-for="(block, blockIndex) in blocks" :key="blockIndex">
            <component :is="`blocks-${block.blockType}`" v-if="block.id" :key="block.id" :data="block" />
        </template>
    </div>
</template>
