const { readdirSync } = require('fs')
const { spawnSync } = require('child_process')
const { extname } = require('path')

const files = readdirSync(__dirname)
files.forEach((file) => {
  if (extname(file) !== '.js' || file === 'run.js')
    return
  console.log(`*** ${file} ***`)
  const result = spawnSync(process.argv0, [file], { stdio: 'inherit', cwd: __dirname} )
  if (result.status !== 0)
    process.exit(result.status)
})
