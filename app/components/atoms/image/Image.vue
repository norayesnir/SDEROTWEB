<script setup lang="ts">
import type { AtomsImageProps } from "./types";
import { useElementBounding } from "@vueuse/core";

const props = withDefaults(defineProps<AtomsImageProps>(), {
  lazy: false,
  sizes: () => ({
    default: "100vw",
  }),
});

const config = useRuntimeConfig();

const image = useRelationshipField(toRef(props, "image"));

const root = ref<HTMLImageElement | null>(null);
const emit = defineEmits(["load"]);
const hasLoaded = ref(false);
const isPreloading = ref(!props.lazy);

const onLoad = () => {
  hasLoaded.value = true;
  emit("load");
};

onMounted(() => {
  const { top } = useElementBounding(root.value);

  watchEffect(() => {
    if (props.lazy && !isPreloading.value && top.value) {
      isPreloading.value =
        hasLoaded.value || top.value < window.innerHeight * 2;
    }
  });

  if (!props.lazy && root.value?.complete) {
    onLoad();
  }
});
</script>

<template>
  <NuxtImg
    v-if="image"
    ref="root"
    class="block transition-opacity duration-500"
    :class="hasLoaded || !props.lazy ? '' : 'opacity-0'"
    :src="`${config.public.payloadServerUrl}${image.url}`"
    :alt="image.description || ''"
    @load="onLoad"
  />
</template>
