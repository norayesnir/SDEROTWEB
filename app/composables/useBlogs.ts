import type { Blogs } from '#payload/types';

export function useBlogs() {
    const { data, pending, error } = useCollection<{ docs: Blogs[] }>('blogs', { limit: 999 })

    const blogs = computed(() => data.value?.docs || []);

    return { blogs, pending, error }
}
