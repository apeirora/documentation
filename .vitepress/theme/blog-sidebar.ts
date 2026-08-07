import { generateSidebar } from 'vitepress-sidebar';
import { SidebarItem } from 'vitepress-sidebar/types';
import { getBlogDate, rewriteBlogPath, resolveExternal, escapeHtml } from '../util/blog';
import matter from 'gray-matter';
import { readFileSync } from 'fs';

export const blogSidebarConfig = {
    documentRootPath: '/',
    scanStartPath: 'blog',
    resolvePath: '/blog/',
    collapsed: true,
    useTitleFromFrontmatter: true,
    capitalizeFirst: true,
}

export default function blogSidebar () {
  const generatedSidebar = generateSidebar([blogSidebarConfig])
  if (!generatedSidebar['/blog/']) {
    throw new Error(`Expected sidebar '/blog/' but none was found`)
  }
  const blogPostItems: SidebarItem[] = generatedSidebar['/blog/'].items
  const byYear = blogPostItems
    .map(it => {
        const filepath = `./blog/${it.link}${it.link?.endsWith('.md') ? '' : '.md'}`
        const contents = readFileSync(filepath, 'utf-8');
        const { data } = matter(contents);
        const external = resolveExternal(data, filepath)
        const base = {
          ...it,
          __filepath: filepath,
          __frontmatter: data,
          __date: getBlogDate(it.link!)
        }
        if (external) {
          return {
            ...base,
            // absolute URL: VitePress treats it as external and opens a new tab
            link: external.externalUrl,
            target: '_blank',
            rel: 'noopener noreferrer',
            // rendered via v-html by VPSidebarItem; escape the (untrusted) title
            text: `${escapeHtml(String(data.title))} <span class="blog-ext-flag" title="This post was published on an external site">EXT <span aria-hidden="true">↗</span><span class="vp-sr-only"> (external, opens in new tab)</span></span>`
          }
        }
        return {
          ...base,
          link: rewriteBlogPath('/blog/' + it.link)
        }
    })
    .filter(it => !!it.__date)
    .filter(it => it.__frontmatter.published !== false)
    .sort((a, b) => {
      // sort descending by date
      return a.__date! < b.__date! ? 1 : -1
    })
    .reduce((byYear, it) => {
      // key off the already-computed __date (derived from the original filename),
      // not getBlogDate(it.link) - for external items link is an absolute URL,
      // which getBlogDate cannot parse (it would land in a phantom year bucket).
      const [ year ] = it.__date?.split('-') || []
      byYear[year] = byYear[year] || []
      byYear[year].push(it)
      return byYear
    }, {} as { [year: string]: SidebarItem[]})

  const sidebar = Object.entries(byYear)
    // sort descending by year
    .sort(([leftYear], [rightYear]) => rightYear.localeCompare(leftYear))
    .reduce((sidebar, [year, blogPostItems]) => {
      const yearItem = { text: year, items: blogPostItems }
      sidebar.push(yearItem)
      return sidebar
    }, <SidebarItem[]>[])

  return sidebar
};