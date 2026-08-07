import { describe, it, expect } from 'vitest'
import { resolveExternal, escapeHtml } from './blog'

describe('resolveExternal', () => {
  const valid = {
    external: true,
    externalUrl: 'https://medium.com/@example/post',
    source: 'Medium',
    title: 'A Post',
  }

  it('returns null when external is absent', () => {
    expect(resolveExternal({ title: 'Internal' }, 'blog/x.md')).toBeNull()
  })

  it('returns null when external is false', () => {
    expect(resolveExternal({ external: false, title: 'Internal' }, 'blog/x.md')).toBeNull()
  })

  it('throws when externalUrl is missing', () => {
    expect(() => resolveExternal({ external: true, source: 'Medium', title: 'A' }, 'blog/x.md'))
      .toThrow('blog/x.md')
  })

  it('throws when externalUrl is not http(s) (ftp)', () => {
    expect(() => resolveExternal({ ...valid, externalUrl: 'ftp://example.com/f' }, 'blog/x.md'))
      .toThrow(/externalUrl/)
  })

  it('throws when externalUrl is a relative path', () => {
    expect(() => resolveExternal({ ...valid, externalUrl: '/relative/path' }, 'blog/x.md'))
      .toThrow(/externalUrl/)
  })

  it('throws when externalUrl is a mailto', () => {
    expect(() => resolveExternal({ ...valid, externalUrl: 'mailto:a@b.c' }, 'blog/x.md'))
      .toThrow(/externalUrl/)
  })

  it('throws when source is missing', () => {
    const { source, ...noSource } = valid
    expect(() => resolveExternal(noSource, 'blog/x.md')).toThrow(/source/)
  })

  it('throws when source is empty', () => {
    expect(() => resolveExternal({ ...valid, source: '' }, 'blog/x.md')).toThrow(/source/)
  })

  it('throws when source is whitespace', () => {
    expect(() => resolveExternal({ ...valid, source: '   ' }, 'blog/x.md')).toThrow(/source/)
  })

  it('throws when title is missing', () => {
    const { title, ...noTitle } = valid
    expect(() => resolveExternal(noTitle, 'blog/x.md')).toThrow(/title/)
  })

  it('throws when title is empty', () => {
    expect(() => resolveExternal({ ...valid, title: '  ' }, 'blog/x.md')).toThrow(/title/)
  })

  it('returns normalized metadata on valid input', () => {
    expect(resolveExternal(valid, 'blog/x.md')).toEqual({
      external: true,
      externalUrl: 'https://medium.com/@example/post',
      source: 'Medium',
    })
  })

  it('trims the source', () => {
    expect(resolveExternal({ ...valid, source: '  SAP Community  ' }, 'blog/x.md')).toEqual({
      external: true,
      externalUrl: 'https://medium.com/@example/post',
      source: 'SAP Community',
    })
  })

  it('accepts http and https case-insensitively', () => {
    expect(resolveExternal({ ...valid, externalUrl: 'HTTP://example.com/x' }, 'blog/x.md'))
      .not.toBeNull()
  })
})

describe('escapeHtml', () => {
  it('escapes & < > " and \'', () => {
    expect(escapeHtml(`&<>"'`)).toBe('&amp;&lt;&gt;&quot;&#39;')
  })

  it('leaves plain text unchanged', () => {
    expect(escapeHtml('Rethinking Control Plane Scaling')).toBe('Rethinking Control Plane Scaling')
  })
})
