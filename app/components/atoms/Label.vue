<script setup lang="ts">
	import type { Categories } from "#payload/types";

	const props = defineProps<{
		data: Categories;
	}>();

	const category = ref(props.data);

	const labelVariant = computed(() => {
		const color = category.value.color;
		switch (category.value.type) {
			case "filled":
				return `bg-${color}/5 hover:bg-${color}-dark/5`;
			case "outlined":
				return `outline outline-${color} -outline-offset-1 text-${color} hover:bg-${color}/5`;
			case "link":
				return `text-${color} hover:text-${color}-dark`;
			case "ghost":
				return `text-${color} hover:bg-${color}/5`;
			default:
				return `bg-${color}/5 hover:bg-${color}-dark/5`;
		}
	});
</script>

<template>
	<div
		v-if="category.label"
		class="flex items-center gap-1 px-2 py-1 rounded bg-primary/5 w-fit"
		:class="labelVariant"
	>
		<Icon
			v-if="category.icon"
			:name="`${category.icon?.name?.replace(/[\s\-_]+/g, '-')}`"
			class="text-primary"
		/>
		<span class="text-xs">{{ category.label }}</span>
	</div>
</template>
