export function usePageUrl() {
  const baseUrl = useCmsUrl();
  const query = new URLSearchParams({ limit: '999' }).toString();
  return `${baseUrl}/pages?${query}`;
}
