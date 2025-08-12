import { generateSidebar } from 'vitepress-sidebar';
import _ from 'lodash-es';
import { readFileSync } from 'fs';
import matter from 'gray-matter';
import { SidebarItem, VitePressSidebarOptions } from 'vitepress-sidebar/types';

export const docsSidebarConfig: VitePressSidebarOptions = {
    documentRootPath: '/',
    scanStartPath: 'docs',
    resolvePath: '/docs/',
    collapsed: true,
    useTitleFromFrontmatter: true,
    capitalizeFirst: true,
    useFolderLinkFromIndexFile: true,
    useFolderTitleFromIndexFile: true,
    includeRootIndexFile: true,
    debugPrint: false
}

type SidebarItemAugmented = SidebarItem & {
  __filepath?: string
  __frontmatter?: any
}

const sortByFrontmatterSidebarPosition  = (items: SidebarItemAugmented[]) => {
  const augmentedItems = items.map(it => {
    if (it.link) {
      it.link = '/docs/' + it.link
      const filepath = `.${it.link}${it.link?.endsWith('.md') ? '' : '.md'}`
      it.__filepath = filepath
      const contents = readFileSync(filepath, 'utf-8');
      const { data } = matter(contents);
      if (data.sidebar_label) {
        it.text = data.sidebar_label
      }
      it.__frontmatter = data
    }
    if (it.items) {
      it.items = sortByFrontmatterSidebarPosition(it.items)
    }
    if (it.text?.toLowerCase() === 'best-practices') {
      it.text = 'Best Practices'
    }
    return it
  })
  const sortedItems = _.orderBy(augmentedItems, [(item: SidebarItemAugmented) => (item?.__frontmatter?.sidebar_position || 0)], ['asc']);
  return sortedItems
}

export default function docsSidebar () {
  const generatedSidebar = generateSidebar([docsSidebarConfig])
  if (!generatedSidebar['/docs/']) {
    throw new Error(`Expected sidebar '/docs/' but none was found`)
  }

  const docsItems: SidebarItem[] = generatedSidebar['/docs/'].items.map(it => {
    it.collapsed = false
    return it
  })
  const sidebar: SidebarItem[] = sortByFrontmatterSidebarPosition(docsItems)
  return sidebar
}