<script setup lang="ts">
const { data } = usePage();

const blocks = computed(() => data.value?.blocks);
</script>

<template>
    <div>
        <template v-for="block in blocks" :key="block?.id">
            <component :is="`blocks-${block?.blockType}`" v-if="block?.blockType" :data="block" />
        </template>
    </div>
</template>
