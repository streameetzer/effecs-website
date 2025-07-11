import type { Env } from 'bun'

import { PluginConfig } from '@docusaurus/types'

declare const process: {
  env: Env & {
    TYPEDOC_ENTRY_POINTS?: string
    TYPEDOC_TS_CONFIG?: string
  }
}

const entryPoints = (() => {
  if (!process.env.TYPEDOC_ENTRY_POINTS) return undefined
  try {
    const tep: unknown = JSON.parse(process.env.TYPEDOC_ENTRY_POINTS)
    return Array.isArray(tep)
      ? tep.filter((ep) => typeof ep === 'string')
      : undefined
  } catch {
    return undefined
  }
})()
const tsconfig =
  typeof process.env.TYPEDOC_TS_CONFIG === 'string'
    ? process.env.TYPEDOC_TS_CONFIG
    : undefined

let plugin: PluginConfig = false
if (entryPoints?.length) {
  plugin = [
    'docusaurus-plugin-typedoc',
    {
      entryPoints,
      tsconfig,
      watch: process.env.NODE_ENV === 'development',
      sidebar: {
        typescript: true,
      },
      out: 'docs/api', // cleared automatically
      entryFileName: 'API',
      hidePageTitle: true,
      disableSources: true,
    },
  ]
}

export default plugin
