#!/usr/bin/env node
/**
 * design-diff.mjs
 * Compare _ds_manifest.json (current) vs git HEAD version.
 * Exit 0 = no changes. Exit 1 = design changed (tokens / components differ).
 *
 * Usage:
 *   node scripts/design-diff.mjs              # compare vs HEAD
 *   node scripts/design-diff.mjs --summary    # one-line summary only
 */

import { execSync } from 'child_process'
import { readFileSync } from 'fs'
import { resolve, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dir = dirname(fileURLToPath(import.meta.url))
const ROOT = resolve(__dir, '..')
const MANIFEST_REL = 'Verity Design System/_ds_manifest.json'
const MANIFEST_ABS = resolve(ROOT, MANIFEST_REL)
const SUMMARY_ONLY = process.argv.includes('--summary')

const RESET = '\x1b[0m'
const RED   = '\x1b[31m'
const GREEN = '\x1b[32m'
const YELLOW = '\x1b[33m'
const BOLD  = '\x1b[1m'
const DIM   = '\x1b[2m'

// ── helpers ──────────────────────────────────────────────────────────────────

function readCurrentManifest() {
  return JSON.parse(readFileSync(MANIFEST_ABS, 'utf-8'))
}

function readHeadManifest() {
  try {
    const raw = execSync(`git show HEAD:"${MANIFEST_REL}"`, {
      cwd: ROOT,
      encoding: 'utf-8',
      stdio: ['pipe', 'pipe', 'pipe'],
    })
    return JSON.parse(raw)
  } catch {
    return null // no HEAD yet (first commit)
  }
}

function tokenKey(t) {
  return t.scope ? `${t.name}[${t.scope}]` : t.name
}

function diffTokens(prev, curr) {
  const prevMap = new Map(prev.map(t => [tokenKey(t), t]))
  const currMap = new Map(curr.map(t => [tokenKey(t), t]))

  const added    = []
  const removed  = []
  const changed  = []

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
const prev = readHeadManifest()

if (!prev) {
  console.log(`${DIM}No HEAD commit yet — skipping design diff (this is the first baseline).${RESET}`)
  process.exit(0)
}

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
  console.log(`${GREEN}✓ Design unchanged — manifest matches HEAD.${RESET}`)
  process.exit(0)
}

const summary = [
  tokenDiff.changed.length  && `${tokenDiff.changed.length} token(s) changed`,
  tokenDiff.added.length    && `${tokenDiff.added.length} token(s) added`,
  tokenDiff.removed.length  && `${tokenDiff.removed.length} token(s) removed`,
  compDiff.added.length     && `${compDiff.added.length} component(s) added`,
  compDiff.removed.length   && `${compDiff.removed.length} component(s) removed`,
].filter(Boolean).join(', ')

console.log(`\n${BOLD}${YELLOW}⚠  Design has changed:${RESET} ${summary}\n`)

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

  console.log(`${DIM}→ Run "npm run test:design" to check if code still matches new design.${RESET}`)
  console.log(`${DIM}→ After updating code, run "npm run test:design:update" to update baselines.${RESET}\n`)
}

process.exit(1)
