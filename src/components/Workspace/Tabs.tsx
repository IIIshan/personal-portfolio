import { TabItem } from '../../App'
import './Tabs.css'

interface TabsProps {
  tabs: TabItem[]
  activeFile: string
  onTabClick: (fileId: string) => void
  onTabClose: (fileId: string) => void
}

export default function Tabs({ tabs, activeFile, onTabClick, onTabClose }: TabsProps) {
  if (tabs.length === 0) {
    return <div className="tabs tabs--empty" />
  }

  return (
    <div className="tabs" role="tablist">
      {tabs.map((tab) => {
        const isActive = tab.id === activeFile
        return (
          <div
            key={tab.id}
            className={`tab${isActive ? ' active' : ''}`}
            role="tab"
            aria-selected={isActive}
            tabIndex={isActive ? 0 : -1}
            onClick={() => onTabClick(tab.id)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault()
                onTabClick(tab.id)
              }
            }}
          >
            {tab.label}
            <button
              className="close"
              aria-label={`Close ${tab.label}`}
              tabIndex={-1}
              onClick={(e) => {
                e.stopPropagation()
                onTabClose(tab.id)
              }}
            >
              ×
            </button>
          </div>
        )
      })}
    </div>
  )
}
