import {
  FRONTMATTER, HERO_TITLE, TAGS, BIO,
  WORK, PROJECTS, BLOG, STACK,
  CONTACT, QUOTE,
} from '../../../data/content'
import { FILE_VIEW_MAP } from '../../../data/fileTree'
import { TabItem } from '../../../App'
import Frontmatter from './Frontmatter'
import ProjectCard from './ProjectCard'
import TagContainer from './TagContainer'
import './EditorContainer.css'

interface EditorContainerProps {
  activeFile: string
  openTabs: TabItem[]
}

// ─── Stack YAML renderer ──────────────────────────────────────────────────────
function StackYaml() {
  const PAD_TO = Math.max(...STACK.map((e) => e.key.length))
  return (
    <pre className="stack-yaml" data-lang="yaml">
      <code>
        <span style={{ display: 'block' }}>
          <span className="yaml-root">stack</span><span className="yaml-colon">:</span>
        </span>
        {STACK.map((entry) => {
          const pad = ' '.repeat(PAD_TO - entry.key.length + 2)
          return (
            <span key={entry.key} style={{ display: 'block' }}>
              {'  '}<span className="yaml-key">{entry.key}</span><span className="yaml-colon">:</span>{pad}{entry.values.map((val, i) => (
                <span key={val}><span className="yaml-val">{val}</span>{i < entry.values.length - 1 && <span className="yaml-comma">, </span>}</span>
              ))}
            </span>
          )
        })}
      </code>
    </pre>
  )
}

// ─── Profile View ─────────────────────────────────────────────────────────────
function ProfileView() {
  return (
    <article className="markdown-body" aria-label="Ishan Rana — Profile">
      <h1 className="h1--profile">{HERO_TITLE}</h1>
      <TagContainer tags={TAGS} />
      <Frontmatter entries={FRONTMATTER} />
      <p>{BIO}</p>

      <h2>Work Experience</h2>
      {WORK.map((entry) => (
        <ProjectCard
          key={entry.company}
          role={entry.role}
          period={entry.period}
          title={entry.company}
          description={entry.description}
        />
      ))}

      <h2>Contact</h2>
      <ul className="contact-list">
        {CONTACT.map((link) => (
          <li key={link.url}>
            <a href={link.url} className="contact-link" target="_blank" rel="noreferrer">
              {link.label}
            </a>
          </li>
        ))}
      </ul>

      <blockquote>{QUOTE}</blockquote>
    </article>
  )
}

// ─── Stack View ───────────────────────────────────────────────────────────────
function StackView() {
  return (
    <article className="markdown-body" aria-label="Tech Stack">
      <h1 className="h1--stack">TECH STACK</h1>
      <p>Every tool I reach for — and why.</p>
      <StackYaml />
      <TagContainer tags={TAGS} />
    </article>
  )
}

// ─── Projects View ────────────────────────────────────────────────────────────
function ProjectsView({ fileId }: { fileId: string }) {
  const projectMap: Record<string, number> = {
    'ci_pipeline.md': 0,
    'k8s_monitor.md': 1,
    'iac_modules.md': 2,
  }
  const project = PROJECTS[projectMap[fileId]]
  if (!project) return <EmptyView fileId={fileId} />

  return (
    <article className="markdown-body" aria-label={project.displayTitle}>
      <h1 className="h1--project">{project.displayTitle}</h1>
      <p>{project.description}</p>
      <ProjectCard
        role={project.meta}
        period={project.status}
        title={project.displayTitle}
        description={project.description}
      />
    </article>
  )
}

// ─── Blog View ────────────────────────────────────────────────────────────────
function BlogView({ fileId }: { fileId: string }) {
  const blogMap: Record<string, number> = {
    'zero_downtime_deploys.md': 0,
    'docker_deep_dive.md': 1,
    'k8s_pitfalls.md': 2,
  }
  const post = BLOG[blogMap[fileId]]
  if (!post) return <EmptyView fileId={fileId} />

  return (
    <article className="markdown-body" aria-label={post.displayTitle}>
      <div className="frontmatter">
        <div className="frontmatter-line">
          <span className="frontmatter-key">file:</span>
          <span className="frontmatter-val">"{post.file}"</span>
        </div>
        <div className="frontmatter-line">
          <span className="frontmatter-key">status:</span>
          <span className="frontmatter-val">"draft"</span>
        </div>
      </div>
      <h1 className="h1--blog">{post.displayTitle}</h1>
      <p>{post.description}</p>
      <p className="coming-soon">// Full post coming soon.</p>
    </article>
  )
}

// ─── Empty / No Tabs View ─────────────────────────────────────────────────────
function EmptyView({ fileId }: { fileId?: string }) {
  return (
    <article className="markdown-body empty-view" aria-label="Empty state">
      <p className="empty-hint">
        {fileId ? `// No content found for "${fileId}"` : '// Open a file from the sidebar to begin.'}
      </p>
    </article>
  )
}

// ─── Main EditorContainer ─────────────────────────────────────────────────────
export default function EditorContainer({ activeFile, openTabs }: EditorContainerProps) {
  if (openTabs.length === 0) {
    return (
      <div className="editor-container">
        <EmptyView />
      </div>
    )
  }

  const viewType = FILE_VIEW_MAP[activeFile]

  const renderView = () => {
    switch (viewType) {
      case 'profile':  return <ProfileView />
      case 'stack':    return <StackView />
      case 'project':  return <ProjectsView fileId={activeFile} />
      case 'blog':     return <BlogView fileId={activeFile} />
      default:         return <EmptyView fileId={activeFile} />
    }
  }

  return (
    <div className="editor-container">
      {/* key forces remount on file change, triggering viewEnter animation */}
      <div key={activeFile} className="view-enter">
        {renderView()}
      </div>
    </div>
  )
}
