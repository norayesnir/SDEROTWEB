import { useBlogsStore } from '~/stores/useBlogs';
import type { Blog } from '#payload/types';

export interface BlogsFetchResponse {
    docs: Blog[];
    hasNextPage?: boolean;
    hasPrevPage?: boolean;
    limit?: number;
    page?: number;
    pagingCounter?: number;
    prevPage?: number;
    totalDocs?: number;
    totalPages?: number;
}

export const useFetchBlogs = () => {
  const store = useBlogsStore();
  const baseUrl = useCmsUrl();
  const { data, pending, error } = useFetch<BlogsFetchResponse>(`${baseUrl}/blogs?depth=1`, {
    key: 'blogs',
    immediate: true,
    watch: false
  });

  watch(data, (newData) => {
    if (newData) store.setBlogs(newData.docs);
  }, { immediate: true });

  watch(error, (newError) => {
    if (newError) console.error('Error fetching blogs:', newError);
  }, { immediate: true });

  return { data: store.blogs, error, pending };
};
