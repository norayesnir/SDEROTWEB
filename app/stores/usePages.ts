import { defineStore } from 'pinia';
import type { PagesFetchResponse } from '../composables/fetchPages';

export const usePagesStore = defineStore('pages', {
  state: () => ({ pages: [] as PagesFetchResponse[] }),
  actions: {
    setPages(newPages: PagesFetchResponse[]) {
      if (JSON.stringify(this.pages) !== JSON.stringify(newPages)) {
        this.pages = newPages;
      }
    }
  }
});
