import type { Article } from '#payload/types';

export async function useArticles() {
    const baseUrl = useCmsUrl();
    const { data, pending, error } = await useAsyncData(`articles`, () => $fetch(`${baseUrl}/articles`, { query: { limit: 9, depth: 1 } }));

    return { data, pending, error };
}
