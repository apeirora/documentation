import fs from 'node:fs'
import yaml from 'js-yaml'

export type BlogDate = string /* YYYY-mm-dd */ | null
export const getBlogDate = (filepath: string): BlogDate => {
  const match = /(\d{4})[\/-](\d{2})[\/-](\d{2})/.exec(filepath);
  if (match) {
    return `${match[1]}-${match[2]}-${match[3]}`
  }
  return null
}


type Author = {
  name: string
  title?: string
  url?: string
  titleUrl?: string
}
type AllAuthors = {
  [authorId: string]: Author
}
export const loadAllAuthors = () => {
  return yaml.load(fs.readFileSync('blog/authors.yml', 'utf-8')) as AllAuthors
}

export const resolveAuthors = (authors: string[]): Author[] => {
  const allAuthors = loadAllAuthors()
  return authors.map(authorId => {
    const author = allAuthors[authorId]
    if (!author) {
      throw new Error(`Author '${authorId} not found'`)
    }
    return author
  })
}

export const rewriteBlogPath = (filepath: string) => {
  return filepath
  // return filepath.replace(/\/(\d{4})\/(\d{2})\/(\d{2})-(.+)$/, '/$1-$2-$3-$4')
  // return filepath.replace(/\/(\d{4})-(\d{2})-(\d{2})-(.+)$/, '/$1/$2/$3/$4')
}

export type ExternalMeta = {
  external: true
  externalUrl: string
  source: string
}

// Returns normalized external metadata, or null for internal posts.
// Throws with a descriptive message (including `filepath`, a caller-supplied
// identifier - the loader passes the site URL, the sidebar passes the on-disk
// path) when a post declares external: true but is missing/malformed fields.
export const resolveExternal = (
  frontmatter: Record<string, any>,
  filepath: string
): ExternalMeta | null => {
  if (!frontmatter?.external) return null
  const { externalUrl, source, title } = frontmatter
  const isHttpUrl =
    typeof externalUrl === 'string' && /^https?:\/\//i.test(externalUrl)
  if (!isHttpUrl) {
    throw new Error(
      `External blog post '${filepath}' must set a valid http(s) 'externalUrl'`
    )
  }
  if (typeof source !== 'string' || source.trim() === '') {
    throw new Error(
      `External blog post '${filepath}' must set a non-empty 'source'`
    )
  }
  if (typeof title !== 'string' || title.trim() === '') {
    throw new Error(
      `External blog post '${filepath}' must set a non-empty 'title'`
    )
  }
  return { external: true, externalUrl, source: source.trim() }
}

// Escapes text before it is interpolated into a v-html string (sidebar flag).
export const escapeHtml = (s: string): string =>
  s.replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')