import { getBlogDate, loadAllAuthors, resolveExternal, rewriteBlogPath } from '../util/blog'
import { estimateReadingTime } from '../util/reading-time'

// The blog-posts loader transform, extracted into a plain module (no
// createContentLoader call) so it can be unit-tested without VitePress's
// runtime (see blog-posts.test.ts). blog-posts.data.mts wires it into
// createContentLoader unchanged.
export const transformBlogPosts = (data: any[]) => {
  const allAuthors = loadAllAuthors()
  return data
    .map(it => {
      const date = getBlogDate(it.url)
      const external = resolveExternal(it.frontmatter || {}, it.url)
      return {
        ...it,
        url: external ? external.externalUrl : rewriteBlogPath(it.url),
        frontmatter: {
          ...(it.frontmatter || {}),
          authors: (it.frontmatter?.authors || []).map(authorId => {
            const author = allAuthors[authorId]
            if (!author) {
              throw new Error(`Author '${authorId} not found'`)
            }
            return author
          })
        },
        // remove headlines from the excerpt, as they mess up the layout;
        // fall back to the frontmatter excerpt (external stubs have no
        // <!-- truncate --> marker, so createContentLoader's excerpt is empty)
        excerpt: it.excerpt?.replace(/<h[1-6][^>]*>.*?<\/h[1-6]>/gis, '')
          || it.frontmatter?.excerpt || undefined,
        metadata: {
          readingTime:
            typeof it.frontmatter?.readingTime === 'number'
              ? it.frontmatter.readingTime
              : external
              ? null // no local content to estimate
              : estimateReadingTime(it.src || '')
        },
        external, // ExternalMeta | null
        __date: date
      }
    })
    .filter(it => !!it.__date)
    .filter(it => it.frontmatter?.published !== false) // match sidebar
    .sort((a, b) => {
      // sort descending by date
      return a.__date! < b.__date! ? 1 : -1
    })
}
