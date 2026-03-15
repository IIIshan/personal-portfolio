import { useNavigate } from 'react-router-dom'
import { PATH_TO_FILE_ID } from '../../../data/fileTree'
import './InternalLink.css'

interface InternalLinkProps {
  label: string
  targetPath: string
}

export default function InternalLink({ label, targetPath }: InternalLinkProps) {
  const navigate = useNavigate()
  const isValid = Object.keys(PATH_TO_FILE_ID).includes(targetPath)

  const handleClick = () => {
    if (isValid) navigate(targetPath)
  }

  return (
    <button
      className="internal-link"
      onClick={handleClick}
      type="button"
      aria-label={`Go to ${label}`}
    >
      {label}
    </button>
  )
}
