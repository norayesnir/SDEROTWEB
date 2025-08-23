<script setup lang="ts">
import type { RichTextBlock } from "#payload/types";

const props = defineProps<{
  data: RichTextBlock;
}>();

const { data } = toRefs(props);
</script>

<template>
  <section class="relative py-20">
    <div class="container @container">
      <div class="@4xl:grid grid-cols-12 gap-6">
        <div class="col-span-8">
          <AtomsRichText :content="data.richText" />
        </div>
      </div>
    </div>
  </section>
</template>
