import './TagContainer.css'

interface TagContainerProps {
  tags: string[]
}

export default function TagContainer({ tags }: TagContainerProps) {
  return (
    <div className="tag-container" role="list" aria-label="Tech tags">
      {tags.map((tag) => (
        <span
          className="tag"
          key={tag}
          role="listitem"
        >
          {tag}
        </span>
      ))}
    </div>
  )
}
