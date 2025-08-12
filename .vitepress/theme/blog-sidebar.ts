import { generateSidebar } from 'vitepress-sidebar';
import { SidebarItem } from 'vitepress-sidebar/types';
import { getBlogDate, rewriteBlogPath } from '../util/blog';

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
      return {
        ...it,
        link: rewriteBlogPath('/blog/' + it.link),
        __date: getBlogDate(it.link!)
      }
    })
    .filter(it => !!it.__date)
    .sort((a, b) => {
      // sort descending by date
      return a.__date! < b.__date! ? 1 : -1
    })
    .reduce((byYear, it) => {
      const blogDate = getBlogDate(it.link!)
      const [ year ] = blogDate?.split('-') || []
      byYear[year] = byYear[year] || []
      byYear[year].push(it)
      return byYear
    }, {} as { [year: string]: SidebarItem[]})

  const sidebar = Object.entries(byYear).reduce((sidebar, [year, blogPostItems]) => {
    const yearItem = { text: year, items: blogPostItems }
    sidebar.push(yearItem)
    return sidebar
  }, <SidebarItem[]>[])

  return sidebar
};