<script setup lang="ts">
import type { Article } from '#payload/types';

defineProps<{ articles: Article[], bgColor?: string, blogSlug: string }>();
</script>

<template>
    <section class="relative py-20">
        <div class="container @container">
            <ul v-if="articles" class="flex flex-col @lg:grid justify-end grid-cols-12 gap-6">
                <MoleculesArticle v-for="article in articles" :key="article.id" :article="article" :bgColor="bgColor" :blogSlug="blogSlug"
                    class="col-span-6 @3xl:col-span-4" />
            </ul>
        </div>
    </section>
</template>
