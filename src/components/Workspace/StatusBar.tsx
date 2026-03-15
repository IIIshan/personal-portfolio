import './StatusBar.css'

interface StatusBarProps {
  activeFile: string
}

export default function StatusBar({ activeFile }: StatusBarProps) {
  return (
    <footer id="statusbar" aria-label="Status bar">
      <div className="status-left">
        <span className="status-item">
          <span className="status-icon online" aria-hidden="true" />
          SYSTEM.ONLINE
        </span>
        <span className="status-item">{activeFile}</span>
      </div>
      <div className="status-right">
        <span className="status-item">UTF-8</span>
        <span className="status-item">LF</span>
        <span className="status-item">Markdown</span>
      </div>
    </footer>
  )
}
