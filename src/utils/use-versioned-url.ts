import { useLocation } from "@docusaurus/router";
import { useVersion } from "./use-version";

function resolve(from, to) {
  const resolvedUrl = new URL(to, new URL(from, 'resolve://'));
  if (resolvedUrl.protocol === 'resolve:') {
    // `from` is a relative URL.
    const { pathname, search, hash } = resolvedUrl;
    return pathname + search + hash;
  }
  return resolvedUrl.toString();
}

export function useVersionedUrl(url: string) {
  if (!url) return ''
  if (url.startsWith('#')) return url

  if (url.includes(':version')) {
    const version = useVersion();
    const result = url.replace(':version', version.path).replace(/\/+/g, '/')
    return result
  }

  const location = useLocation();
  const result = resolve(`${location.pathname}/index.html`, url).replace(/\/+/g, '/')
  return result
}