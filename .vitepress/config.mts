import { defineConfig, HeadConfig } from 'vitepress'
import markdownItFootnote from 'markdown-it-footnote'
import { withMermaid } from "vitepress-plugin-mermaid";
import blogSidebar from './theme/blog-sidebar';
import docsSidebar from './theme/docs-sidebar';
import matter from 'gray-matter'
import path from 'node:path'
import { getBlogDate, resolveAuthors, rewriteBlogPath } from './util/blog';
import { estimateReadingTime } from './util/reading-time';
import fs from 'node:fs'
import { glob } from 'glob'

const BASE = process.env.VP_BASE || '/'
if (!path.posix.isAbsolute(BASE)) {
  throw new Error(`Base path '${BASE}' must be absolute, check environment variable VP_BASE`);
}
const resolveAbsoluteUrl = (relativeUrl: string) => {
  const domain = process.env.VP_DOMAIN
  if (domain) {
    return new URL(relativeUrl, domain).toString()
  } else {
    return path.posix.resolve(BASE, relativeUrl)
  }
}

// https://vitepress.dev/reference/site-config
export default withMermaid(defineConfig({
  title: "ApeiroRA",
  titleTemplate: "Apeiro Reference Architecture",
  description: "Apeiro Reference Architecture - Documentation",
  base: BASE,
  srcDir: '.',
  srcExclude: [
    './node_modules/**/*',
    'README.md',
    'RELEASE.md'
  ],
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

          // we check if the first n(200) characters contain the
          // Markdown for h1. note that the same sequence may show
          // up regularly in e.g. YAML comments in codeblocks, messing
          // with the logic. so we just hope no one uses this so early
          // in a document.
          const hasH1 = /^\s*#\s+.+/m.test(content.slice(0, 200))
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
      },
      {
        name: 'post-build-once',
        apply: 'build' as const,
        async closeBundle() {
          // some SVG files that were created with draw.io have built-in
          // support for light/dark mode. however, the color palette is not
          // complete, so it looks messy. as dark mode is anyway not supported
          // right now, we'll simply post-process all SVG and enforce light mode
          // on them.
          const files = await glob('.vitepress/dist/**/*.svg')
          files.forEach(filepath => {
            const svg = fs.readFileSync(filepath, 'utf-8')
            const pattern = /color-scheme: light dark/
            if (pattern.test(svg)) {
              const newSvg = svg.replace(pattern, 'color-schema: only light')
              fs.writeFileSync(filepath, newSvg)
            }
          })
        }
      }
    ]
  },
  ignoreDeadLinks: false,
  transformHead: ({ pageData }) => {
    const title = (() => {
      if (pageData.frontmatter.title) {
        return `${pageData.frontmatter.title} | Apeiro Reference Architecture`
      } else if (pageData.title) {
        return `${pageData.title} | Apeiro Reference Architecture`
      } else {
        return 'Apeiro Reference Architecture'
      }
    })()
    const head: HeadConfig[] = [
      ['meta', { property: 'og:title', content: title }],
      ['meta', { property: 'og:description', content: pageData.description || '' }],
      ['meta', { property: 'og:url', content: resolveAbsoluteUrl(pageData.relativePath.replace('index.md', '').replace('.md', '')) }],
      ['meta', { property: 'og:image', content: resolveAbsoluteUrl('./img/og-image.png') }],
    ]
    return head
  }
}))