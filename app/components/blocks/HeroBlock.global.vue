<script setup lang="ts">
import type { HeroBlock } from "#payload/types";

const props = defineProps<{
  data: HeroBlock;
}>();

const { data } = toRefs(props);
</script>

<template>
  <section class="relative py-20 lg:py-[160px] overflow-hidden bg-black/20">
    <AtomsImage
      :image="data.image"
      class="absolute inset-0 object-cover w-full h-full -z-10"
    />
    <div class="container grid grid-cols-12 gap-6">
      <div class="col-span-12 md:col-span-6">
        <div class="flex flex-col-reverse mb-4 max-w-[756px]">
          <AtomsSubtitle
            :subtitle="data.content?.subtitle"
            class="!text-2xl font-medium drop-shadow text-primary-light"
          />
          <AtomsHeading
            :heading="data.content?.heading"
            class="!text-[56px] drop-shadow text-white"
          />
        </div>
        <div class="flex flex-col gap-4 drop-shadow">
          <div class="text-xl text-white">
            <AtomsRichText :content="data.content?.text" />
          </div>
          <MoleculesButtons :buttons="data.content?.buttons" />
        </div>
      </div>
    </div>
  </section>
</template>
