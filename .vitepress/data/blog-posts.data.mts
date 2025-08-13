import { createContentLoader } from 'vitepress'
import { getBlogDate, loadAllAuthors, rewriteBlogPath } from '../util/blog'
import { estimateReadingTime } from '../util/reading-time'


export default createContentLoader('blog/*.md', {
  excerpt: '<!-- truncate -->',
  includeSrc: true,
  transform: data => {
    const allAuthors = loadAllAuthors()
    return data
      .map(it => {
        const date = getBlogDate(it.url)
        return {
          ...it,
          url: rewriteBlogPath(it.url),
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
          metadata: {
            readingTime: estimateReadingTime(it.src || '')
          },
          __date: date
        }
      })
      .filter(it => !!it.__date)
      .sort((a, b) => {
        // sort descending by date
        return a.__date! < b.__date! ? 1 : -1
      })
  }
})