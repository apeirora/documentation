import { createContentLoader } from 'vitepress'
import { transformBlogPosts } from './blog-transform'

export default createContentLoader('blog/*.md', {
  excerpt: '<!-- truncate -->',
  includeSrc: true,
  transform: transformBlogPosts
})
