import { useState } from 'react'
import { Button, Input, Checkbox } from '../ds'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [remember, setRemember] = useState(true)

  function handleSubmit(e) {
    e.preventDefault()
  }

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
            Continue with Google
          </Button>
          <Button variant="secondary" size="lg" style={{ width: '100%' }}>
            Continue with GitHub
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
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={e => setPassword(e.target.value)}
            size="lg"
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
