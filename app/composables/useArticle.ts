import { useRoute } from 'vue-router';
import { useArticlesStore } from '~/stores/useArticles';
import { useFetchArticles } from '~/composables/fetchArticles';
import type { Article } from '#payload/types';

export const useArticle = (customBlogSlug?: string, customArticleSlug?: string) => {
  const route = useRoute();
  const blogSlug = customBlogSlug || (route.params.blog as string || '');
  const articleSlug = customArticleSlug || (Array.isArray(route.params.article) ? route.params.article.join('/') : (route.params.article as string || ''));
  const store = useArticlesStore();
  const { error, pending } = useFetchArticles();

  const article = computed(() => store.articles.find(a => a.slug === articleSlug && a.blog?.slug === blogSlug));

  watch(store.articles, () => console.log('Article:', article.value?.slug), { immediate: true });

  return { article, error, pending };
};
