import { useState, useEffect, useRef, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { FILE_TREE, FileNode } from '../../data/fileTree'
import { VAULT_TITLE } from '../../data/content'
import TreeItem from './TreeItem'
import {
  UserIcon, LayersIcon, FolderIcon, FolderOpenIcon,
  TerminalIcon, FileTextIcon, ArchiveIcon, ToolsIcon, PenIcon,
} from './icons'
import './Sidebar.css'

interface SidebarProps {
  activeFile: string
  onFileSelect: (fileId: string, path: string) => void
}

// ─── Icon + color resolution ──────────────────────────────────────────────────

const COLOR_PRIMARY  = 'var(--accent-primary)'
const COLOR_A        = 'var(--accent-a)'
const COLOR_B        = 'var(--accent-b)'
const COLOR_C        = 'var(--accent-c)'
const COLOR_MUTED    = 'var(--fg-muted)'

function resolveIcon(
  iconName: string | undefined,
  isFolder: boolean,
  isOpen: boolean
): { iconNode: React.ReactNode; iconColor: string } {
  switch (iconName) {
    case 'user':           return { iconNode: <UserIcon />,       iconColor: COLOR_PRIMARY }
    case 'layers':         return { iconNode: <LayersIcon />,     iconColor: COLOR_A       }
    case 'terminal':       return { iconNode: <TerminalIcon />,   iconColor: COLOR_B       }
    case 'tools':          return { iconNode: <ToolsIcon />,     iconColor: COLOR_B       }
    case 'filetext':       return { iconNode: <FileTextIcon />,   iconColor: COLOR_C       }
    case 'pen':            return { iconNode: <PenIcon />,        iconColor: COLOR_C       }
    case 'archive':        return { iconNode: isOpen ? <FolderOpenIcon /> : <ArchiveIcon />, iconColor: COLOR_MUTED }
    default:
      if (isFolder) return { iconNode: isOpen ? <FolderOpenIcon /> : <FolderIcon />, iconColor: COLOR_MUTED }
      return { iconNode: <FileTextIcon />, iconColor: COLOR_MUTED }
  }
}

// ─── Initial open state ───────────────────────────────────────────────────────

function buildInitialOpenState(nodes: FileNode[]): Record<string, boolean> {
  const state: Record<string, boolean> = {}
  for (const node of nodes) {
    if (node.isFolder) {
      state[node.id] = node.defaultOpen ?? false
      if (node.children) {
        Object.assign(state, buildInitialOpenState(node.children))
      }
    }
  }
  return state
}

// ─── Recursive tree renderer ──────────────────────────────────────────────────

function renderTree(
  nodes: FileNode[],
  depth: number,
  openFolders: Record<string, boolean>,
  activeFile: string,
  toggleFolder: (id: string) => void,
  onFileSelect: (id: string, path: string) => void,
  collapsed: boolean
): React.ReactNode {
  return nodes.map((node) => {
    const indent = depth as 0 | 1 | 2
    const isOpen = !!openFolders[node.id]
    const { iconNode, iconColor } = resolveIcon(node.iconName, !!node.isFolder, isOpen)

    if (node.isFolder) {
      return (
        <div key={node.id}>
          <TreeItem
            label={node.label}
            iconNode={iconNode}
            iconColor={iconColor}
            indent={indent}
            isFolder
            isOpen={isOpen}
            collapsed={collapsed}
            onClick={() => toggleFolder(node.id)}
          />
          {isOpen && node.children && (
            renderTree(
              node.children,
              Math.min(depth + 1, 2),
              openFolders,
              activeFile,
              toggleFolder,
              onFileSelect,
              collapsed
            )
          )}
        </div>
      )
    }

    return (
      <TreeItem
        key={node.id}
        label={node.label}
        iconNode={iconNode}
        iconColor={iconColor}
        indent={indent}
        isActive={activeFile === node.id}
        collapsed={collapsed}
        onClick={() => onFileSelect(node.id, node.path ?? '/')}
      />
    )
  })
}

// ─── Mobile media query hook ──────────────────────────────────────────────────

const MOBILE_MQ = '(max-width: 767px)'

function useIsMobile(): boolean {
  const [isMobile, setIsMobile] = useState(() => window.matchMedia(MOBILE_MQ).matches)

  useEffect(() => {
    const mql = window.matchMedia(MOBILE_MQ)
    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches)
    mql.addEventListener('change', handler)
    return () => mql.removeEventListener('change', handler)
  }, [])

  return isMobile
}

// ─── Sidebar component ────────────────────────────────────────────────────────

export default function Sidebar({ activeFile, onFileSelect }: SidebarProps) {
  const navigate = useNavigate()
  const isMobile = useIsMobile()
  const [collapsed, setCollapsed] = useState(() => window.innerWidth < 768)
  const [openFolders, setOpenFolders] = useState<Record<string, boolean>>(
    buildInitialOpenState(FILE_TREE)
  )

  // Refs for focus management
  const toggleBtnRef = useRef<HTMLButtonElement>(null)
  const sidebarRef = useRef<HTMLElement>(null)
  const previousFocusRef = useRef<HTMLElement | null>(null)

  const isDrawerOpen = isMobile && !collapsed

  const toggleFolder = (id: string) => {
    setOpenFolders((prev) => ({ ...prev, [id]: !prev[id] }))
  }

  // Close the drawer (mobile only)
  const closeDrawer = useCallback(() => {
    setCollapsed(true)
  }, [])

  // File select wrapper — auto-close drawer on mobile
  const handleFileSelect = useCallback((fileId: string, path: string) => {
    onFileSelect(fileId, path)
    if (isMobile) closeDrawer()
  }, [onFileSelect, isMobile, closeDrawer])

  // ── Focus management: save/restore focus, focus trap ──────────────────────

  useEffect(() => {
    if (!isDrawerOpen) {
      // Restore focus to the toggle button when drawer closes
      if (previousFocusRef.current) {
        previousFocusRef.current.focus()
        previousFocusRef.current = null
      }
      return
    }

    // Save the element that had focus before drawer opened
    previousFocusRef.current = document.activeElement as HTMLElement

    // Focus the first tree item in the sidebar
    const firstFocusable = sidebarRef.current?.querySelector<HTMLElement>(
      'button, [tabindex="0"]'
    )
    firstFocusable?.focus()

    // ESC key + focus trap
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault()
        closeDrawer()
        return
      }

      if (e.key === 'Tab') {
        const focusableEls = sidebarRef.current?.querySelectorAll<HTMLElement>(
          'button, [href], [tabindex="0"]'
        )
        if (!focusableEls?.length) return

        const first = focusableEls[0]
        const last = focusableEls[focusableEls.length - 1]

        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault()
          last.focus()
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault()
          first.focus()
        }
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [isDrawerOpen, closeDrawer])

  // ── Build className ───────────────────────────────────────────────────────

  const sidebarClasses = [
    collapsed ? 'sidebar--collapsed' : '',
    isDrawerOpen ? 'sidebar--mobile-open' : '',
  ].filter(Boolean).join(' ') || undefined

  return (
    <>
      {/* Dark scrim behind drawer on mobile */}
      {isDrawerOpen && (
        <div
          className="sidebar-backdrop"
          onClick={closeDrawer}
          aria-hidden="true"
        />
      )}

      <aside
        ref={sidebarRef}
        id="sidebar"
        aria-label="File explorer"
        aria-modal={isDrawerOpen || undefined}
        role={isDrawerOpen ? 'dialog' : undefined}
        className={sidebarClasses}
      >
        <div className="sidebar-header">
          {!collapsed && (
            <button
              className="vault-title"
              onClick={() => {
                navigate('/')
                if (isMobile) closeDrawer()
              }}
              aria-label="Go to home"
            >
              {VAULT_TITLE}
            </button>
          )}
          <button
            ref={toggleBtnRef}
            className="vault-actions"
            aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
            onClick={() => setCollapsed((c) => !c)}
          >
            <svg viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
              <line x1="9" y1="3" x2="9" y2="21" />
            </svg>
          </button>
        </div>

        <div className="tree-container" role="tree">
          {renderTree(FILE_TREE, 0, openFolders, activeFile, toggleFolder, handleFileSelect, collapsed)}
        </div>
      </aside>
    </>
  )
}
