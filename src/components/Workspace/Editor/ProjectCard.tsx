import './ProjectCard.css'

interface ProjectCardProps {
  role: string
  period: string
  title: string
  description: string
}

export default function ProjectCard({ role, period, title, description }: ProjectCardProps) {
  return (
    <div className="project-card">
      <div className="project-meta">
        <span>{role}</span>
        <span>{period}</span>
      </div>
      <h3 className="project-title">{title}</h3>
      <p style={{ marginBottom: 0 }}>{description}</p>
    </div>
  )
}
