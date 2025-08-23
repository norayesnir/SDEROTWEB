<script setup lang="ts">
import type { Page, Blog, MenuItem } from '#payload/types';
import { useNavigationMenuStore } from "../../stores/useNavigationMenu";
const navigationMenuStore = useNavigationMenuStore();

interface MenuItemDefault {
    /**
     * Check this box if the link is external
     */
    externalLink?: boolean | null;
    referenceToPage?:
      | ({
          relationTo: 'pages';
          value: number | Page;
        } | null)
      | ({
          relationTo: 'blogs';
          value: number | Blog;
        } | null);
    externalUrl?: string | null;
    /**
     * Check this box if the link should open in a new tab
     */
    newTab?: boolean | null;
    icon?: {
      icon?: string | null;
      right?: boolean | null;
    };
}

interface MenuItemDefaultProps {
    item: MenuItemDefault
    title: string
}

defineProps<MenuItemDefaultProps>();

const closeExpand = inject<() => void>("closeExpand", () => {});
</script>

<template>
  <a
    v-if="item.externalLink"
    class="flex items-center gap-1 px-2 py-1 font-normal transition-colors duration-200 rounded w-fit text-font hover:bg-neutral-5"
    :href="item.externalUrl"
  >
    {{ title }}
    <Icon name="material-symbols:open-in-new" size="12" />
  </a>

  <NuxtLink
    v-else-if="item.referenceToPage.value.route"
    class="flex gap-1 px-2 py-1 w-fit transition-colors duration-200 text-font font-normal border-black hover:pb-[2px] hover:border-b-2 has-[.router-link-active]:border-b-1 has-[.router-link-active]:pb-[2px]"
    :to="item.referenceToPage.value.route"
    @click="[closeExpand, navigationMenuStore.close()]"
  >
    <Icon
      v-if="item.icon.name"
      class="mt-[3px]"
      :name="
        'material-symbols:' +
        item.icon.name.replace(/_/g, '-') +
        '-outline-rounded'
      "
    />
    {{ title }}
    <span class="sr-only">{{ title }} Route</span>
  </NuxtLink>
</template>
