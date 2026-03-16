import { StrictMode } from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import ErrorBoundary from './components/ErrorBoundary'
import './index.css'
import '@fontsource/inter/300.css'
import '@fontsource/inter/400.css'
import '@fontsource/jetbrains-mono/400.css'
import '@fontsource/jetbrains-mono/700.css'

const rootElement = document.getElementById('root')
if (!rootElement) throw new Error('Root element #root not found in index.html')

ReactDOM.createRoot(rootElement).render(
  <StrictMode>
    <ErrorBoundary>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ErrorBoundary>
  </StrictMode>
)
