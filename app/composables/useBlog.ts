import { useRoute } from 'vue-router';
import { useBlogsStore } from '~/stores/useBlogs';
import { useArticlesStore } from '~/stores/useArticles';
import { useFetchBlogs } from '~/composables/fetchBlogs';
import { useFetchArticles } from '~/composables/fetchArticles';

export const useBlog = (customSlug?: string) => {
  const route = useRoute();
  const slug = customSlug || (route.params.blog as string || '');
  const blogsStore = useBlogsStore();
  const articlesStore = useArticlesStore();
  const { error: blogsError, pending: blogsPending } = useFetchBlogs();
  const { error: articlesError, pending: articlesPending } = useFetchArticles();

  const blog = computed(() => blogsStore.blogs.find(b => b.slug === slug));
  const articles = computed(() => articlesStore.articles.filter(a => a.blog?.slug === slug));

  const error = computed(() => blogsError.value || articlesError.value);
  const pending = computed(() => blogsPending.value || articlesPending.value);

  watch(blogsStore.blogs, () => console.log('Blogs:', blogsStore.blogs.map(b => b.slug)), { immediate: true });
  watch(articlesStore.articles, () => console.log('Articles for', slug, ':', articles.value.map(a => a.slug)), { immediate: true });

  return { blog, articles, error, pending };
};
