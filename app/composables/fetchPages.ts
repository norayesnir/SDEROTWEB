import { usePagesStore } from '../stores/usePages';
import type { Page } from '#payload/types';

export interface PagesFetchResponse {
    docs: Page[];
    hasNextPage?: boolean;
    hasPrevPage?: boolean;
    limit?: number;
    page?: number;
    pagingCounter?: number;
    prevPage?: number;
    totalDocs?: number;
    totalPages?: number;
}

export const useFetchPages = () => {
  const store = usePagesStore();
  const baseUrl = useCmsUrl();
  const { data, pending, error } = useFetch<PagesFetchResponse>(`${baseUrl}/pages`, {
    key: 'pages',
    immediate: true,
    watch: false
  });

  watch(data, (newData) => {
    if (newData) store.setPages(newData.docs);
  }, { immediate: true });

 watch(error, (newError) => {
    if (newError) console.error('Error fetching pages:', newError);
  }, { immediate: true });

  return { data: store.pages, pending, error };
};
