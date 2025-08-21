import type { Article } from '#payload/types';
import { useRoute } from 'vue-router';
import { computed } from 'vue';

export function useArticle() {
    const route = useRoute();
    const { data: response, pending } = useArticles();
    console.log(response.value);

    const currentArticle = computed(() => {
        const raw = route.params.slug;
        return Array.isArray(raw) ? raw[0] : raw;
    });

    const articles = computed(() => response.value || []);

    const data = computed(() =>
        articles.value.filter((article: Article) => article?.slug === currentArticle.value)[0]
    );

    return { data, pending };
}
