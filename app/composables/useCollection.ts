interface Options {
  id?: string;
  slug?: string;
  depth?: number;
  draft?: boolean;
  locale?: string;
}

interface CollectionResponse<T> {
  docs: T[];
}

export function useCollection<T>(collection: string, options: Options = {}) {
  const baseUrl = useCmsUrl();

  let url = `${baseUrl}/${collection}`;

  if (options.id) url += `/${options.id}`;
  if (options.slug) url += `/${options.slug}`;

  const query: Record<string, string> = {};

  if (options.depth !== undefined) query.depth = String(options.depth);
  if (options.draft !== undefined) query.draft = String(options.draft);
  if (options.locale) query.locale = options.locale;

  const qs = new URLSearchParams(query).toString();
  if (qs) url += `?${qs}`;

  return useAsyncData<CollectionResponse<T> | T>(
    `collection-${collection}-${options.id || options.slug || 'list'}`,
    () => $fetch(url),
    { server: true, lazy: false }
  );
}
