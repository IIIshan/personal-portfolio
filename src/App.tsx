import { useState, useCallback, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { PATH_TO_FILE_ID } from './data/fileTree'
import { VAULT_TITLE } from './data/content'
import GuideLine from './components/GuideLine'
import Sidebar from './components/Sidebar/Sidebar'
import Workspace from './components/Workspace/Workspace'

export interface TabItem {
  id: string
  label: string
}

const DEFAULT_FILE = 'profile.md'
const MOBILE_BREAKPOINT = 767

export default function App() {
  const location = useLocation()
  const navigate = useNavigate()
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(() => window.innerWidth <= MOBILE_BREAKPOINT)

  // Track mobile state
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= MOBILE_BREAKPOINT)
    }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  // Derive the active file from the current URL, fall back to default
  const knownPath = PATH_TO_FILE_ID[location.pathname]
  const isNotFound = !knownPath && location.pathname !== '/'
  const activeFile = knownPath ?? DEFAULT_FILE

  const [tabs, setTabs] = useState<TabItem[]>([{ id: DEFAULT_FILE, label: DEFAULT_FILE }])

  // Keep tabs in sync when the URL changes (e.g. browser back/forward)
  useEffect(() => {
    setTabs((prev) => {
      if (prev.some((t) => t.id === activeFile)) return prev
      return [...prev, { id: activeFile, label: activeFile }]
    })
  }, [activeFile])

  const handleFileSelect = useCallback((fileId: string, path: string) => {
    navigate(path)
    setTabs((prev) => {
      if (prev.some((t) => t.id === fileId)) return prev
      return [...prev, { id: fileId, label: fileId }]
    })
  }, [navigate])

  const handleTabClick = useCallback((fileId: string) => {
    // Find the path for this file id from PATH_TO_FILE_ID
    const path = Object.keys(PATH_TO_FILE_ID).find((p) => PATH_TO_FILE_ID[p] === fileId) ?? '/'
    navigate(path)
  }, [navigate])

  const handleTabClose = useCallback((fileId: string) => {
    setTabs((prev) => {
      const remaining = prev.filter((t) => t.id !== fileId)
      // If we closed the active tab, navigate to the nearest remaining tab
      if (fileId === activeFile && remaining.length > 0) {
        const closedIndex = prev.findIndex((t) => t.id === fileId)
        const nextTab = remaining[Math.min(closedIndex, remaining.length - 1)]
        const path = Object.keys(PATH_TO_FILE_ID).find((p) => PATH_TO_FILE_ID[p] === nextTab.id) ?? '/'
        setTimeout(() => navigate(path), 0)
      }
      return remaining
    })
  }, [activeFile, navigate])

  return (
    <>
      <GuideLine />
      {isMobile && (
        <header className="mobile-header">
          <button
            className="hamburger-menu"
            onClick={() => setSidebarOpen(!sidebarOpen)}
            aria-label={sidebarOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={sidebarOpen}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              {sidebarOpen ? (
                <path d="M6 6l12 12M6 18L18 6" />
              ) : (
                <>
                  <line x1="3" y1="6" x2="21" y2="6" />
                  <line x1="3" y1="12" x2="21" y2="12" />
                  <line x1="3" y1="18" x2="21" y2="18" />
                </>
              )}
            </svg>
          </button>
          <span className="mobile-title">{VAULT_TITLE}</span>
        </header>
      )}
      <Sidebar
        isOpen={sidebarOpen}
        onToggle={() => setSidebarOpen(!sidebarOpen)}
        activeFile={activeFile}
        onFileSelect={handleFileSelect}
      />
      <Workspace
        activeFile={activeFile}
        tabs={tabs}
        onTabClick={handleTabClick}
        onTabClose={handleTabClose}
        isNotFound={isNotFound}
      />
    </>
  )
}
