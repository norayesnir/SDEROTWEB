interface Options {
  id?: string;
  slug?: string;
  depth?: number;
  draft?: boolean;
  locale?: string;
  limit?: number;
}

export function useCollection<T>(collection: string, options: Options = {}) {
  const baseUrl = useCmsUrl();

  let url = `${baseUrl}/${collection}`;

  if (options.id) url += `/${options.id}`;

  const query: Record<string, string> = {};

  if (options.depth !== undefined) query.depth = String(options.depth);
  if (options.draft !== undefined) query.draft = String(options.draft);
  if (options.locale) query.locale = options.locale;
  if (options.limit !== undefined) query.limit = String(options.limit);

  const qs = new URLSearchParams(query).toString();

  if (qs) {
      url += `?${qs}`
  }

  return useFetch<T>(url);
}
