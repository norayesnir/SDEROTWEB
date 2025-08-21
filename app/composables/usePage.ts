import type { Page, Blogs } from '#payload/types';
import { useRoute } from 'vue-router';
import { computed } from 'vue';

export function usePage() {
    const route = useRoute();

    const { pages, pending: pagePending, error: pageError } = usePages();
    const { blogs, pending: blogPending, error: blogError } = useBlogs();
    if (pageError.value) console.log(pageError.value.message);
    if (blogError.value) console.log(blogError.value.message);

    const slug = computed(() => {
        const raw = route.params.blog || route.params.slug || '';
        return Array.isArray(raw) ? raw.join('/') : raw || 'home';
    });

    const blogSlugs = computed(() => blogs.value.map((blog: Blogs) => blog.slug));

    const data = computed((): Page | Blogs | undefined => {
        if (route.params.blog && blogSlugs.value.includes(route.params.blog as string)) {
            return blogs.value.find((b: Blogs) => b.slug === route.params.blog);
        }
        return pages.value.find((p: Page) => p.slug === slug.value || p.slug === 'home');
    });

    return { data, pending: pagePending || blogPending };
}
