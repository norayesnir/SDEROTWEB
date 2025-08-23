import { useArticlesStore } from '~/stores/useArticles';
import type { Article } from '#payload/types';

export interface ArticlesFetchResponse {
    docs: Article[];
    hasNextPage?: boolean;
    hasPrevPage?: boolean;
    limit?: number;
    page?: number;
    pagingCounter?: number;
    prevPage?: number;
    totalDocs?: number;
    totalPages?: number;
}

export const useFetchArticles = () => {
  const store = useArticlesStore();
  const baseUrl = useCmsUrl();
  const { data, pending, error } = useFetch<ArticlesFetchResponse>(`${baseUrl}/articles?limit=100&depth=1`, {
    key: 'articles',
    immediate: true,
    watch: false
  });

  watch(data, (newData) => {
    if (newData) store.setBlogs(newData.docs);
  }, { immediate: true });

  watch(error, (newError) => {
    if (newError) console.error('Error fetching blogs:', newError);
  }, { immediate: true });

  return { data: store.articles, error, pending };
};
