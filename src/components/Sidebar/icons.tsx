// ─────────────────────────────────────────────────────────────────────────────
// Inline SVG icon set for the sidebar file tree.
// All icons: 16×16, stroke="currentColor", strokeWidth="1.5", fill="none".
// Color is set via CSS `color` on the parent `.icon` span.
// ─────────────────────────────────────────────────────────────────────────────

const props = {
  width: 14,
  height: 14,
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.5,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
  'aria-hidden': true,
}

// profile.md — person silhouette
export function UserIcon() {
  return (
    <svg {...props}>
      <circle cx="12" cy="8" r="4" />
      <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
    </svg>
  )
}

// tech_stack.md — stacked layers
export function LayersIcon() {
  return (
    <svg {...props}>
      <polygon points="12 2 22 8.5 12 15 2 8.5 12 2" />
      <polyline points="2 15.5 12 22 22 15.5" />
      <polyline points="2 12 12 18.5 22 12" />
    </svg>
  )
}

// folder (closed) — canonical Lucide folder
export function FolderIcon() {
  return (
    <svg {...props}>
      <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" />
    </svg>
  )
}

// folder (open) — canonical Lucide folder-open
export function FolderOpenIcon() {
  return (
    <svg {...props}>
      <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" />
      <polyline points="8 13 12 17 16 13" />
      <line x1="12" y1="7" x2="12" y2="17" />
    </svg>
  )
}

// project files — terminal prompt
export function TerminalIcon() {
  return (
    <svg {...props}>
      <polyline points="4 17 10 11 4 5" />
      <line x1="12" y1="19" x2="20" y2="19" />
    </svg>
  )
}

// blog files — file with text lines
export function FileTextIcon() {
  return (
    <svg {...props}>
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <polyline points="14 2 14 8 20 8" />
      <line x1="8" y1="13" x2="16" y2="13" />
      <line x1="8" y1="17" x2="13" y2="17" />
    </svg>
  )
}

// root vault folder — archive box
export function ArchiveIcon() {
  return (
    <svg {...props}>
      <rect x="2" y="4" width="20" height="5" rx="1" />
      <path d="M4 9v10a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1V9" />
      <line x1="10" y1="14" x2="14" y2="14" />
    </svg>
  )
}

// projects folder — wrench + screwdriver (tools)
export function ToolsIcon() {
  return (
    <svg {...props}>
      <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
    </svg>
  )
}

// blog folder — pencil/pen
export function PenIcon() {
  return (
    <svg {...props}>
      <path d="M17 3a2.83 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" />
      <path d="m15 5 4 4" />
    </svg>
  )
}
