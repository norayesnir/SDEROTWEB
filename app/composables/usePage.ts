import { useRoute } from 'vue-router';
import { usePagesStore } from '~/stores/usePages';
import { useFetchPages } from '~/composables/fetchPages';

export const usePage = (customSlug?: string) => {
    const route = useRoute();
    const store = usePagesStore();
    const { error, pending } = useFetchPages();

    const slug = computed(() => {
        if (customSlug) return customSlug;
        const raw = route.params.blog || route.params.slug || '';
        return Array.isArray(raw) ? raw.join('/') : raw || 'home';
    });

    const data = computed(() => store.pages.find((p) => p.slug === slug.value || p.slug === 'home'));

    return { data, pending, error };
};
