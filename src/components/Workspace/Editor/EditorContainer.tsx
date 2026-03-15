import {
  FRONTMATTER, HERO_TITLE, TAGS, BIO,
  WORK, PROJECTS, BLOG, STACK,
  CONTACT, QUOTES,
} from '../../../data/content'
import { FILE_VIEW_MAP } from '../../../data/fileTree'
import { TabItem } from '../../../App'
import Frontmatter from './Frontmatter'
import InternalLink from './InternalLink'
import ProjectCard from './ProjectCard'
import TagContainer from './TagContainer'
import './EditorContainer.css'

interface EditorContainerProps {
  activeFile: string
  openTabs: TabItem[]
  isNotFound?: boolean
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
  const quote = QUOTES[Math.floor(Math.random() * QUOTES.length)]
  return (
    <article className="markdown-body" aria-label="Ishan Rana — Profile">
      <h1 className="h1--profile">{HERO_TITLE}</h1>
      <TagContainer tags={TAGS} />
      <Frontmatter entries={FRONTMATTER} />
      <p>{BIO}</p>
      <p>See my full <InternalLink label="tech_stack" targetPath="/stack" /> for details.</p>

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

      <blockquote>
        "{quote.text}"
        <footer>— {quote.author}</footer>
      </blockquote>
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

// ─── Linkify utility — auto-detects URLs in text and wraps them in <a> ────────
function linkify(text: string) {
  const urlPattern = /(https?:\/\/[^\s)]+)/g
  const parts = text.split(urlPattern)
  if (parts.length === 1) return text
  return parts.map((part, i) =>
    /^https?:\/\//.test(part)
      ? <a key={i} href={part} target="_blank" rel="noreferrer">{part}</a>
      : part
  )
}

// ─── Blog Body Renderer ───────────────────────────────────────────────────────
function BlogBody({ blocks }: { blocks: import('../../../data/content').BlogBlock[] }) {
  return (
    <>
      {blocks.map((block, i) => {
        switch (block.type) {
          case 'h2':
            return <h2 key={i}>{block.text}</h2>
          case 'h3':
            return <h3 key={i}>{block.text}</h3>
          case 'p':
            return <p key={i}>{linkify(block.text)}</p>
          case 'code':
            return (
              <pre key={i} data-lang={block.lang}>
                <code>{block.code}</code>
              </pre>
            )
          case 'ul':
            return (
              <ul key={i}>
                {block.items.map((item, j) => <li key={j}>{linkify(item)}</li>)}
              </ul>
            )
          case 'ol':
            return (
              <ol key={i}>
                {block.items.map((item, j) => <li key={j}>{linkify(item)}</li>)}
              </ol>
            )
          case 'links':
            return (
              <ul key={i} className="blog-links">
                {block.items.map((item, j) => (
                  <li key={j}>
                    <a href={item.url} target="_blank" rel="noreferrer">{item.label}</a>
                  </li>
                ))}
              </ul>
            )
          case 'blockquote':
            return <blockquote key={i}>{block.text}</blockquote>
          case 'callout':
            return (
              <div key={i} className="blog-callout">
                <span className="callout-label">{block.label}</span>
                <p>{block.text}</p>
              </div>
            )
          case 'hr':
            return <hr key={i} />
          default:
            return null
        }
      })}
    </>
  )
}

// ─── Blog View ────────────────────────────────────────────────────────────────
function BlogView({ fileId }: { fileId: string }) {
  const blogMap: Record<string, number> = {
    'docker_deep_dive.md': 0,
    'linux_inodes.md': 1,
  }
  const post = BLOG[blogMap[fileId]]
  if (!post) return <EmptyView fileId={fileId} />

  return (
    <article className="markdown-body blog-body" aria-label={post.displayTitle}>
      <Frontmatter entries={[
        { key: 'file', value: post.file },
        { key: 'date', value: post.date },
        { key: 'reading_time', value: post.readingTime },
        { key: 'status', value: 'published' },
      ]} />
      <h1 className="h1--blog">{post.displayTitle}</h1>
      <TagContainer tags={post.tags} />
      <p className="blog-description">{post.description}</p>
      {post.body.length > 0 ? (
        <BlogBody blocks={post.body} />
      ) : (
        <p className="coming-soon">// Full post coming soon.</p>
      )}
    </article>
  )
}

// ─── Not Found View ───────────────────────────────────────────────────────────
function NotFoundView() {
  return (
    <article className="markdown-body empty-view" aria-label="Page not found">
      <div className="not-found">
        <h1 className="h1--blog">404</h1>
        <p className="empty-hint">// File not found in the archive.</p>
        <a href="/" className="contact-link">cd /profile.md</a>
      </div>
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
export default function EditorContainer({ activeFile, openTabs, isNotFound }: EditorContainerProps) {
  if (isNotFound) {
    return (
      <div className="editor-container" id="editor-content">
        <div className="view-enter">
          <NotFoundView />
        </div>
      </div>
    )
  }

  if (openTabs.length === 0) {
    return (
      <div className="editor-container" id="editor-content">
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
    <div className="editor-container" id="editor-content">
      {/* key forces remount on file change, triggering viewEnter animation */}
      <div key={activeFile} className="view-enter">
        {renderView()}
      </div>
    </div>
  )
}
