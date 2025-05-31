import fs from 'fs-extra'
import path from 'path'

function toPascalCase(str: string) {
  return str.replace(/(^\w|-\w)/g, (m) => m.replace(/-/, '').toUpperCase())
}

export default async function add(args: string[], rootDir: string) {
  const name = args[0]
  if (!name) {
    console.log('Usage: svg-components add <icon-name>')
    process.exit(1)
  }

  const fileName = `${name.toLowerCase()}.tsx`
  const pascalName = toPascalCase(name)
  const sourcePath = path.join(rootDir, '../icons', fileName)
  const targetDir = path.resolve(process.cwd(), 'components/svgs')
  const targetPath = path.join(targetDir, `Svg${pascalName}.tsx`)

  if (!fs.existsSync(sourcePath)) {
    console.error(`❌ Icon "${name}" not found in svg-components/icons`)
    process.exit(1)
  }

  await fs.ensureDir(targetDir)
  await fs.copyFile(sourcePath, targetPath)
  console.log(`✅ Copied Svg${pascalName} to components/svgs`)
}
