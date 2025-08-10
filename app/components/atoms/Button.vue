<script setup lang="ts">
import type { Button } from "#payload/types";

const props = defineProps<Button>();

const routePrefix = {
    'projects': 'projecten',
    'news': 'nieuws'
}

const to = computed(() => {
    if (props.externalLink) return props.externalUrl
    else if (props.referenceToPage && props.referenceToPage?.relationTo !== 'pages') return `/${routePrefix[props.referenceToPage?.relationTo]}/${props.referenceToPage.value}`;
    else if (props.referenceToPage) return props.referenceToPage?.value.route
    return '';
})
</script>

<template>
    <NuxtLink :to="to" class="btn items-center flex gap-2 px-3 pb-1 pt-[5px] font-bold rounded cursor-pointer w-fit"
        :class="[
            props.colorGroup?.color ? `btn-${props.colorGroup.color}` : 'btn-priamry',
            props.typeGroup?.type ? `btn-${props.typeGroup.type}` : 'btn-filled',
            icon?.right ? 'flex-row-reverse' : 'flex-row',
        ]">
        <Icon :name="`material-symbols:${icon?.name}`" />
        {{ title }}
    </NuxtLink>
</template>
