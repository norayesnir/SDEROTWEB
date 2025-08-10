<script setup lang="ts">
import type { Projects } from "#payload/types";

interface CollectionResponse<T> {
    docs: T[];
}

const { data } = await useCollection<CollectionResponse<Projects>>('projects');

const projects = computed(() => data.value?.docs ?? []);
</script>

<template>
        <section class="relative py-20">
            <div class="container @container">
                <div class="flex flex-col @lg:grid justify-end grid-cols-12 gap-6">
                    <MoleculesProject v-for="project in projects" :key="project.id"
                        :project="project" class="col-span-6 @3xl:col-span-4" />
                </div>
            </div>
        </section>
</template>
