<script setup lang="ts">
import { navigateTo } from '#app';

const route = useRoute();
const blogSlug = route.params.blog as string;
const articleSlug = Array.isArray(route.params.article) ? route.params.article.join('/') : route.params.article;
const fullSlug = `${blogSlug}/${articleSlug}`;

const { article, pending, error } = useArticle();
const { data: page } = usePage(fullSlug);

watch(pending, (newPending) => {
  if (!newPending) {
    if (article.value) {
      if (!article.value.blocks?.length) navigateTo('/404'); // If needed
    } else if (page.value) {
      // Render as page
    } else {
      navigateTo('/404');
    }
  }
}, { immediate: true });
</script>

<template>
  <div v-if="article">
    <ClientOnly>
      <template v-for="block in article.blocks" :key="block.id">
        <Component :is="`blocks-${block.blockType}`" :data="block" />
      </template>
    </ClientOnly>
  </div>
  <div v-else-if="page">
    <!-- Existing page render -->
    <ClientOnly>
      <template v-for="block in page.blocks" :key="block.id">
        <Component :is="`blocks-${block.blockType}`" :data="block" />
      </template>
    </ClientOnly>
  </div>
</template>
