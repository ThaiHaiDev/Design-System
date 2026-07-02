import { test, expect } from '@playwright/test'

// Design spec: Tạo trang login/design_handoff_login/README.md
// Token values: Verity Design System/tokens/colors.css + effects.css + spacing.css

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

  test('card: width = 360px', async ({ page }) => {
    const w = await page.locator('[data-testid="login-card"]').evaluate(el => el.offsetWidth)
    expect(w).toBe(360)
  })

  test('card: background = --bg-secondary = #FFFFFF', async ({ page }) => {
    const bg = await css(page.locator('[data-testid="login-card"]'), 'background-color')
    expect(bg).toBe('rgb(255, 255, 255)')
  })

  test('card: border-radius = --radius-xl = 16px', async ({ page }) => {
    const r = await css(page.locator('[data-testid="login-card"]'), 'border-radius')
    expect(r).toBe('16px')
  })

  test('card: padding = --space-8 = 32px all sides', async ({ page }) => {
    const card = page.locator('[data-testid="login-card"]')
    expect(await css(card, 'padding-top')).toBe('32px')
    expect(await css(card, 'padding-right')).toBe('32px')
    expect(await css(card, 'padding-bottom')).toBe('32px')
    expect(await css(card, 'padding-left')).toBe('32px')
  })

  // --- Wordmark ---

  test('wordmark: text = "Verity", font-size = 24px, font-weight = bold', async ({ page }) => {
    const wordmark = page.locator('[data-testid="login-card"] > div').first()
    expect((await wordmark.textContent())?.trim()).toBe('Verity')
    expect(await css(wordmark, 'font-size')).toBe('24px')
    const w = await css(wordmark, 'font-weight')
    expect(['700', '800']).toContain(w)
  })

  // --- Social buttons ---

  test('social buttons: exist, height = 44px, transparent background', async ({ page }) => {
    const google = page.getByRole('button', { name: 'Continue with Google' })
    const github = page.getByRole('button', { name: 'Continue with GitHub' })
    await expect(google).toBeVisible()
    await expect(github).toBeVisible()
    expect(await google.evaluate(el => el.offsetHeight)).toBe(44)
    expect(await github.evaluate(el => el.offsetHeight)).toBe(44)
    // secondary variant = transparent background
    const bg = await css(google, 'background-color')
    expect(bg).toMatch(/rgba\(0, 0, 0, 0\)|transparent/)
  })

  // --- Divider ---

  test('OR divider: visible', async ({ page }) => {
    const or = page.locator('span').filter({ hasText: /^OR$/ })
    await expect(or).toBeVisible()
  })

  // --- Form inputs (Input component renders label + input separately, no htmlFor) ---

  test('email input: visible, type=email', async ({ page }) => {
    const input = page.locator('input[type="email"]')
    await expect(input).toBeVisible()
    expect(await input.getAttribute('placeholder')).toBe('you@company.com')
  })

  test('password input: visible, type=password', async ({ page }) => {
    const input = page.locator('input[type="password"]')
    await expect(input).toBeVisible()
  })

  // --- Remember me (Checkbox hides native input, uses custom visual) ---

  test('remember me: label text visible, native checkbox checked by default', async ({ page }) => {
    await expect(page.getByText('Remember me')).toBeVisible()
    // Native checkbox is display:none but still checked in DOM
    const checked = await page.locator('input[type="checkbox"]').evaluate(el => el.checked)
    expect(checked).toBe(true)
  })

  // --- Forgot password ---

  test('forgot password: link visible, accent color', async ({ page }) => {
    const link = page.getByText('Forgot password?')
    await expect(link).toBeVisible()
    expect(await css(link, 'color')).toBe('rgb(37, 99, 235)') // --accent-primary
  })

  // --- Sign in button ---

  test('sign in button: height = 44px, primary blue, full width', async ({ page }) => {
    const btn = page.getByRole('button', { name: 'Sign in' })
    expect(await btn.evaluate(el => el.offsetHeight)).toBe(44)
    // primary variant = --accent-primary = blue-600 = #2563eb
    expect(await css(btn, 'background-color')).toBe('rgb(37, 99, 235)')
    // full width = matches card inner width (360 - 64px padding)
    const btnW = await btn.evaluate(el => el.offsetWidth)
    expect(btnW).toBeGreaterThanOrEqual(290)
    expect(btnW).toBeLessThanOrEqual(300)
  })

  // --- Sign up row ---

  test('sign up link: visible, accent color, medium weight', async ({ page }) => {
    const link = page.getByRole('link', { name: 'Sign up' })
    await expect(link).toBeVisible()
    expect(await css(link, 'color')).toBe('rgb(37, 99, 235)')
    const w = await css(link, 'font-weight')
    expect(['500', '600']).toContain(w)
  })
})
