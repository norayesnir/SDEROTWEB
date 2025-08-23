<script setup lang="ts">
	import type { ContentContactBlock } from "#payload/types";

	const props = defineProps<{
		data: ContentContactBlock;
	}>();

	const { data } = toRefs(props);
</script>

<template>
	<section
		class="relative py-20"
		:class="`bg-${data.ccobackgroundColor?.replace('_', '-')}`"
	>
		<div class="@container container" :class="`text-${data.ccoTextColor}`">
			<div
				class="flex flex-col @4xl:grid @4xl:items-center grid-cols-12 gap-6"
				:class="
					data.ccoRenderAsCard
						? `px-4 py-10 @4xl:px-10 @4xl:py-10 rounded-lg bg-${data.ccoCardBgColor?.replace('_', '-')} gap-10`
						: ''
				"
			>
				<div
					class="col-span-5"
					:class="[
						data.ccoOrder === 'reversed' ? 'col-start-8' : '',
						data.ccoOrientation === 'vertical'
							? 'col-span-8 !col-start-1'
							: '',
						data.ccoRenderAsCard ? '!col-span-6' : '',
					]"
				>
					<MoleculesContent :content="data.content" />
				</div>

				<div
					class="col-span-6"
					:class="[
						data.ccoOrder === 'reversed'
							? 'col-start-1 -order-1'
							: 'col-start-7',
						data.ccoOrientation === 'vertical'
							? 'col-span-8 !col-start-1'
							: '',
					]"
				>
					<MoleculesContact :textColor="data.ccoTextColor" />
				</div>
			</div>
		</div>
	</section>
</template>
