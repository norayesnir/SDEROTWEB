<script lang="ts" setup>
import type { MenuItem } from "#payload/types";
import { useNavigationMenuStore } from "~/stores/useNavigationMenu";

defineProps<{ routes: MenuItem[] }>();

const navigationMenuStore = useNavigationMenuStore();
</script>

<template>
    <div class="flex gap-4" :class="navigationMenuStore.state ? 'flex-col mb-4' : 'items-center'">
        <NavigationMenuItem v-for="(route, routeIndex) in routes" v-bind="route" :key="routeIndex" />
    </div>
</template>
