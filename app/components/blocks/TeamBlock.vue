<script setup lang="ts">
import type { TeamBlock, TeamMembers } from "#payload/types";

const props = defineProps<{
  data: TeamBlock;
}>();

const { data } = toRefs(props);

const members = data.value?.members as TeamMembers[];
</script>

<template>
  <section class="relative py-20">
    <div class="@container container">
      <div class="flex flex-col gap-6">
        <MoleculesContent :content="data.content" />

        <div class="flex flex-col @3xl:grid grid-cols-12 gap-6 gap-y-20">
          <MoleculesMember
            v-for="member in members"
            :key="member.id"
            :member="member"
            class="col-span-12 @3xl:col-span-4"
          />
        </div>
      </div>
    </div>
  </section>
</template>
