// ─────────────────────────────────────────────────────────────────────────────
// SIDEBAR FILE TREE STRUCTURE.
// Add, remove or rename files here — the sidebar updates automatically.
// ─────────────────────────────────────────────────────────────────────────────

export interface FileNode {
  id: string           // unique key — matches FILE_VIEW_MAP keys
  label: string        // display name in sidebar
  path?: string        // URL path for React Router (leaf nodes only)
  isFolder?: boolean
  defaultOpen?: boolean
  iconName?: string    // icon key — resolved in Sidebar.tsx
  children?: FileNode[]
}

export const FILE_TREE: FileNode[] = [
  {
    id: 'root',
    label: 'root',
    isFolder: true,
    defaultOpen: true,
    iconName: 'archive',
    children: [
      { id: 'profile.md',    label: 'profile.md',    path: '/',      iconName: 'user'     },
      { id: 'tech_stack.md', label: 'tech_stack.md', path: '/stack', iconName: 'layers'   },
      {
        id: 'projects',
        label: 'projects',
        isFolder: true,
        defaultOpen: false,
        iconName: 'tools',
        children: [
          { id: 'ci_pipeline.md', label: 'ci_pipeline.md', path: '/projects/ci_pipeline', iconName: 'terminal' },
          { id: 'k8s_monitor.md', label: 'k8s_monitor.md', path: '/projects/k8s_monitor', iconName: 'terminal' },
          { id: 'iac_modules.md', label: 'iac_modules.md', path: '/projects/iac_modules', iconName: 'terminal' },
        ],
      },
      {
        id: 'blog',
        label: 'blog',
        isFolder: true,
        defaultOpen: false,
        iconName: 'pen',
        children: [
          { id: 'zero_downtime_deploys.md', label: 'zero_downtime_deploys.md', path: '/blog/zero_downtime_deploys', iconName: 'filetext' },
          { id: 'docker_deep_dive.md',      label: 'docker_deep_dive.md',      path: '/blog/docker_deep_dive',      iconName: 'filetext' },
          { id: 'k8s_pitfalls.md',          label: 'k8s_pitfalls.md',          path: '/blog/k8s_pitfalls',          iconName: 'filetext' },
        ],
      },
    ],
  },
]

// Maps each file id to the section it belongs to — used by EditorContainer
// to decide which view to render.
export type ViewType = 'profile' | 'stack' | 'project' | 'blog'

export const FILE_VIEW_MAP: Record<string, ViewType> = {
  'profile.md':                 'profile',
  'tech_stack.md':              'stack',
  'ci_pipeline.md':             'project',
  'k8s_monitor.md':             'project',
  'iac_modules.md':             'project',
  'zero_downtime_deploys.md':   'blog',
  'docker_deep_dive.md':        'blog',
  'k8s_pitfalls.md':            'blog',
}

// Reverse map: URL pathname → file id (for deriving activeFile from URL)
export const PATH_TO_FILE_ID: Record<string, string> = {
  '/':                               'profile.md',
  '/stack':                          'tech_stack.md',
  '/projects/ci_pipeline':           'ci_pipeline.md',
  '/projects/k8s_monitor':           'k8s_monitor.md',
  '/projects/iac_modules':           'iac_modules.md',
  '/blog/zero_downtime_deploys':     'zero_downtime_deploys.md',
  '/blog/docker_deep_dive':          'docker_deep_dive.md',
  '/blog/k8s_pitfalls':              'k8s_pitfalls.md',
}
