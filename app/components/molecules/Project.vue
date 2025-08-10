<script setup lang="ts">
import type { Projects, Categories } from "#payload/types";

const props = defineProps<{
  project: Projects;
  bgColor?: string;
}>();

const project = ref(props.project);

const formattedDate = computed(() => {
  const options: Intl.DateTimeFormatOptions = {
    weekday: "short",
    day: "2-digit",
    month: "short",
  };
  return new Date(project.value.createdAt).toLocaleDateString("nl-NL", options);
});

const dateLabel: Categories = {
  color: "primary",
  icon: { name: "calendar-month", right: null, replace: (args) => args },
  label: formattedDate.value,
  type: "filled",
  id: 0,
  updatedAt: "",
  createdAt: "",
};

const labels = computed(() => {
  return [dateLabel, ...(project.value?.categories ?? [])];
});
</script>

<template>
  <NuxtLink v-if="project.id" :id="project.id" :to="`/projecten/${project.id}`">
    <article
      class="@container relative overflow-hidden flex flex-col-reverse justify-end group pb-4 hover:pb-[14px] hover:border-b-2 border-primary"
    >
      <header>
        <div class="my-4">
          <h1 class="text-base !text-2xl !leading-tight line-clamp-2">
            {{ project.title }}
          </h1>
        </div>
        <div class="flex items-center gap-2 text-primary w-fit">
          <span>Read more</span>
          <Icon name="material-symbols:arrow-forward" />
        </div>
      </header>
      <div
        class="absolute p-1 transition-all bg-white rounded -right-12 -top-12 group-hover:right-4 group-hover:top-4"
        aria-hidden="true"
      >
        <Icon name="material-symbols:north-east" size="32" />
      </div>
      <figure class="flex flex-col gap-2 mb-2 @xs:mb-4 overflow-hidden">
        <AtomsImage
          :image="project.featuredImage"
          class="w-auto h-[172px] @xs:h-[237px] object-cover rounded"
          alt="Featured image"
        />
        <figcaption class="hidden">
          {{ project.featuredImage?.description }}
        </figcaption>

        <div class="relative h-6 overflow-hidden">
          <div
            class="absolute top-0 right-0 z-10 w-8 h-full bg-gradient-to-l to-transparent"
            :class="
              bgColor && bgColor.length ? `from-${bgColor}` : 'from-white'
            "
          />

          <div
            class="absolute top-0 left-0 flex items-center gap-2 capitalize w-max"
          >
            <template v-for="label in labels" :key="label.id">
              <AtomsLabel :data="label" />
            </template>
          </div>
        </div>
      </figure>
    </article>
  </NuxtLink>
</template>
