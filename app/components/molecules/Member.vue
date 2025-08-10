<script setup lang="ts">
import type { TeamMembers } from "#payload/types";

const props = defineProps<{
  member: TeamMembers;
}>();

const { member } = toRefs(props);
</script>

<template>
  <article class="flex flex-col gap-4">
    <figure class="relative overflow-hidden">
      <AtomsImage
        :image="member.image"
        class="object-cover w-full h-full rounded-lg"
      />
    </figure>

    <section>
      <header>
        <h3 class="text-2xl font-semibold leading-none">{{ member.name }}</h3>
        <p class="mt-2 text-primary">{{ member.role }}</p>
      </header>
      <div v-if="member.introduction" class="text-sm text-neutral-500 mt-4">
        <AtomsRichText :content="member.introduction" />
      </div>
    </section>
  </article>
</template>
