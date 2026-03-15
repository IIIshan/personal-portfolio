// ─────────────────────────────────────────────────────────────────────────────
// ALL PERSONAL CONTENT LIVES HERE.
// Edit this file to update anything on the portfolio — no touching components.
// ─────────────────────────────────────────────────────────────────────────────

export const VAULT_TITLE = "ISHAN'S_ARCHIVE"

export const FRONTMATTER = [
  { key: 'role',     value: 'DevOps Engineer' },
  { key: 'focus',    value: 'Cloud Infrastructure / DevOps' },
  { key: 'uptime',   value: '1+ Year Experience' },
  { key: 'location', value: 'Bengaluru // UTC+5:30' },
]

export const HERO_TITLE = 'ISHAN RANA'

export const TAGS = [
  'docker',
  'kubernetes',
  'aws',
  'terraform',
  'ci_cd',
  'linux',
]

export const BIO =
  'I build and automate the infrastructure that keeps software running at scale. ' +
  'Focused on container orchestration, cloud-native tooling, and eliminating toil through CI/CD. ' +
  'Currently bridging the gap between development and operations — one pipeline at a time.'

// ─── Work Experience ──────────────────────────────────────────────────────────

export interface WorkEntry {
  role: string
  period: string
  company: string
  description: string
}

export const WORK: WorkEntry[] = [
  {
    role: 'DevOps Engineer',
    period: '2023 — PRESENT',
    company: 'CloudOps Solutions',
    description:
      'Designed and maintained CI/CD pipelines across 10+ microservices on AWS EKS. ' +
      'Reduced deployment time by 60% through parallel pipeline execution and layer-cached Docker builds.',
  },
  {
    role: 'DevOps Intern',
    period: '2022 — 2023',
    company: 'TechBridge Labs',
    description:
      'Assisted in migrating legacy deployments to containerized workloads on Kubernetes. ' +
      'Wrote Terraform modules for provisioning repeatable AWS environments across dev, staging, and prod.',
  },
]

// ─── Projects ─────────────────────────────────────────────────────────────────

export interface ProjectEntry {
  meta: string
  status: string
  title: string
  displayTitle: string
  description: string
}

export const PROJECTS: ProjectEntry[] = [
  {
    meta: 'GitHub: /ci-pipeline-accelerator',
    status: 'v2.1.0',
    title: 'CI Pipeline Accelerator',
    displayTitle: 'CI Pipeline Accelerator',
    description:
      'GitHub Actions-based reusable workflow library that cut average build times by 60% ' +
      'using intelligent caching, matrix parallelism, and Docker layer optimization.',
  },
  {
    meta: 'GitHub: /k8s-cluster-monitor',
    status: 'In Progress',
    title: 'K8s Cluster Monitor',
    displayTitle: 'K8s Cluster Monitor',
    description:
      'Lightweight Prometheus + Grafana observability stack packaged as a Helm chart. ' +
      'Provides out-of-the-box dashboards for node health, pod lifecycle, and network throughput.',
  },
  {
    meta: 'OSS / Terraform Registry',
    status: 'v1.4.0',
    title: 'IaC Module Library',
    displayTitle: 'IaC Module Library',
    description:
      'A collection of battle-tested Terraform modules for provisioning VPCs, EKS clusters, ' +
      'RDS instances, and IAM roles on AWS — following the principle of least privilege throughout.',
  },
]

// ─── Blog ─────────────────────────────────────────────────────────────────────

export type BlogBlock =
  | { type: 'h2'; text: string }
  | { type: 'h3'; text: string }
  | { type: 'p'; text: string }
  | { type: 'code'; lang: string; code: string }
  | { type: 'ul'; items: string[] }
  | { type: 'ol'; items: string[] }
  | { type: 'blockquote'; text: string }
  | { type: 'callout'; label: string; text: string }
  | { type: 'hr' }

export interface BlogEntry {
  file: string
  displayTitle: string
  description: string
  date: string
  readingTime: string
  tags: string[]
  body: BlogBlock[]
}

export const BLOG_INTRO =
  'Notes on infrastructure, automation, and the lessons only production can teach you.'

export const BLOG: BlogEntry[] = [
  {
    file: 'docker_deep_dive.md',
    displayTitle: 'Docker Deep Dive',
    description: 'From Dockerfile to production — layers, networking internals, Compose, multi-stage builds, and the kernel primitives that make it all work.',
    date: '2025-12-01',
    readingTime: '18 min',
    tags: ['docker', 'containers', 'networking', 'linux'],
    body: [], // populated below
  },
  {
    file: 'linux_inodes.md',
    displayTitle: 'Linux Internals: Inodes',
    description: 'How Linux tracks every file — inode structure, path resolution, direct/indirect pointers, inode exhaustion, and how Git and CDNs avoid it.',
    date: '2025-12-08',
    readingTime: '12 min',
    tags: ['linux', 'filesystem', 'internals'],
    body: [], // populated below
  },
]

// ─── Stack ────────────────────────────────────────────────────────────────────

export interface StackEntry {
  key: string
  values: string[]
}

export const STACK: StackEntry[] = [
  { key: 'languages',   values: ['Python', 'Go', 'JavaScript', 'TypeScript', 'Bash'] },
  { key: 'backend',     values: ['FastAPI', 'Express.js'] },
  { key: 'databases',   values: ['PostgreSQL', 'MySQL', 'MongoDB', 'Redis', 'SQLite'] },
  { key: 'containers',  values: ['Docker', 'Docker Compose', 'Kubernetes'] },
  { key: 'cloud',       values: ['AWS', 'DigitalOcean'] },
  { key: 'ci_cd',       values: ['GitHub Actions', 'Jenkins', 'GitLab CI'] },
  { key: 'iac',         values: ['Terraform', 'Ansible'] },
  { key: 'monitoring',  values: ['Prometheus', 'Grafana'] },
  { key: 'web_servers', values: ['Nginx', 'Caddy', 'Apache', 'Traefik'] },
  { key: 'os_tools',    values: ['Linux (Ubuntu/Debian)', 'Linux (CentOS/RHEL)', 'Git', 'Vim/Neovim', 'VS Code'] },
]

// ─── Contact ──────────────────────────────────────────────────────────────────

export interface ContactLink {
  label: string
  url: string
}

export const CONTACT: ContactLink[] = [
  { label: 'github.com/ishanrana',        url: 'https://github.com/ishanrana' },
  { label: 'linkedin.com/in/ishanrana',   url: 'https://linkedin.com/in/ishanrana' },
  { label: 'ishan@proton.me',             url: 'mailto:ishan@proton.me' },
]

// ─── Quote ────────────────────────────────────────────────────────────────────

export const QUOTE =
  '"Automate everything once. Then automate the automation. ' +
  'The goal is a system that runs itself."'
