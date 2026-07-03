import { test, expect } from '@playwright/test'
import { readFileSync } from 'fs'
import { resolve, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dir = dirname(fileURLToPath(import.meta.url))
const ROOT = resolve(__dir, '../..')

const spec   = JSON.parse(readFileSync(resolve(ROOT, 'Tạo trang login/design_handoff_login/spec.json'), 'utf-8'))
const tokens = JSON.parse(readFileSync(resolve(ROOT, 'scripts/token-values.json'), 'utf-8'))

// Resolve a design token name to its CSS value, or return the value as-is if not a token
function t(value) {
  return tokens[value] ?? value
}

// Parse "32px" → 32
function toPx(value) {
  const resolved = t(value)
  return parseInt(resolved, 10)
}

async function css(locator, prop) {
  return locator.evaluate(
    (el, p) => window.getComputedStyle(el).getPropertyValue(p).trim(),
    prop
  )
}

test.describe('Login Page — design sync', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
    await page.locator('[data-testid="login-card"]').waitFor({ state: 'visible' })
    await page.waitForTimeout(300)
  })

  // --- Layout ---

  test('card: width', async ({ page }) => {
    const w = await page.locator('[data-testid="login-card"]').evaluate(el => el.offsetWidth)
    expect(w).toBe(spec.layout.card.width)
  })

  test('card: background', async ({ page }) => {
    const bg = await css(page.locator('[data-testid="login-card"]'), 'background-color')
    expect(bg).toBe(t(spec.layout.card.background))
  })

  test('card: border-radius', async ({ page }) => {
    const r = await css(page.locator('[data-testid="login-card"]'), 'border-radius')
    expect(r).toBe(t(spec.layout.card.borderRadius))
  })

  test('card: padding', async ({ page }) => {
    const card = page.locator('[data-testid="login-card"]')
    const padding = t(spec.layout.card.padding)
    expect(await css(card, 'padding-top')).toBe(padding)
    expect(await css(card, 'padding-right')).toBe(padding)
    expect(await css(card, 'padding-bottom')).toBe(padding)
    expect(await css(card, 'padding-left')).toBe(padding)
  })

  // --- Wordmark ---

  test('wordmark: text, font-size, font-weight', async ({ page }) => {
    const wordmark = page.locator('[data-testid="login-card"] > div').first()
    expect((await wordmark.textContent())?.trim()).toBe(spec.components.wordmark.text)
    expect(await css(wordmark, 'font-size')).toBe(t(spec.components.wordmark.fontSize))
    expect(await css(wordmark, 'font-weight')).toBe(t(spec.components.wordmark.fontWeight))
  })

  test('wordmark: font-family, letter-spacing, line-height', async ({ page }) => {
    const wordmark = page.getByText(spec.components.wordmark.text, { exact: true })
    await expect(wordmark).toBeVisible()
    expect(await css(wordmark, 'font-family')).toContain('Inter')
    const letterSpacing = await css(wordmark, 'letter-spacing')
    expect(letterSpacing).not.toBe('normal')
    expect(parseFloat(letterSpacing)).toBeLessThan(0)
    expect(await css(wordmark, 'line-height')).toBe(t(spec.components.wordmark.lineHeight))
  })

  test('subtitle: margin-top', async ({ page }) => {
    const subtitle = page.getByText(spec.components.subtitle.text, { exact: true })
    await expect(subtitle).toBeVisible()
    expect(await css(subtitle, 'margin-top')).toBe(t(spec.components.subtitle.marginTop))
  })

  // --- Header / logo mark ---

  test('header: logo mark size, radius, background', async ({ page }) => {
    const { width, height, borderRadius, background, letter } = spec.components.header.logoMark
    const glyph = page.locator('[data-testid="login-card"]').getByText(letter, { exact: true })
    await expect(glyph).toBeVisible()
    const box = glyph.locator('..')
    expect(await box.evaluate(el => el.offsetWidth)).toBe(width)
    expect(await box.evaluate(el => el.offsetHeight)).toBe(height)
    expect(await css(box, 'border-radius')).toBe(t(borderRadius))
    expect(await css(box, 'background-color')).toBe(t(background))
  })

  test('header: logo mark glyph font-size, font-weight, color', async ({ page }) => {
    const { letter, fontSize, fontWeight, color } = spec.components.header.logoMark
    const glyph = page.locator('[data-testid="login-card"]').getByText(letter, { exact: true })
    expect(await css(glyph, 'font-size')).toBe(t(fontSize))
    expect(await css(glyph, 'font-weight')).toBe(t(fontWeight))
    expect(await css(glyph, 'color')).toBe(t(color))
  })

  test('header: container layout (centered column)', async ({ page }) => {
    const { flexDirection, alignItems, marginBottom } = spec.components.header.container
    const glyph = page.locator('[data-testid="login-card"]').getByText(spec.components.header.logoMark.letter, { exact: true })
    const container = glyph.locator('../..')
    expect(await css(container, 'flex-direction')).toBe(flexDirection)
    expect(await css(container, 'align-items')).toBe(alignItems)
    expect(await css(container, 'margin-bottom')).toBe(t(marginBottom))
  })

  // --- Social buttons ---

  test('social buttons: visible, height, transparent background', async ({ page }) => {
    for (const label of spec.components.socialButtons.items) {
      const btn = page.getByRole('button', { name: label })
      await expect(btn).toBeVisible()
      expect(await btn.evaluate(el => el.offsetHeight)).toBe(spec.components.socialButtons.height)
    }
    const bg = await css(page.getByRole('button', { name: spec.components.socialButtons.items[0] }), 'background-color')
    expect(bg).toMatch(/rgba\(0, 0, 0, 0\)|transparent/)
  })

  test('social buttons: icons visible with correct size', async ({ page }) => {
    const { icon, items } = spec.components.socialButtons
    for (const label of items) {
      const btn = page.getByRole('button', { name: label })
      const svgIcon = btn.locator('svg').first()
      await expect(svgIcon).toBeVisible()
      const w = await svgIcon.evaluate(el => el.getAttribute('width') || el.getBoundingClientRect().width)
      expect(Number(w)).toBe(icon.size)
    }
  })

  // --- Divider ---

  test('divider: label visible', async ({ page }) => {
    const label = spec.components.divider.label
    const el = page.locator('span').filter({ hasText: new RegExp(`^${label}$`) })
    await expect(el).toBeVisible()
  })

  // --- Form ---

  test('email input: visible, type, placeholder', async ({ page }) => {
    const { type, placeholder } = spec.components.form.emailInput
    const input = page.locator(`input[type="${type}"]`)
    await expect(input).toBeVisible()
    expect(await input.getAttribute('placeholder')).toBe(placeholder)
  })

  test('password input: visible', async ({ page }) => {
    const { type } = spec.components.form.passwordInput
    await expect(page.locator(`input[type="${type}"]`)).toBeVisible()
  })

  test('password input: visibility toggle button exists', async ({ page }) => {
    const { visibilityToggle } = spec.components.form.passwordInput
    const toggle = page.getByRole('button', { name: new RegExp(visibilityToggle.ariaLabel, 'i') })
    await expect(toggle).toBeVisible()
    const icon = toggle.locator('svg').first()
    await expect(icon).toBeVisible()
    const iconW = await icon.evaluate(el => el.getAttribute('width') || el.getBoundingClientRect().width)
    expect(Number(iconW)).toBe(visibilityToggle.iconSize)
  })

  test('remember me: label visible, default checked state', async ({ page }) => {
    const { label, defaultChecked } = spec.components.form.rememberMe
    await expect(page.getByText(label)).toBeVisible()
    const checked = await page.locator('input[type="checkbox"]').evaluate(el => el.checked)
    expect(checked).toBe(defaultChecked)
  })

  test('forgot password: visible, color', async ({ page }) => {
    const { text, color } = spec.components.form.forgotPassword
    const link = page.getByText(text)
    await expect(link).toBeVisible()
    expect(await css(link, 'color')).toBe(t(color))
  })

  // --- Sign in button ---

  test('sign in button: height, background, full width', async ({ page }) => {
    const { text, height, background } = spec.components.signInButton
    const btn = page.getByRole('button', { name: text })
    expect(await btn.evaluate(el => el.offsetHeight)).toBe(height)
    expect(await css(btn, 'background-color')).toBe(t(background))
    const cardPadding = toPx(spec.layout.card.padding)
    const expectedWidth = spec.layout.card.width - cardPadding * 2
    const btnW = await btn.evaluate(el => el.offsetWidth)
    expect(btnW).toBeGreaterThanOrEqual(expectedWidth - 5)
    expect(btnW).toBeLessThanOrEqual(expectedWidth + 5)
  })

  // --- Sign up row ---

  test('sign up link: visible, color, weight', async ({ page }) => {
    const { linkText, linkColor, linkWeight } = spec.components.signUpRow
    const link = page.getByRole('link', { name: linkText })
    await expect(link).toBeVisible()
    expect(await css(link, 'color')).toBe(t(linkColor))
    expect(await css(link, 'font-weight')).toBe(t(linkWeight))
  })
})
