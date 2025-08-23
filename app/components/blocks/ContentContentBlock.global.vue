<script setup lang="ts">
	import type { ContentContentBlock } from "#payload/types";

	const props = defineProps<{
		data: ContentContentBlock;
	}>();

	const { data } = toRefs(props);
</script>

<template>
	<section
		class="relative py-20"
		:class="`bg-${data.ccBackgroundColor?.replace('_', '-')}`"
	>
		<div class="@container container" :class="`text-${data.ccTextColor}`">
			<div
				class="flex flex-col flex-wrap @3xl:grid items-start grid-cols-12 gap-6"
				:class="
					data.ccRenderAsCard
						? `px-4 py-10 @4xl:px-10 @4xl:py-10 rounded-lg bg-${data.ccCardBgColor?.replace('_', '-')} gap-10`
						: ''
				"
			>
				<template v-if="data.cl?.subtitle || data.cl?.heading">
					<div
						:class="[
							(data.cr?.subtitle && data.cr?.subtitle.length) ||
							(data.cr?.heading && data.cr?.heading.length)
								? 'col-span-6 @4xl:col-span-5'
								: 'col-span-8',
							data.ccOrientation === 'vertical' ? '!col-span-8' : '',
						]"
					>
						<AtomsSubtitle :subtitle="data.cl?.subtitle" />
						<AtomsHeading :heading="data.cl?.heading" />
					</div>
				</template>
				<div
					class="flex flex-col row-start-2 gap-4 mb-10 @4xl:mb-0"
					:class="[
						data.ccOrientation === 'vertical'
							? 'col-span-8 !col-start-1'
							: 'col-span-6 @4xl:col-span-5',
					]"
				>
					<AtomsRichText :content="data.cl?.text" />
					<MoleculesButtons :buttons="data.cl?.buttons" />
				</div>

				<template
					v-if="
						(data.cr?.subtitle && data.cr?.subtitle.length) ||
						(data.cr?.heading && data.cr?.heading.length)
					"
				>
					<div
						class="col-span-6 col-start-7 @4xl:col-span-5 @4xl:col-start-8"
						:class="data.ccOrientation === 'vertical' ? '!col-span-8' : ''"
					>
						<AtomsSubtitle :subtitle="data.cr?.subtitle" />
						<AtomsHeading :heading="data.cr?.heading" />
					</div>
				</template>
				<div
					class="flex flex-col gap-4"
					:class="[
						data.ccOrientation === 'vertical'
							? 'col-span-8 !col-start-1'
							: 'col-span-6 col-start-7 @4xl:col-span-5 @4xl:col-start-8',
					]"
				>
					<AtomsRichText :content="data.cr?.text" />
					<MoleculesButtons :buttons="data.cr?.buttons" />
				</div>
			</div>
		</div>
	</section>
</template>
