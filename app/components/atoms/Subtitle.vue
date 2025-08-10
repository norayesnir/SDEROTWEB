<script setup lang="ts">
	const props = defineProps<{
		subtitle?: string | null;
	}>();
</script>

<template>
	<h4
		v-if="props.subtitle"
		class="text-base font-medium leading-tight subtitle text-primary"
	>
		{{ props.subtitle }}
	</h4>
</template>
