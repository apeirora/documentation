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