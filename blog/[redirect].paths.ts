
import fs from 'fs'

export default {
  paths() {
    const paths = fs
      .readdirSync('blog')
      .filter(filepath => {
        return /(\d{4})[\/-](\d{2})[\/-](\d{2}).*\.md/.test(filepath);
      })
      .map((filepath) => {
        return {
          params: {
            redirect: filepath.replace(/(\d{4})-(\d{2})-(\d{2})-(.+)\.md$/, '$1/$2/$3/$4'),
            redirectUrlRelative: `./../../../${filepath.replace('.md', '')}`,
            redirectUrlAbsolute: '/blog/' + filepath.replace('.md', ''),
            filepath
          }
        }
      })
    return paths
  }
}