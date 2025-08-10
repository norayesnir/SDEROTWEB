<script setup lang="ts">
import type { News } from "#payload/types";

const route = useRoute();
const id = ref(route.params.id as string);

const isError = ref(false);
const errorMessage = ref('');
const pending = ref(true);
let articleData: News | null = null;
let articleBlocks: any[] = [];

if (id.value) {
  try {
    const { data: articleResponse, error: fetchError } = await useCollection<News>('news', { id: id.value });

    pending.value = false;

    if (fetchError.value || !articleResponse.value) {
      isError.value = true;
      errorMessage.value = fetchError.value?.message || 'Article not found';
      if (import.meta.server) console.error(`[Prerender /nieuws/${id.value}] Fetch error: ${fetchError.value?.message || 'No data'}`);
    } else {
      articleData = articleResponse.value;
      articleBlocks = articleResponse.value?.blocks ?? [];
    }
  } catch (err) {
    pending.value = false;
    isError.value = true;
    errorMessage.value = 'Unexpected error loading article';
    if (import.meta.server) console.error(`[Prerender /nieuws/${id.value}] Unexpected error: ${err.message}`);
  }
} else {
  pending.value = false;
  isError.value = true;
  errorMessage.value = 'Article ID not provided';
}
</script>

<template>
  <div>
    <div v-if="pending" class="loading">Loading...</div>
    <div v-else-if="isError" class="error">{{ errorMessage }}</div>
    <template v-else>
      <OrganismsArticleHero :data="articleData" />
      <template v-for="block in articleBlocks" :key="block.id">
        <Component :is="`blocks-${block.blockType}`" :data="block" />
      </template>
    </template>
  </div>
</template>

