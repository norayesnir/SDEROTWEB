import type { Page } from '#payload/types';

export function usePages() {
    const { data, pending } = useCollection<{ docs?: Page[] }>('pages', reactive({ limit: 999 }))

    const pages = computed(() => data.value?.docs || []);

    return { pages, pending }
}
