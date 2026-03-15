import './InternalLink.css'

interface InternalLinkProps {
  label: string
}

export default function InternalLink({ label }: InternalLinkProps) {
  return <span className="internal-link">{label}</span>
}
