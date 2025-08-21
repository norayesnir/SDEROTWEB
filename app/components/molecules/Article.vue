<script setup lang="ts">
import type { Article } from "#payload/types";

const props = defineProps<Article>();

const baseUrl = useCmsUrl();

const { data: article } = await useAsyncData(`article-${props.id}`, () => $fetch(`${baseUrl}/articles/${props.id}`));

const formattedDate = computed(() => {
    const options: Intl.DateTimeFormatOptions = {
        weekday: "short",
        day: "2-digit",
        month: "short",
    };
    return new Date(article.value.createdAt).toLocaleDateString("nl-NL", options);
});

const dateLabel: Categories = {
    color: "primary",
    icon: { name: "calendar-month", right: null, replace: (args) => args },
    label: formattedDate.value,
    type: "filled",
    id: 0,
    updatedAt: "",
    createdAt: "",
};

const labels = computed(() => {
    return [dateLabel, ...(article.value?.categories ?? [])];
});
</script>

<template>
    <li>
        <NuxtLink v-if="article.id" :id="article.id" :to="`/${article.blog.slug}/${article.slug}`">
            <article
                class="@container relative overflow-hidden flex flex-col-reverse justify-end group pb-4 hover:pb-[14px] hover:border-b-2 border-primary">
                <header>
                    <div class="my-4">
                        <h1 class="text-base !text-2xl !leading-tight line-clamp-2">
                            {{ article.title }}
                        </h1>
                    </div>
                    <p class="line-clamp-2">{{ article.excerpt }}</p>
                    <div class="flex items-center gap-2 text-primary w-fit mt-4">
                        <span>Read more</span>
                        <Icon name="material-symbols:arrow-forward" />
                    </div>
                </header>
                <div class="absolute p-1 transition-all bg-white rounded -right-12 -top-12 group-hover:right-4 group-hover:top-4"
                    aria-hidden="true">
                    <Icon name="material-symbols:north-east" size="32" />
                </div>
                <figure class="flex flex-col gap-2 mb-2 @xs:mb-4 overflow-hidden">
                    <AtomsImage :image="article.featuredImage"
                        class="w-auto h-[172px] @xs:h-[237px] object-cover rounded" alt="Featured image" />
                    <figcaption class="hidden">
                        {{ article.featuredImage?.description }}
                    </figcaption>

                    <div class="relative h-6 overflow-hidden">
                        <div class="absolute top-0 right-0 z-10 w-8 h-full bg-gradient-to-l to-transparent" />

                        <div class="absolute top-0 left-0 flex items-center gap-2 capitalize w-max">
                            <template v-for="label in labels" :key="label.id">
                                <AtomsLabel :data="label" />
                            </template>
                        </div>
                    </div>
                </figure>
            </article>
        </NuxtLink>
    </li>
</template>
