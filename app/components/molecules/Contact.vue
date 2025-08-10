<script setup lang="ts">
import type { GlobalSettings } from "#payload/types";

const props = defineProps<{
  textColor?: string;
}>();

const { data } = useGlobal<GlobalSettings>('global-settings');
</script>

<template>
  <div class="grid grid-cols-6 gap-6">
    <div class="grid grid-cols-[18px_1fr] gap-2 col-span-3 items-center">
      <Icon name="material-symbols:mail-outline" size="18" />
      <h6 class="text-base font-semibold">Email</h6>
      <a
        :href="`mailto:${data.contactInformation.email}`"
        class="col-start-2 border-b-2 w-fit"
        :class="`border-b-${props.textColor ?? 'black'}`"
        >{{ data.contactInformation.email }}</a
      >
    </div>
  </div>
</template>
