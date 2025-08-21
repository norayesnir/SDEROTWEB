<script setup lang="ts">
const { data } = await useArticles();

const articles = ref(data.value?.docs)
</script>

<template>
    <section class="relative py-20">
        <div class="container @container">
            <ul v-if="articles" class="flex flex-col @lg:grid justify-end grid-cols-12 gap-6">
                <MoleculesArticle v-for="article in articles" :key="article.id" v-bind="article"
                    class="col-span-6 @3xl:col-span-4" />
            </ul>
        </div>
    </section>
</template>
