<script setup lang="ts">
const props = defineProps<{
  title: string;
  description: string;
}>();
</script>

<template>
  <div>
    <h1>{{ props.title }}</h1>
    <p>{{ props.description }}</p>
  </div>
</template>
