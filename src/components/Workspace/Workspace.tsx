import { TabItem } from '../../App'
import Tabs from './Tabs'
import StatusBar from './StatusBar'
import EditorContainer from './Editor/EditorContainer'
import './Workspace.css'

interface WorkspaceProps {
  activeFile: string
  tabs: TabItem[]
  onTabClick: (fileId: string) => void
  onTabClose: (fileId: string) => void
}

export default function Workspace({ activeFile, tabs, onTabClick, onTabClose }: WorkspaceProps) {
  return (
    <main id="workspace">
      <a href="#workspace" className="skip-link">Skip to content</a>
      <Tabs
        tabs={tabs}
        activeFile={activeFile}
        onTabClick={onTabClick}
        onTabClose={onTabClose}
      />
      <EditorContainer activeFile={activeFile} openTabs={tabs} />
      <StatusBar activeFile={activeFile} />
    </main>
  )
}
