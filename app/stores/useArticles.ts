import { defineStore } from 'pinia';
import type { ArticlesFetchResponse } from '../composables/fetchPages';

export const useArticlesStore = defineStore('articles', {
  state: () => ({ articles: [] as ArticlesFetchResponse[] }),
  actions: {
    setBlogs(newArticles: ArticlesFetchResponse[]) {
      if (JSON.stringify(this.articles) !== JSON.stringify(newArticles)) {
        this.articles = newArticles;
      }
    }
  }
});
