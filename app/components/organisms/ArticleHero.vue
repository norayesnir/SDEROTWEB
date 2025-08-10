<script setup lang="ts">
const props = defineProps<{
  data: any;
}>();

const { data } = toRefs(props);

const title = toRef({
  value: data.value.title,
  type: "h1",
});
</script>

<template>
  <section class="relative py-20 overflow-hidden bg-black/20">
    <AtomsImage
      v-if="data?.featuredImage"
      :image="data.featuredImage"
      class="absolute inset-0 object-cover w-full -z-10"
    />
    <div class="container grid grid-cols-12 gap-6">
      <div class="col-span-12 md:col-span-8">
        <div class="flex flex-col-reverse mb-4 max-w-[756px]">
          <AtomsHeading
            v-if="data.title"
            :heading="title"
            class="!text-[56px] drop-shadow text-white"
          />
        </div>
        <div v-if="data?.excerpt" class="flex flex-col gap-4 drop-shadow">
          <div class="text-xl text-white">
            <p class="line-clamp-5">{{ data.excerpt }}</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
