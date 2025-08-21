import type { Page } from '#payload/types';

export function usePages() {
    const { data, pending, error } = useCollection<{ docs: Page[] }>('pages', { limit: 999 })

    const pages = computed(() => data.value?.docs || []);

    return { pages, pending, error }
}
