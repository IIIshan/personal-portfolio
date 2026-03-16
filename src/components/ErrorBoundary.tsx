import { Component, type ReactNode } from 'react'

interface Props {
  children: ReactNode
}

interface State {
  hasError: boolean
  error: Error | null
}

export default class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error }
  }

  render() {
    if (this.state.hasError) {
      return (
        <div
          style={{
            minHeight: '100vh',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'var(--bg-void)',
            color: 'var(--accent-b)',
            fontFamily: 'var(--font-mono)',
            padding: '2rem',
            textAlign: 'center',
          }}
        >
          <pre
            style={{
              fontSize: '1.5rem',
              marginBottom: '1rem',
              color: 'var(--accent-primary)',
            }}
          >
{`SEGFAULT: Unrecoverable render error in /app`}
          </pre>
          <p style={{ color: 'var(--fg-secondary)', marginBottom: '1.5rem' }}>
            {this.state.error?.message || 'An unexpected error occurred'}
          </p>
          <button
            onClick={() => window.location.reload()}
            style={{
              background: 'var(--accent-primary)',
              color: 'var(--bg-void)',
              border: 'none',
              padding: '0.75rem 1.5rem',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.875rem',
              fontWeight: 700,
              cursor: 'pointer',
              borderRadius: '4px',
            }}
          >
            reload
          </button>
        </div>
      )
    }

    return this.props.children
  }
}
