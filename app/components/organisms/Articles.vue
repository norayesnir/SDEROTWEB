<script setup lang="ts">
import type { News } from "#payload/types";

interface CollectionResponse<T> {
    docs: T[];
}

const config = useRuntimeConfig();
const apiUrl = `${config.public.payloadServerUrl}/api/news`;

const route = useRoute();
const { data, pending, refresh } = useAsyncData(`news-${route.path}`, async () => {
  const response = await $fetch<CollectionResponse<News>>(apiUrl, { cache: 'no-store' });
  return { docs: response.docs };
}, { immediate: true, server: false });

const news = computed(() => data.value?.docs ?? []);
const articles = computed(() => news.value);

// Force refetch on navigation
watch(() => route.path, () => refresh(), { immediate: true });
</script>

<template>
  <ClientOnly>
    <section v-if="!pending" class="relative py-20">
      <div class="container @container">
        <ul v-if="articles.length" class="flex flex-col @lg:grid justify-end grid-cols-12 gap-6">
          <MoleculesArticle v-for="article in articles" :key="article.id" :article="article"
            class="col-span-6 @3xl:col-span-4" />
        </ul>
        <p v-else>No articles found.</p>
      </div>
    </section>
    <div v-else>Loading...</div>
  </ClientOnly>
</template>
