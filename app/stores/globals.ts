import { defineStore } from "pinia";

import type { GlobalSettings } from "#payload/types";
import { GetGlobalsDocument } from "@/graphql";

interface GlobalQueryResult {
  Settings: GlobalSettings;
}

export const useGlobalsStore = defineStore("globals", () => {
  const settings = ref<GlobalSettings | null>(null);

  function load() {
    return useAsyncQuery<GlobalQueryResult>(GetGlobalsDocument).then(
      ({ data }) => {
        settings.value = data.value?.Settings || null;
      },
    );
  }

  return {
    settings,
    load,
  };
});
