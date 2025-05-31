#!/usr/bin/env node

import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const command = process.argv[2]
const args = process.argv.slice(3)

if (!command) {
  console.log('Usage: svg-components <command>')
  process.exit(1)
}

try {
  const module = await import(`./commands/${command}.ts`)
  console.log('module', module)
  await module.default(args, __dirname)
} catch (err) {
  console.error(`❌ Unknown command: ${command}`)
  process.exit(1)
}
