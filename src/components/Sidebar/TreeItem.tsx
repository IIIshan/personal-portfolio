import './TreeItem.css'

interface TreeItemProps {
  label: string
  iconNode: React.ReactNode
  iconColor: string
  indent?: 0 | 1 | 2
  isFolder?: boolean
  isOpen?: boolean
  isActive?: boolean
  collapsed?: boolean
  onClick?: () => void
}

export default function TreeItem({
  label,
  iconNode,
  iconColor,
  indent = 0,
  isFolder = false,
  isOpen = false,
  isActive = false,
  collapsed = false,
  onClick,
}: TreeItemProps) {
  const classes = [
    'tree-item',
    isFolder ? 'folder' : '',
    isOpen && isFolder ? 'open' : '',
    isActive ? 'active' : '',
    collapsed ? 'collapsed' : '',
    indent === 1 ? 'indent-1' : indent === 2 ? 'indent-2' : '',
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <div
      className={classes}
      onClick={onClick}
      role="treeitem"
      tabIndex={0}
      aria-expanded={isFolder ? isOpen : undefined}
      aria-selected={!isFolder ? isActive : undefined}
      title={collapsed ? label : undefined}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault()
          onClick?.()
        }
      }}
    >
      <span className="icon" style={{ color: iconColor }} aria-hidden="true">
        {iconNode}
      </span>
      {!collapsed && <span className="tree-label">{label}</span>}
    </div>
  )
}
