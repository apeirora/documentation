import { defineConfig } from 'vitepress'
import markdownItFootnote from 'markdown-it-footnote'
import { withMermaid } from "vitepress-plugin-mermaid";
import blogSidebar from './theme/blog-sidebar';
import docsSidebar from './theme/docs-sidebar';
import matter from 'gray-matter'
import path from 'node:path'
import { getBlogDate, resolveAuthors, rewriteBlogPath } from './util/blog';
import { estimateReadingTime } from './util/reading-time';

const BASE = process.env.VP_BASE || '/'
if (!path.posix.isAbsolute(BASE)) {
  throw new Error(`Base path '${BASE}' must be absolute, check environment variable VP_BASE`);
}

// https://vitepress.dev/reference/site-config
export default withMermaid(defineConfig({
  title: "ApeiroRA",
  titleTemplate: "Apeiro Reference Architecture",
  description: "Apeiro Reference Architecture - Documentation",
  base: BASE,
  srcDir: '.',
  srcExclude: ['./node_modules/**/*'],
  // assetsDir: './static',
  cleanUrls: true,
  appearance: false, // disable dark mode
  rewrites: id => {
    if (id.startsWith('blog/')) {
      return rewriteBlogPath(id)
    }
    return id
  },
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Documentation', link: '/docs/index.md', activeMatch: '/docs/' },
      { text: 'Blog', link: '/blog/index.md', activeMatch: '/blog/' },
      { text: 'Project Website', link: 'https://apeirora.eu/'  }
    ],
    sidebar: {
      '/blog/': blogSidebar(),
      '/docs/': docsSidebar()
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/apeirora/' }
    ],

    logo: {
      // relative to `public` folder
      src: '/img/favicon-32x32.png',
      width: 24,
      height: 24
    },

    search: {
      provider: 'local'
    }

  },
  head: [['link', { rel: 'icon', href: path.posix.resolve(BASE, './img/favicon.ico') }]],
  markdown: {
    config: (md) => {
      md.use(markdownItFootnote)
    }
  },
  mermaid: {
    theme: 'base',
    themeVariables: {
      fontFamily: 'system-ui, -apple-system, Segoe UI, Roboto, Ubuntu, Cantarell, Noto Sans, sans-serif, BlinkMacSystemFont, \'Segoe UI\', Helvetica, Arial, sans-serif, \'Apple Color Emoji\', \'Segoe UI Emoji\', \'Segoe UI Symbol\'',
      background: '#FFFFFF',
      primaryColor: '#146DDF',
      primaryTextColor: '#FFFFFF',
      secondaryColor: '#1F84DA',
      secondaryTextColor: '#FFFFFF',
      tertiaryColor: '#2A9AD4',
      tertiaryTextColor: '#FFFFFF',
      lineColor: '#0a59e4',
      cScale1: '#146DDF',
      cScale2: '#1F84DA',
      cScale3: '#2A9AD4',
      cScale4: '#35B1CF',
      cScale5: '#87BEE1'
    }
  },
  vite: {
    plugins: [
      {
        name: 'inject-plugin',
        enforce: 'pre',
        transform(code, id) {
          if (!id.endsWith('.md')) return


          const { content, data } = matter(code)
          const injectedChunks: string[] = []
          const injectToTop: string[] = []
          if (content.startsWith('__VP_PARAMS_START')) {
            // content contains dynamic routing
            // this marker must be the first row of the file's content
            const [marker, ...actualContent] = content.split('\n')
            injectToTop.push(marker)
            injectedChunks.push(actualContent.join('\n'))
          } else {
            injectedChunks.push(content)
          }

          const isBlogPost = id.includes('/blog/')
            && !id.endsWith('/index.md')
          const isRedirect = id.includes('__VP_PARAMS_START__') && id.includes('redirect')
          if (isBlogPost && !isRedirect) {
            injectedChunks.unshift(`
<BlogPost
  date="${getBlogDate(id)}"
  :authors='${JSON.stringify(resolveAuthors(data.authors || []))}'
  :readingTime="${estimateReadingTime(content)}"
  />
              `.trim())
          }

          const hasH1 = /^\s*#\s+.+/m.test(content)
          if (data.title && !hasH1) {
            injectedChunks.unshift(`# ${data.title}`)
          }

          injectedChunks.unshift(...injectToTop)
          const injected = injectedChunks.join('\n\n')
          return {
            code: matter.stringify(injected, data),
            map: null
          }
        }
      }
    ]
  },
  ignoreDeadLinks: true // TODO: set to false
}))