<script setup lang="ts">
import { navigateTo } from '#app';

const { data, error, pending } = usePage();

const blocks = computed(() => data.value?.blocks);

watch(pending, (newPending) => {
  if (!newPending) {
    if (!data.value || !data.value.blocks || data.value.blocks.length === 0) {
      navigateTo('/404');
    }
  }
}, { immediate: true });
</script>

<template>
    <div>
        <Suspense>
            <ClientOnly>
                <template v-for="block in blocks" :key="block?.id">
                    <Component
                        :is="`blocks-${block?.blockType}`"
                        v-show="block?.blockType" 
                        :id="block?.id"
                        :data="block"
                    />
                </template>
            </ClientOnly>
            <template #fallback>
                Loading...
            </template>
        </Suspense>
    </div>
</template>
