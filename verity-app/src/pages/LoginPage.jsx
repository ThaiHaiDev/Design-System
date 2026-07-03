import { useState } from 'react'
import { Button, Input, Checkbox } from '../ds'

function GoogleIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
      <path d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844a4.14 4.14 0 0 1-1.796 2.716v2.259h2.908C16.658 14.233 17.64 11.925 17.64 9.2z" fill="#4285F4"/>
      <path d="M9 18c2.43 0 4.467-.806 5.956-2.18l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 0 0 9 18z" fill="#34A853"/>
      <path d="M3.964 10.71A5.41 5.41 0 0 1 3.682 9c0-.593.102-1.17.282-1.71V4.958H.957A8.996 8.996 0 0 0 0 9c0 1.452.348 2.827.957 4.042l3.007-2.332z" fill="#FBBC05"/>
      <path d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 0 0 .957 4.958L3.964 7.29C4.672 5.163 6.656 3.58 9 3.58z" fill="#EA4335"/>
    </svg>
  )
}

function GitHubIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="currentColor" aria-hidden="true">
      <path fillRule="evenodd" clipRule="evenodd" d="M9 0C4.027 0 0 4.027 0 9c0 3.98 2.582 7.354 6.162 8.546.45.082.615-.195.615-.434 0-.214-.007-.782-.012-1.534-2.504.544-3.033-1.207-3.033-1.207-.409-1.039-1-1.316-1-1.316-.817-.559.062-.548.062-.548.904.064 1.38.928 1.38.928.803 1.376 2.107.979 2.62.749.082-.582.314-.979.572-1.204-1.999-.227-4.101-.999-4.101-4.448 0-.982.351-1.787.928-2.416-.093-.228-.402-1.143.088-2.383 0 0 .757-.243 2.48.924A8.645 8.645 0 0 1 9 4.524c.766.004 1.538.104 2.26.304 1.722-1.167 2.477-.924 2.477-.924.492 1.24.183 2.155.09 2.383.578.629.927 1.434.927 2.416 0 3.458-2.106 4.219-4.11 4.441.323.279.611.83.611 1.673 0 1.207-.011 2.181-.011 2.479 0 .241.163.521.619.433C15.421 16.351 18 12.979 18 9c0-4.973-4.027-9-9-9z"/>
    </svg>
  )
}

function EyeIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
      <circle cx="12" cy="12" r="3"/>
    </svg>
  )
}

function EyeOffIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/>
      <line x1="1" y1="1" x2="23" y2="23"/>
    </svg>
  )
}

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [remember, setRemember] = useState(true)
  const [showPassword, setShowPassword] = useState(false)

  function handleSubmit(e) {
    e.preventDefault()
  }

  const toggleButton = (
    <button
      type="button"
      aria-label="Toggle password visibility"
      onClick={() => setShowPassword(v => !v)}
      style={{
        background: 'none',
        border: 'none',
        padding: 0,
        cursor: 'pointer',
        color: 'var(--text-tertiary)',
        display: 'flex',
        alignItems: 'center',
        lineHeight: 0,
      }}
    >
      {showPassword ? <EyeOffIcon /> : <EyeIcon />}
    </button>
  )

  return (
    <div style={{
      minHeight: '100vh',
      width: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: 'var(--font-body)',
      background: 'var(--bg-primary)',
      boxSizing: 'border-box',
      padding: 'var(--space-8) 0',
    }}>
      <div style={{
        width: 360,
        flexShrink: 0,
        background: 'var(--bg-secondary)',
        border: '1px solid var(--border-default)',
        borderRadius: 'var(--radius-xl)',
        boxShadow: 'var(--shadow-sm)',
        padding: 'var(--space-8)',
      }} data-testid="login-card">

        {/* Wordmark */}
        <div style={{
          fontSize: 'var(--text-2xl)',
          fontWeight: 'var(--weight-bold)',
          color: 'var(--text-primary)',
          marginBottom: 4,
        }}>
          Verity
        </div>

        {/* Subtitle */}
        <div style={{
          fontSize: 'var(--text-sm)',
          color: 'var(--text-secondary)',
          marginBottom: 'var(--space-6)',
        }}>
          Sign in to your account
        </div>

        {/* Social buttons */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 'var(--space-3)',
          marginBottom: 'var(--space-6)',
        }}>
          <Button variant="secondary" size="lg" style={{ width: '100%' }}>
            <GoogleIcon /> Continue with Google
          </Button>
          <Button variant="secondary" size="lg" style={{ width: '100%' }}>
            <GitHubIcon /> Continue with GitHub
          </Button>
        </div>

        {/* Divider */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: 'var(--space-3)',
          marginBottom: 'var(--space-6)',
        }}>
          <div style={{ flex: 1, height: 1, background: 'var(--border-default)' }} />
          <span style={{ fontSize: 'var(--text-xs)', color: 'var(--text-tertiary)' }}>OR</span>
          <div style={{ flex: 1, height: 1, background: 'var(--border-default)' }} />
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
          <Input
            label="Email"
            type="email"
            placeholder="you@company.com"
            value={email}
            onChange={e => setEmail(e.target.value)}
            size="lg"
          />
          <Input
            label="Password"
            type={showPassword ? 'text' : 'password'}
            placeholder="••••••••"
            value={password}
            onChange={e => setPassword(e.target.value)}
            size="lg"
            rightElement={toggleButton}
          />

          {/* Remember me + Forgot password */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Checkbox
              label="Remember me"
              checked={remember}
              onChange={e => setRemember(e.target.checked)}
            />
            <a href="#" style={{
              fontSize: 'var(--text-sm)',
              color: 'var(--accent-primary)',
              textDecoration: 'none',
            }}>
              Forgot password?
            </a>
          </div>

          <Button type="submit" variant="primary" size="lg" style={{ width: '100%' }}>
            Sign in
          </Button>
        </form>

        {/* Sign-up row */}
        <div style={{
          textAlign: 'center',
          marginTop: 'var(--space-6)',
          fontSize: 'var(--text-sm)',
          color: 'var(--text-secondary)',
        }}>
          Don't have an account?{' '}
          <a href="#" style={{
            color: 'var(--accent-primary)',
            textDecoration: 'none',
            fontWeight: 'var(--weight-medium)',
          }}>
            Sign up
          </a>
        </div>
      </div>
    </div>
  )
}
