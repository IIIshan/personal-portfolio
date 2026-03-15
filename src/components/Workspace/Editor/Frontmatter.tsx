import './Frontmatter.css'

interface FrontmatterEntry {
  key: string
  value: string
}

interface FrontmatterProps {
  entries: FrontmatterEntry[]
}

export default function Frontmatter({ entries }: FrontmatterProps) {
  return (
    <div className="frontmatter" aria-label="File metadata">
      {entries.map((entry) => (
        <div className="frontmatter-line" key={entry.key}>
          <span className="frontmatter-key">{entry.key}:</span>
          <span className="frontmatter-val">"{entry.value}"</span>
        </div>
      ))}
    </div>
  )
}
