export function useCmsUrl() {
  const config = useRuntimeConfig();
  const url = `${config.public.payloadServerUrl}${config.public.payloadApiRoute}`;
  return url;
}
