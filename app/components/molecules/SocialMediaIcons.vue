<script setup lang="ts">
import type { GlobalSettings } from "#payload/types";

const { data: globals } = useGlobal<GlobalSettings>('global-settings')

const globalSettings = globals.value?.GlobalSetting;

// NOTE: New 𝕏 logo hardcoded because there is no support for it yet
const socialMedia =
  globalSettings?.socialMedia?.socials?.map((social) => ({
    ...social,
    icon: social?.platform === "x" ? "𝕏" : "bxl:" + social?.platform,
  })) || [];
</script>

<template>
  <div class="flex items-center gap-4">
    <template v-for="social in socialMedia" :key="social?.id">
      <a
        v-if="social.url"
        :href="social.url"
        target="_blank"
        rel="noopener noreferrer"
      >
        <Icon :name="social.icon" size="24" class="text-lg text-white" />
        <span class="sr-only">{{ social?.platform }} Icon</span>
      </a>
    </template>
  </div>
</template>
