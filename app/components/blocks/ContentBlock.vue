<script setup lang="ts">
	import type { ContentBlock } from "#payload/types";

	const props = defineProps<{
		data: ContentBlock;
	}>();

	const { data } = toRefs(props);
</script>

<template>
	<section
		class="relative py-20"
		:class="`bg-${data.backgroundColor?.replace('_', '-')}`"
	>
		<div class="container @container">
			<div class="@4xl:grid grid-cols-12">
				<div
					class="col-span-8 gap-6"
					:class="
						data.renderAsCard
							? `px-4 py-10 @4xl:px-10 @4xl:py-10 rounded-lg bg-${data.cardBackgroundColor?.replace('_', '-')} gap-10`
							: ''
					"
				>
					<MoleculesContent :content="data.content" />
				</div>
			</div>
		</div>
	</section>
</template>
