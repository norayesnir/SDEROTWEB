<script setup lang="ts">
import type { News } from "#payload/types";

interface CollectionResponse<T> {
    docs: T[];
}

const { data } = await useCollection<CollectionResponse<News>>('news');

const articles = computed(() => data.value?.docs ?? []);
</script>

<template>
        <section class="relative py-20">
            <div class="container @container">
                <ul class="flex flex-col @lg:grid justify-end grid-cols-12 gap-6">
                    <MoleculesArticle v-for="article in articles" :key="article.id" :article="article"
                        class="col-span-6 @3xl:col-span-4" />
                </ul>
            </div>
        </section>
</template>
