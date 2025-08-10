<script setup lang="ts">
import type { Heading } from "#payload/types";

const props = defineProps<{
  heading?: Heading;
}>();

const { heading } = toRefs(props);
</script>

<template>
  <Component
    :is="heading.type || 'h2'"
    v-if="heading?.value"
    :class="heading.type || 'h2'"
    class="font-bold"
  >
    {{ heading.value }}
  </Component>
</template>
