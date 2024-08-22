import * as fs from 'node:fs'
import * as path from 'node:path'
import type { Plugin } from 'vite'

function loadRoutes(): Plugin {
  return {
    name: 'load-routes',
    resolveId(source) {
      if (source === 'virtual:routes') {
        return source
      }
      return null
    },
    load(id) {
      if (id === 'virtual:routes') {
        const modulesDir = path.resolve(__dirname, 'src/modules')
        const routeFiles = getAllRouteFiles(modulesDir)
        const imports = routeFiles.map((file, index) => `import routes${index} from '${file.replace(/\\/g, '/')}'`).join('\n')
        const routes = routeFiles.map((_, index) => `...routes${index}`).join(',\n')
        return `
          ${imports}
          export const routes = [
            ${routes}
          ]
        `
      }
      return null
    },
  }
}

function getAllRouteFiles(dir, fileList = []) {
  const files = fs.readdirSync(dir)
  files.forEach((file) => {
    const filePath = path.join(dir, file)
    if (fs.statSync(filePath).isDirectory()) {
      getAllRouteFiles(filePath, fileList)
    }
    else if (file === 'routes.ts') {
      fileList.push(filePath)
    }
  })
  return fileList
}

export default loadRoutes
