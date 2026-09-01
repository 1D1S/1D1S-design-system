// package.json 의 "./*" 서브패스 exports 가 실제 dist 파일과 1:1 로 맞는지 확인한다.
// 어긋나면 소비 앱에서 ERR_MODULE_NOT_FOUND 로만 드러나므로 빌드 단계에서 막는다.
import fs from 'fs'

const required = [
  ['dist/index.js', 'dist/index.d.ts'],
  ['dist/hooks/index.js', 'dist/hooks/index.d.ts'],
  ['dist/lib/utils.js', 'dist/lib/utils.d.ts'],
  ...fs
    .readdirSync('src/components', { withFileTypes: true })
    .filter((d) => d.isDirectory() && fs.existsSync(`src/components/${d.name}/index.ts`))
    .map((d) => [`dist/components/${d.name}/index.js`, `dist/components/${d.name}/index.d.ts`]),
].flat()

const missing = required.filter((f) => !fs.existsSync(f))
if (missing.length) {
  console.error(`서브패스 진입점 누락 (${missing.length}개):\n  ${missing.join('\n  ')}`)
  process.exit(1)
}

// 'use client' 가 빠진 청크가 있으면 RSC 에서 createContext 로 터진다.
const noDirective = required
  .filter((f) => f.endsWith('.js'))
  .filter((f) => !/^['"]use client['"]/.test(fs.readFileSync(f, 'utf-8')))
if (noDirective.length) {
  console.error(`'use client' 누락:\n  ${noDirective.join('\n  ')}`)
  process.exit(1)
}

console.log(`exports 검증 OK — 진입점 ${required.length / 2}개`)
