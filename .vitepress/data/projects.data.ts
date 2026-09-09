import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

// Resolve the repo root from this file's location (.vitepress/data/ → ../../)
const dir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..')

export default {
  watch: ['apeiro-projects.json', 'apeiro-projects-aliases.json'],
  load() {
    const data = JSON.parse(fs.readFileSync(path.join(dir, 'apeiro-projects.json'), 'utf-8'))

    // Build a flat lookup map: primary keys + hyphen-stripped implicit aliases
    // so <Project>CobaltCore</Project> and <Project name="cobaltcore"> both resolve
    // to the cobalt-core entry without touching the component.
    const result: Record<string, any> = {}
    for (const [key, project] of Object.entries(data)) {
      if (key.startsWith('$')) continue
      const p = project as any
      result[key] = p
      result[key.toLowerCase()] = p
      const noHyphen = key.replace(/-/g, '')
      if (noHyphen !== key) {
        if (!result[noHyphen]) result[noHyphen] = p
        if (!result[noHyphen.toLowerCase()]) result[noHyphen.toLowerCase()] = p
      }
    }

    // Apply manually curated aliases from the separate aliases file
    const aliasPath = path.join(dir, 'apeiro-projects-aliases.json')
    if (fs.existsSync(aliasPath)) {
      const aliasData = JSON.parse(fs.readFileSync(aliasPath, 'utf-8'))
      for (const [projectId, aliases] of Object.entries(aliasData)) {
        if (projectId.startsWith('$')) continue
        const target = result[projectId]
        if (!target) continue
        for (const alias of aliases as string[]) {
          if (!result[alias]) result[alias] = target
          const lower = alias.toLowerCase()
          if (!result[lower]) result[lower] = target
        }
      }
    }

    return result
  }
}
