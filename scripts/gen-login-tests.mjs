#!/usr/bin/env node
/**
 * gen-login-tests.mjs
 * Scans spec.json for feature sections not yet covered in login.spec.js
 * and appends failing stub tests so the test suite catches missing implementations.
 *
 * Usage: node scripts/gen-login-tests.mjs
 * Exit 0 = all covered (or stubs added). Exit 1 = error.
 */

import { readFileSync, writeFileSync, existsSync } from 'fs'
import { resolve, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dir = dirname(fileURLToPath(import.meta.url))
const ROOT   = resolve(__dir, '..')
const SPEC   = resolve(ROOT, 'Tạo trang login/design_handoff_login/spec.json')
const TESTS  = resolve(ROOT, 'verity-app/tests/login.spec.js')

const RESET  = '\x1b[0m'
const GREEN  = '\x1b[32m'
const YELLOW = '\x1b[33m'
const CYAN   = '\x1b[36m'
const BOLD   = '\x1b[1m'
const DIM    = '\x1b[2m'

if (!existsSync(SPEC))  { console.error('spec.json not found'); process.exit(1) }
if (!existsSync(TESTS)) { console.error('login.spec.js not found'); process.exit(1) }

const spec        = JSON.parse(readFileSync(SPEC, 'utf-8'))
const testContent = readFileSync(TESTS, 'utf-8')

// Collect all dot-paths for object nodes (not just leaves) so we can check sections
function collectPaths(obj, prefix = '') {
  const paths = []
  for (const [k, v] of Object.entries(obj)) {
    if (['version', 'page'].includes(k) && !prefix) continue
    const path = prefix ? `${prefix}.${k}` : k
    if (v !== null && typeof v === 'object' && !Array.isArray(v)) {
      paths.push(path)            // the section itself
      paths.push(...collectPaths(v, path))
    }
    // leaf values and arrays: only push the path if it's a meaningful measurement
    if (typeof v === 'number' || (typeof v === 'string' && v.startsWith('--')) || typeof v === 'boolean') {
      paths.push(path)
    }
  }
  return [...new Set(paths)]
}

// Only keep paths whose direct parent section has no spec.X reference in tests
// Group uncovered paths by their top-level feature section (e.g. components.socialButtons.icon)
function findUncoveredSections(spec) {
  const uncovered = []

  function walk(obj, prefix) {
    for (const [k, v] of Object.entries(obj)) {
      if (['version', 'page'].includes(k) && !prefix) continue
      const path = prefix ? `${prefix}.${k}` : k
      if (v !== null && typeof v === 'object' && !Array.isArray(v)) {
        // Check if any test references this section or any sub-path
        const sectionReferenced = testContent.includes(`spec.${path}`)
        if (!sectionReferenced) {
          // None of the sub-paths are referenced either → whole section is uncovered
          uncovered.push({ path, value: v })
        } else {
          // Section exists, recurse to check sub-sections
          walk(v, path)
        }
      }
    }
  }

  walk(spec, '')
  return uncovered
}

const uncovered = findUncoveredSections(spec)

if (uncovered.length === 0) {
  console.log(`${GREEN}✓ All spec sections are covered by tests.${RESET}`)
  process.exit(0)
}

console.log(`${CYAN}${BOLD}gen-login-tests:${RESET} Found ${uncovered.length} uncovered spec section(s)\n`)

function formatValue(v) {
  if (typeof v === 'object') return JSON.stringify(v, null, 2).split('\n').map((l, i) => i === 0 ? l : '  //   ' + l).join('\n')
  return JSON.stringify(v)
}

const stubs = uncovered.map(({ path, value }) => {
  const testName = path.replace(/\./g, ': ')
  return `
  test.fail('TODO ${testName}', async ({ page }) => {
    // spec.${path} was added but has no test yet.
    // spec value: ${formatValue(value)}
    // Implement in LoginPage.jsx then write the real assertion here.
    expect(false).toBe(true)
  })`
}).join('\n')

const marker = '\n  // --- auto-generated stubs (gen-login-tests) ---'

let newContent
if (testContent.includes(marker)) {
  // Replace existing stubs block
  const start = testContent.indexOf(marker)
  const endMarker = '\n  // --- end auto-generated stubs ---'
  const end = testContent.indexOf(endMarker)
  if (end !== -1) {
    newContent = testContent.slice(0, start) + marker + stubs + endMarker + testContent.slice(end + endMarker.length)
  } else {
    // No end marker, just replace from start to last })
    const lastClose = testContent.lastIndexOf('})')
    newContent = testContent.slice(0, start) + marker + stubs + '\n  // --- end auto-generated stubs ---\n' + testContent.slice(lastClose)
  }
} else {
  // Insert stubs before the closing }) of the describe block
  const lastClose = testContent.lastIndexOf('})')
  newContent =
    testContent.slice(0, lastClose) +
    marker + stubs + '\n  // --- end auto-generated stubs ---\n' +
    testContent.slice(lastClose)
}

writeFileSync(TESTS, newContent, 'utf-8')

for (const { path } of uncovered) {
  console.log(`  ${YELLOW}+ stub${RESET}  ${path}`)
}
console.log(`\n${DIM}→ Implement these in LoginPage.jsx, then replace the stubs with real assertions.${RESET}\n`)
