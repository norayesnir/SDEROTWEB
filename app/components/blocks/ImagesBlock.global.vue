<script setup lang="ts">
	import type { ImagesBlock } from "#payload/types";

	const props = defineProps<{
		data: ImagesBlock;
	}>();

	const { data } = toRefs(props);
</script>

<template>
	<section
		class="relative py-20"
		:class="`bg-${data.iBackgroundColor?.replace('_', '-')}`"
	>
		<div
			class="@container container grid grid-cols-12"
			:class="`text-${data.iTextColor}`"
		>
			<div
				class="flex flex-col col-span-12 gap-6"
				:class="[
					data.iRenderAsCard
						? `px-4 py-10 @4xl:px-10 @4xl:py-10 rounded-lg bg-${data.iCardBackgroundColor?.replace('_', '-')} gap-10`
						: '',
					data.images && data.images.length === 1 ? '@4xl:col-span-8' : '',
				]"
			>
				<MoleculesContent :content="data.content" />

				<div class="grid grid-cols-12 gap-6">
					<AtomsImage
						v-for="image in data.images"
						:image="image.image"
						class="min-w-[calc(33%-12px)] rounded-lg w-full col-span-12"
						:class="[
							data.images && data.images.length === 2
								? '@3xl:col-span-6'
								: '',
							data.images && data.images.length >= 3
								? '@3xl:col-span-4'
								: '',
						]"
					/>
				</div>
			</div>
		</div>
	</section>
</template>
