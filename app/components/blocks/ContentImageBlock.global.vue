<script setup lang="ts">
	import type { ContentImageBlock } from "#payload/types";

	const props = defineProps<{
		data: ContentImageBlock;
	}>();

	const { data } = toRefs(props);
</script>

<template>
	<section
		class="relative py-20"
		:class="`bg-${data.backgroundColor?.replace('_', '-')}`"
	>
		<div class="@container container" :class="`text-${data.textColor}`">
			<div
				class="flex flex-col flex-wrap @3xl:grid items-center grid-cols-12 gap-6"
				:class="
					data.renderAsCard
						? `px-4 py-10 @4xl:px-10 @4xl:py-10 rounded-lg bg-${data.cardBackgroundColor?.replace('_', '-')} gap-10`
						: ''
				"
			>
				<div
					class="col-span-5"
					:class="[
						data.order === 'reversed' ? 'col-start-8' : '',
						data.orientation === 'vertical'
							? 'col-span-8 !col-start-1'
							: '',
						data.renderAsCard ? '!col-span-6' : '',
					]"
				>
					<MoleculesContent :content="data.content" />
				</div>

				<div
					class="col-span-6"
					:class="[
						data.order === 'reversed'
							? 'col-start-1 -order-1'
							: 'col-start-7',
						data.orientation === 'vertical'
							? 'col-span-8 !col-start-1'
							: '',
					]"
				>
					<AtomsImage
						:image="data.image"
						class="object-cover w-full rounded-lg"
					/>
				</div>
			</div>
		</div>
	</section>
</template>
