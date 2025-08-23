import { defineStore } from 'pinia';
import type { BlogFetchResponse } from '../composables/fetchPages';

export const useBlogsStore = defineStore('blogs', {
  state: () => ({ blogs: [] as BlogFetchResponse[] }),
  actions: {
    setBlogs(newBlogs: BlogFetchResponse[]) {
      if (JSON.stringify(this.blogs) !== JSON.stringify(newBlogs)) {
        this.blogs = newBlogs;
      }
    }
  }
});
