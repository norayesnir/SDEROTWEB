<script setup lang="ts">
	import type { FeaturedNewsBlock, News } from "#payload/types";

	const props = defineProps<{
		data: FeaturedNewsBlock;
	}>();
	const { data } = toRefs(props);

	const articleRendererParams = {
		limit: 4,
		renderBy: data.value.renderBy,
		categories: data.value.categories.map((category) => category.id) ?? [],
		custom: data.value.custom.map((article) => article.slug) ?? [],
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
	<section
		class="relative py-20"
		:class="`bg-${data.fnBackgroundColor?.replace('_', '-')}`"
	>
		<div class="@container container" :class="`text-${data.fnTextColor}`">
			<div
				:class="
					data.fnRenderAsCard
						? `px-4 py-10 @4xl:px-10 @4xl:py-10 rounded-lg bg-${data.fnCardBackgroundColor?.replace('_', '-')} gap-10`
						: ''
				"
			>
				<div
					class="flex items-center justify-between gap-6 mb-6"
					:class="data.fnRenderAsCard ? '!col-span-6' : ''"
				>
					<MoleculesContent
						:content="{
							subtitle: data.content?.subtitle,
							heading: {
								type: data.content?.heading?.type,
								value: data.content?.heading?.value,
							},
							text: data.content?.text,
						}"
					/>

					<MoleculesButtons :buttons="data.content?.buttons" />
				</div>

				<div class="flex flex-col @lg:grid grid-cols-12 gap-6">
					<template v-for="article in articles" :key="article.id">
						<MoleculesArticle
							class="@lg:col-span-6 @4xl:col-span-3"
							:article="article"
							:bg-color="
								data.fnCardBackgroundColor || data.fnBackgroundColor
							"
						/>
					</template>
				</div>
			</div>
		</div>
	</section>
</template>
