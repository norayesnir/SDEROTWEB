<script setup lang="ts">
defineProps<{ title: string, item: any }>();

// Expandable menu item
const expanded = ref(false);
const toggleExpand = () => {
    expanded.value = !expanded.value;
};

// Injecting the closeExpand function
const closeExpand = () => {
    expanded.value = false;
};
provide("closeExpand", closeExpand);
</script>

<template>
    <div class="relative">
        <div
class="flex items-center gap-1 px-2 py-1 font-normal transition-colors duration-200 rounded cursor-pointer text-font hover:border-b group"
            @click="toggleExpand">
            {{ title }}
            <Icon
name="material-symbols:expand-more" size="16"
                class="transition-transform duration-200 transform -rotate-90 group-hover:-rotate-45"
                :class="{ 'rotate-0': expanded }" />
        </div>

        <div
v-show="expanded"
            class="absolute w-max min-w-[186px] max-w-[256px] top-[calc(100%+16px)] p-4 bg-white border border-neutral-10 rounded z-10 [&>div>a]:w-full [&>div]:flex-col">
            <NavigationRoutes :routes="item.children" />
        </div>
    </div>
</template>
