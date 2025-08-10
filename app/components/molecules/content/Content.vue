<script setup lang="ts">
	const props = defineProps<{
		content?: any;
	}>();

	const { content } = toRefs(props);
</script>

<template>
	<div class="flex flex-col gap-4 max-w-[736px]">
		<div class="flex flex-col">
			<AtomsSubtitle
				v-if="content?.subtitle && content?.subtitle.length"
				:subtitle="content?.subtitle"
			/>
			<AtomsHeading
				v-if="content?.heading.value && content?.heading.value.length"
				:heading="content?.heading"
			/>
		</div>
		<AtomsRichText :content="content?.text" />
		<MoleculesButtons
			v-if="content?.buttons && content?.buttons.length"
			:buttons="content?.buttons"
		/>
	</div>
</template>
