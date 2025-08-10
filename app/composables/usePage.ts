export function usePage() {
    const route = useRoute();
    const { pages, pending } = usePages();

    console.log(pages.value);

    const slug = computed(() => {
        const raw = route.params.slug
        return Array.isArray(raw) ? raw.join('/') : raw || 'home'
    })

    console.log(slug.value);

    const currentPage = computed(() => {
        return pages.value.filter(p => p.slug === slug.value || p.slug === 'home')?.[0];
    })

    return { currentPage, pending }
}
