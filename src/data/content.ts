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

export interface BlogEntry {
  file: string
  displayTitle: string
  description: string
}

export const BLOG_INTRO =
  'Notes on infrastructure, automation, and the lessons only production can teach you.'

export const BLOG: BlogEntry[] = [
  {
    file: 'zero_downtime_deploys.md',
    displayTitle: 'Zero Downtime Deploys',
    description: 'Blue/green and canary rollout strategies on Kubernetes.',
  },
  {
    file: 'docker_deep_dive.md',
    displayTitle: 'Docker Deep Dive',
    description: 'Layer caching, multi-stage builds, and image size optimization.',
  },
  {
    file: 'k8s_pitfalls.md',
    displayTitle: 'K8s Pitfalls',
    description: 'Lessons learned from real cluster failures — and how to survive them.',
  },
]

// ─── Stack ────────────────────────────────────────────────────────────────────

export interface StackEntry {
  key: string
  values: string[]
}

export const STACK: StackEntry[] = [
  { key: 'languages', values: ['Python', 'JavaScript', 'Java'] },
  { key: 'frontend',  values: ['React', 'Next.js', 'Node.js'] },
  { key: 'devops',    values: ['Docker', 'Kubernetes', 'Terraform', 'Jenkins', 'GitHub Actions'] },
  { key: 'cloud',     values: ['AWS'] },
  { key: 'os',        values: ['Linux'] },
  { key: 'ci_cd',     values: ['GitHub Actions', 'Jenkins', 'CI/CD Pipelines'] },
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
