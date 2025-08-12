import fs from 'node:fs'

export default {
  watch: ['apeiro-projects.json'],
  load(watchedFiles) {
    if (!watchedFiles[0]) {
      throw new Error('No file found to watch in projects.data.ts')
    }
    const contents = fs.readFileSync(watchedFiles[0], 'utf-8')
    const data = JSON.parse(contents)
    return data
  }
}