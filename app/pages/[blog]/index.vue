<script setup lang="ts">
import { navigateTo } from '#app';

const route = useRoute();
const slug = route.params.blog as string;

const { blog, articles, pending, error } = useBlog();
const { data: page } = usePage(slug);

watch(pending, (newPending) => {
  if (!newPending) {
    if (blog.value) {
      // Stay for archive
      if (!blog.value.blocks?.length) navigateTo('/404');
    } else if (page.value) {
      // Render as page (use existing logic)
    } else {
      navigateTo('/404');
    }
  }
}, { immediate: true });
</script>

<template>
    <ClientOnly>
  <div v-if="blog">
      <template v-for="block in blog.blocks" :key="block.id">
        <Component :is="`blocks-${block.blockType}`" :data="block" />
      </template>
    <OrganismsArticles :articles="articles" :blogSlug="slug" />
  </div>
  <div v-else-if="page">
      <template v-for="block in page.blocks" :key="block.id">
        <Component :is="`blocks-${block.blockType}`" :data="block" />
      </template>
  </div>
    </ClientOnly>
</template>
