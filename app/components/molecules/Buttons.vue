<script setup lang="ts">
	import type { Button } from "#payload/types";

	const props = defineProps<{
		buttons: Button[];
	}>();

	const { buttons } = toRefs(props);
</script>

<template>
	<div class="flex gap-4">
        <template v-for="(button, buttonIndex) in buttons" :key="buttonIndex">
		    <AtomsButton
                v-if="button.id"
                v-bind="button"
		    />
        </template>
	</div>
</template>
