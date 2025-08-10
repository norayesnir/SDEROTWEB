<script setup lang="ts">
	import type { ContentArticleBlock, News } from "#payload/types";

	const props = defineProps<{
		data: ContentArticleBlock;
	}>();
	const { data } = toRefs(props);

	const articleRendererParams = {
		limit: 2,
		renderBy: data.value.caRenderBy,
		categories: data.value.caCategories.map((category) => category.id),
		custom: data.value.caCustom.map((article) => article.slug),
	};

	const articles = ref<News[]>([]);

	try {
		const result = await useArticleRenderer(articleRendererParams);
		if (result instanceof Error) {
			throw result;
		} else {
			articles.value = result.value;
		}
	} catch (error) {
		console.error(error);
	}
</script>

<template>
	<section class="relative py-20">
		<div class="@container container">
			<div class="flex flex-col @4xl:grid grid-cols-12 gap-6">
				<MoleculesContent :content="data.content" class="col-span-5" />

				<div
					class="flex flex-col @lg:grid grid-cols-6 col-span-6 col-start-7 gap-6"
				>
					<template v-for="article in articles" :key="article.id">
						<MoleculesArticle
							v-if="article"
							:article="article"
							:bg-color="
								data.fnCardBackgroundColor || data.fnBackgroundColor
							"
							class="col-span-3"
						/>
					</template>
				</div>
			</div>
		</div>
	</section>
</template>
