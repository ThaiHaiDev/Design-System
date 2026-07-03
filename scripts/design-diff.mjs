#!/usr/bin/env node
/**
 * design-diff.mjs
 * Compare local _ds_manifest.json against a reference (git HEAD or cloud cache).
 *
 * Usage:
 *   node scripts/design-diff.mjs                          # vs git HEAD
 *   node scripts/design-diff.mjs --source cloud           # vs .cloud-manifest-cache.json
 *   node scripts/design-diff.mjs --source <path/to.json>  # vs any file
 *   node scripts/design-diff.mjs --summary                # one-line summary only
 *
 * Exit 0 = no changes. Exit 1 = design changed.
 */

import { execSync } from 'child_process'
import { readFileSync, existsSync } from 'fs'
import { resolve, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dir = dirname(fileURLToPath(import.meta.url))
const ROOT = resolve(__dir, '..')
const MANIFEST_REL = 'Verity Design System/_ds_manifest.json'
const MANIFEST_ABS = resolve(ROOT, MANIFEST_REL)
const CLOUD_CACHE  = resolve(__dir, '.cloud-manifest-cache.json')
const SUMMARY_ONLY = process.argv.includes('--summary')

const sourceArgIdx = process.argv.indexOf('--source')
const SOURCE = sourceArgIdx !== -1 ? process.argv[sourceArgIdx + 1] : 'git'

const RESET  = '\x1b[0m'
const RED    = '\x1b[31m'
const GREEN  = '\x1b[32m'
const YELLOW = '\x1b[33m'
const BOLD   = '\x1b[1m'
const DIM    = '\x1b[2m'
const CYAN   = '\x1b[36m'

// ── helpers ──────────────────────────────────────────────────────────────────

function readCurrentManifest() {
  return JSON.parse(readFileSync(MANIFEST_ABS, 'utf-8'))
}

function readReferenceManifest() {
  if (SOURCE === 'git') {
    try {
      const raw = execSync(`git show HEAD:"${MANIFEST_REL}"`, {
        cwd: ROOT,
        encoding: 'utf-8',
        stdio: ['pipe', 'pipe', 'pipe'],
      })
      return { manifest: JSON.parse(raw), label: 'git HEAD' }
    } catch {
      return null // no HEAD yet
    }
  }

  const cachePath = SOURCE === 'cloud' ? CLOUD_CACHE : resolve(process.cwd(), SOURCE)
  if (!existsSync(cachePath)) {
    console.error(`${RED}Error: reference file not found: ${cachePath}${RESET}`)
    console.error(`${DIM}Run "npm run design:cloud-sync" (via Claude) to refresh the cloud cache.${RESET}`)
    process.exit(2)
  }
  const data = JSON.parse(readFileSync(cachePath, 'utf-8'))
  const syncedAt = data._cloudSyncedAt
    ? ` (synced ${new Date(data._cloudSyncedAt).toLocaleString()})`
    : ''
  return { manifest: data, label: `cloud${syncedAt}` }
}

function tokenKey(t) {
  return t.scope ? `${t.name}[${t.scope}]` : t.name
}

function diffTokens(prev, curr) {
  const prevMap = new Map(prev.map(t => [tokenKey(t), t]))
  const currMap = new Map(curr.map(t => [tokenKey(t), t]))

  const added   = []
  const removed = []
  const changed = []

  for (const [key, ct] of currMap) {
    if (!prevMap.has(key)) {
      added.push(ct)
    } else {
      const pt = prevMap.get(key)
      if (pt.value !== ct.value) changed.push({ key, from: pt.value, to: ct.value, kind: ct.kind })
    }
  }
  for (const [key, pt] of prevMap) {
    if (!currMap.has(key)) removed.push(pt)
  }

  return { added, removed, changed }
}

function diffComponents(prev, curr) {
  const prevMap = new Map(prev.map(c => [c.name, c]))
  const currMap = new Map(curr.map(c => [c.name, c]))

  const added   = [...currMap.keys()].filter(k => !prevMap.has(k))
  const removed = [...prevMap.keys()].filter(k => !currMap.has(k))

  return { added, removed }
}

// ── main ─────────────────────────────────────────────────────────────────────

const curr = readCurrentManifest()
const ref  = readReferenceManifest()

if (!ref) {
  console.log(`${DIM}No HEAD commit yet — skipping design diff (this is the first baseline).${RESET}`)
  process.exit(0)
}

const { manifest: prev, label } = ref

console.log(`${CYAN}Comparing local manifest vs ${label}${RESET}\n`)

const tokenDiff = diffTokens(prev.tokens ?? [], curr.tokens ?? [])
const compDiff  = diffComponents(prev.components ?? [], curr.components ?? [])

const totalChanges =
  tokenDiff.changed.length +
  tokenDiff.added.length +
  tokenDiff.removed.length +
  compDiff.added.length +
  compDiff.removed.length

// ── output ───────────────────────────────────────────────────────────────────

if (totalChanges === 0) {
  console.log(`${GREEN}✓ Design unchanged — local matches ${label}.${RESET}`)
  process.exit(0)
}

const summary = [
  tokenDiff.changed.length  && `${tokenDiff.changed.length} token(s) changed`,
  tokenDiff.added.length    && `${tokenDiff.added.length} token(s) added`,
  tokenDiff.removed.length  && `${tokenDiff.removed.length} token(s) removed`,
  compDiff.added.length     && `${compDiff.added.length} component(s) added`,
  compDiff.removed.length   && `${compDiff.removed.length} component(s) removed`,
].filter(Boolean).join(', ')

console.log(`${BOLD}${YELLOW}⚠  Design has changed:${RESET} ${summary}\n`)

if (!SUMMARY_ONLY) {
  if (tokenDiff.changed.length) {
    console.log(`${BOLD}Token values changed:${RESET}`)
    for (const { key, from, to, kind } of tokenDiff.changed) {
      console.log(`  ${DIM}[${kind}]${RESET} ${key}`)
      console.log(`    ${RED}- ${from}${RESET}`)
      console.log(`    ${GREEN}+ ${to}${RESET}`)
    }
    console.log()
  }

  if (tokenDiff.added.length) {
    console.log(`${BOLD}Tokens added:${RESET}`)
    for (const t of tokenDiff.added)
      console.log(`  ${GREEN}+ ${tokenKey(t)}  ${DIM}${t.value}${RESET}`)
    console.log()
  }

  if (tokenDiff.removed.length) {
    console.log(`${BOLD}Tokens removed:${RESET}`)
    for (const t of tokenDiff.removed)
      console.log(`  ${RED}- ${tokenKey(t)}  ${DIM}${t.value}${RESET}`)
    console.log()
  }

  if (compDiff.added.length) {
    console.log(`${BOLD}Components added:${RESET}`)
    for (const name of compDiff.added) console.log(`  ${GREEN}+ ${name}${RESET}`)
    console.log()
  }

  if (compDiff.removed.length) {
    console.log(`${BOLD}Components removed:${RESET}`)
    for (const name of compDiff.removed) console.log(`  ${RED}- ${name}${RESET}`)
    console.log()
  }

  console.log(`${DIM}→ Run "npm run test:design" to check if UI code still matches the new design.${RESET}`)
  console.log(`${DIM}→ After updating code, run "npm run test:design:update" to update baselines.${RESET}\n`)
}

process.exit(1)
