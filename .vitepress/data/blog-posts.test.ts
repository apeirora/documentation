import { describe, it, expect } from 'vitest'
import { transformBlogPosts } from './blog-transform'
import { rewriteBlogPath } from '../util/blog'

// A body long enough that estimateReadingTime returns a positive number.
const internalSrc = Array.from({ length: 250 }, (_, i) => `word${i}`).join(' ')

// Uses author ids that exist in blog/authors.yml (resolveAuthors throws otherwise).
const AUTHOR = 'maximilian-lenkeit'

const data = [
  {
    // internal post
    url: '/blog/2025-03-05-internal-post',
    src: internalSrc,
    excerpt: '<p>Internal excerpt</p>',
    frontmatter: { title: 'Internal Post', authors: [AUTHOR] }
  },
  {
    // external post WITH readingTime
    url: '/blog/2025-06-10-external-with-rt',
    src: '',
    excerpt: '',
    frontmatter: {
      title: 'External With Reading Time',
      authors: [AUTHOR],
      external: true,
      externalUrl: 'https://medium.com/@example/external-with-rt',
      source: 'Medium',
      readingTime: 7
    }
  },
  {
    // external post WITHOUT readingTime, only a frontmatter excerpt
    url: '/blog/2025-07-15-external-no-rt',
    src: '',
    excerpt: '',
    frontmatter: {
      title: 'External No Reading Time',
      authors: [AUTHOR],
      external: true,
      externalUrl: 'https://community.sap.com/example/external-no-rt',
      source: 'SAP Community',
      excerpt: 'A frontmatter excerpt for the external stub.'
    }
  },
  {
    // published: false must be filtered out
    url: '/blog/2025-09-01-hidden-post',
    src: internalSrc,
    excerpt: '<p>Hidden</p>',
    frontmatter: { title: 'Hidden Post', authors: [AUTHOR], published: false }
  }
]

describe('transformBlogPosts', () => {
  const result = transformBlogPosts(data)

  it('filters out published: false posts', () => {
    expect(result.map(it => it.frontmatter.title)).not.toContain('Hidden Post')
    expect(result).toHaveLength(3)
  })

  it('points external url at externalUrl; internal at rewritten local path', () => {
    const internal = result.find(it => it.frontmatter.title === 'Internal Post')
    const extRt = result.find(it => it.frontmatter.title === 'External With Reading Time')
    expect(internal!.url).toBe(rewriteBlogPath('/blog/2025-03-05-internal-post'))
    expect(extRt!.url).toBe('https://medium.com/@example/external-with-rt')
  })

  it('populates external metadata for external items and null for internal', () => {
    const internal = result.find(it => it.frontmatter.title === 'Internal Post')
    const extRt = result.find(it => it.frontmatter.title === 'External With Reading Time')
    expect(internal!.external).toBeNull()
    expect(extRt!.external).toEqual({
      external: true,
      externalUrl: 'https://medium.com/@example/external-with-rt',
      source: 'Medium'
    })
  })

  it('respects readingTime: frontmatter number, null for external without, computed for internal', () => {
    const internal = result.find(it => it.frontmatter.title === 'Internal Post')
    const extRt = result.find(it => it.frontmatter.title === 'External With Reading Time')
    const extNoRt = result.find(it => it.frontmatter.title === 'External No Reading Time')
    expect(extRt!.metadata.readingTime).toBe(7)
    expect(extNoRt!.metadata.readingTime).toBeNull()
    expect(typeof internal!.metadata.readingTime).toBe('number')
    expect(internal!.metadata.readingTime).toBeGreaterThan(0)
  })

  it('falls back to frontmatter.excerpt when there is no truncate marker', () => {
    const extNoRt = result.find(it => it.frontmatter.title === 'External No Reading Time')
    expect(extNoRt!.excerpt).toBe('A frontmatter excerpt for the external stub.')
  })

  it('sorts descending by date, interleaving external between internal', () => {
    // dates: internal 2025-03-05, external-rt 2025-06-10, external-no-rt 2025-07-15
    expect(result.map(it => it.__date)).toEqual([
      '2025-07-15',
      '2025-06-10',
      '2025-03-05'
    ])
  })

  it('resolves authors to full objects', () => {
    const internal = result.find(it => it.frontmatter.title === 'Internal Post')
    expect(internal!.frontmatter.authors[0]).toHaveProperty('name')
  })
})
