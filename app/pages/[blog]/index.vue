<script setup lang="ts">
definePageMeta({
    key: (route) => route.params.blog || 'default'
})

const { data } = usePage();

const blocks = computed(() => data.value.blocks ?? [])
</script>

<template>
    <div>
        <template v-if="blocks.length">
            <template v-for="block in blocks" :key="block?.id">
                <component :is="`blocks-${block?.blockType}`" :data="block" />
            </template>
        </template>

        <OrganismsArticles />
    </div>
</template>
