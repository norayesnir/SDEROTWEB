<script lang="ts" setup>
import type { MenuItem } from "#payload/types";

defineProps<MenuItem>();
</script>

<template>
	<NavigationMenuItemDefault
		v-if="template === 'Default'"
        :title="title"
        :item="default"
	/>
	<NavigationMenuItemExpandable
		v-else-if="template === 'Expandable'"
		:title="title"
        :item="expandable"
	/>
</template>
