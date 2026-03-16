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
  | { type: 'links'; items: { label: string; url: string }[] }
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
    body: [
      // ── TL;DR ──────────────────────────────────────────────────────────────
      { type: 'callout', label: 'TL;DR', text: 'Docker containers are just Linux processes with kernel-enforced isolation (namespaces + cgroups), not lightweight VMs. Images are layered filesystem snapshots built from Dockerfiles. Networking uses virtual bridges, veth pairs, and iptables NAT. Compose orchestrates multi-container apps declaratively. Multi-stage builds slash image sizes by separating build-time dependencies from runtime. This post walks through all of it — from first Dockerfile to production patterns.' },

      // ── Audience ────────────────────────────────────────────────────────────
      { type: 'callout', label: 'Audience', text: 'Developers and ops engineers who have run docker run a few times but want to understand what is actually happening underneath. You should be comfortable with a Linux terminal.' },

      // ── Section 1: What Is Docker and Why Should You Care? ──────────────────
      { type: 'h2', text: '1. What Is Docker and Why Should You Care?' },
      { type: 'p', text: 'Docker packages your application and its dependencies into a standardized unit called a container. Unlike VMs, containers share the host kernel — there is no guest OS overhead. A container starts in milliseconds, not minutes.' },
      { type: 'p', text: 'Why this matters practically: you get identical behavior from your laptop to staging to production. "Works on my machine" stops being a sentence anyone has to say. CI pipelines become reproducible by default. And because containers are ephemeral, you can destroy and recreate them without ceremony.' },
      { type: 'p', text: 'Under the hood, Docker relies on two Linux kernel features: namespaces (which isolate what a process can see — its own PID tree, network stack, filesystem mount points, users) and cgroups (which limit what a process can use — CPU, memory, I/O). That is the entire magic. Everything else is tooling on top.' },

      // ── Section 2: Dockerfiles — The Blueprint ──────────────────────────────
      { type: 'h2', text: '2. Dockerfiles — The Blueprint' },
      { type: 'p', text: 'A Dockerfile is a plain-text recipe that tells Docker how to build an image. Each instruction creates a new layer in the image filesystem. Understanding the core instructions is essential.' },

      { type: 'h3', text: '2.1 Core Instructions' },
      { type: 'ul', items: [
        'FROM — Sets the base image. Every Dockerfile starts here. FROM python:3.10 means "start from the official Python 3.10 image."',
        'WORKDIR — Sets the working directory inside the container. All subsequent commands run relative to this path.',
        'COPY — Copies files from your host into the image. COPY . . copies the current directory contents into WORKDIR.',
        'RUN — Executes a command during image build. Used for installing dependencies, compiling code, etc. Each RUN creates a new layer.',
        'ENTRYPOINT — The executable that runs when the container starts. Cannot be overridden by appending arguments to docker run.',
        'CMD — Default arguments passed to ENTRYPOINT. Can be overridden at docker run time.',
      ] },
      { type: 'p', text: 'A concrete example — a Python Flask application:' },
      { type: 'code', lang: 'dockerfile', code: 'FROM python:3.10\nWORKDIR /app\nCOPY . .\nRUN pip install -r requirements.txt\nENTRYPOINT ["python"]\nCMD ["run.py"]' },
      { type: 'p', text: 'When you run docker build -t flask_app . Docker processes each instruction top-to-bottom, creating a layer at each step. The final image is a stack of read-only layers. When a container runs from this image, Docker adds a thin writable layer on top — this is where runtime file changes go.' },

      { type: 'h3', text: '2.2 The Layer Cache' },
      { type: 'p', text: 'Docker caches each layer by its instruction + input hash. If nothing changed, Docker reuses the cached layer. This is why instruction order matters: put things that change infrequently (like FROM and RUN pip install) at the top, and things that change often (like COPY . .) near the bottom. A single changed layer invalidates everything below it.' },
      { type: 'code', lang: 'dockerfile', code: '# Good: dependencies cached separately from source code\nFROM python:3.10\nWORKDIR /app\nCOPY requirements.txt .\nRUN pip install -r requirements.txt\nCOPY . .\nCMD ["python", "run.py"]' },
      { type: 'p', text: 'In this version, changing your application source code does NOT re-run pip install. The dependency layer stays cached. This alone can cut build times from minutes to seconds.' },

      // ── Section 3: Essential Docker Commands ────────────────────────────────
      { type: 'h2', text: '3. Essential Docker Commands' },
      { type: 'p', text: 'These are the commands you will use daily. Understanding what each one does at a system level makes debugging much faster.' },

      { type: 'h3', text: '3.1 Build and Run' },
      { type: 'code', lang: 'bash', code: '# Build an image from a Dockerfile in the current directory\ndocker build -t flask_app .\n\n# Run a container in detached mode, mapping host:container ports\ndocker run -d -p 80:80 --name flask_server flask_app\n\n# List running containers\ndocker ps\n\n# List ALL containers (including stopped)\ndocker ps -a' },

      { type: 'h3', text: '3.2 Inspect and Debug' },
      { type: 'code', lang: 'bash', code: '# Get a shell inside a running container\ndocker exec -it flask_server bash\n\n# View container logs (follow mode)\ndocker logs -f flask_server\n\n# Inspect container metadata (network, mounts, config)\ndocker inspect flask_server' },
      { type: 'p', text: 'The -it flags on docker exec are two separate flags: -i keeps STDIN open (so you can type), and -t allocates a pseudo-TTY (so you get a proper terminal with formatting). Together they give you an interactive shell session.' },

      { type: 'h3', text: '3.3 Lifecycle Management' },
      { type: 'code', lang: 'bash', code: '# Stop a running container (sends SIGTERM, then SIGKILL after 10s)\ndocker stop flask_server\n\n# Start a stopped container\ndocker start flask_server\n\n# Remove a stopped container\ndocker rm flask_server\n\n# Remove an image\ndocker rmi flask_app\n\n# Nuclear option: remove all images\ndocker rmi -f $(docker images -aq)' },

      { type: 'hr' },

      // ── Section 4: Networking Internals ─────────────────────────────────────
      { type: 'h2', text: '4. Networking Internals — How Containers Talk' },
      { type: 'p', text: 'This is where Docker gets genuinely interesting. Containers are isolated processes, so how do they communicate with each other and the outside world? The answer involves three Linux kernel primitives: virtual bridges, veth pairs, and iptables NAT rules.' },

      { type: 'h3', text: '4.1 The Default Bridge Network' },
      { type: 'p', text: 'When Docker starts, it creates a virtual network bridge called docker0 on the host (typically at 172.17.0.1). Think of it as a virtual network switch. Every container that starts without a --network flag gets connected to this bridge and receives a private IP from the 172.17.0.0/16 subnet.' },
      { type: 'code', lang: 'bash', code: '# View the docker0 bridge on the host\nip addr show docker0\n# docker0: inet 172.17.0.1/16' },

      { type: 'h3', text: '4.2 veth Pairs — The Virtual Cables' },
      { type: 'p', text: 'Each container is connected to docker0 via a veth pair — a virtual Ethernet cable with two ends. One end appears inside the container as eth0 (the container thinks it has a real network interface). The other end appears on the host as vethXXXXXX and plugs into the docker0 bridge.' },
      { type: 'code', lang: 'text', code: '[Container eth0] <——veth pair——> [vethXXX on host] <——> [docker0 bridge]' },
      { type: 'p', text: 'This is how container-to-container communication works on the same host: packets go from Container A\'s eth0 → through the veth pair → into docker0 → out through another veth pair → into Container B\'s eth0. The bridge handles the switching.' },

      { type: 'h3', text: '4.3 Port Mapping and NAT' },
      { type: 'p', text: 'When you run docker run -p 80:80 httpd, Docker creates an iptables NAT rule that forwards traffic from host port 80 to the container\'s IP on port 80. The full packet flow for an external request:' },
      { type: 'code', lang: 'text', code: 'Client request\n  → Host eth0 (port 80)\n  → iptables DNAT rule\n  → docker0 bridge (172.17.0.1)\n  → vethXXX\n  → Container eth0 (172.17.0.2:80)\n\nResponse follows the reverse path.' },
      { type: 'p', text: 'This is why on Linux you can curl both the host IP and the container IP directly — they are on the same kernel network stack. On macOS and Windows, Docker runs inside a Linux VM (via HyperKit or WSL2), so docker0 and 172.17.0.x exist only inside that VM. You can only reach containers via localhost port mappings.' },

      { type: 'h3', text: '4.4 Custom Bridge Networks and DNS' },
      { type: 'p', text: 'The default bridge has a major limitation: containers can only reach each other by IP, not by name. There is no DNS resolution. This is where custom bridge networks change everything.' },
      { type: 'code', lang: 'bash', code: '# Create a custom bridge network\ndocker network create backend --subnet 10.0.0.0/24\n\n# Run containers on the custom network\ndocker run -d --name api --network backend my-api\ndocker run -d --name db --network backend mysql' },
      { type: 'p', text: 'Now the api container can reach the database at db:3306 by name — no hardcoded IPs. Docker achieves this with an embedded DNS server at 127.0.0.11 inside each container on custom networks. When a container does a DNS lookup, it hits this embedded server which resolves service names to container IPs.' },
      { type: 'code', lang: 'bash', code: '# Inside a container on a custom network:\nnslookup db\n# Server:    127.0.0.11\n# Address:   127.0.0.11#53\n# Name:      db\n# Address:   10.0.0.3' },
      { type: 'callout', label: 'Key insight', text: 'Containers on different custom networks cannot communicate with each other by default — network namespaces enforce this isolation. To bridge two networks, you can connect a container to both networks (docker network connect), effectively making it a gateway. But for most applications, Compose handles all of this automatically.' },

      { type: 'hr' },

      // ── Section 5: Volumes — Persistent Data ───────────────────────────────
      { type: 'h2', text: '5. Volumes — Persistent Data' },
      { type: 'p', text: 'Container filesystems are ephemeral. When a container is removed, its writable layer is deleted and all data is gone. For anything that needs to survive container restarts — databases, uploads, logs — you need volumes.' },
      { type: 'p', text: 'Docker provides two approaches:' },
      { type: 'h3', text: '5.1 Named Volumes' },
      { type: 'code', lang: 'bash', code: '# Create a named volume\ndocker volume create mysql_data\n\n# Mount it when running a container\ndocker run -d --name db \\\n  -v mysql_data:/var/lib/mysql \\\n  mysql' },
      { type: 'p', text: 'Docker manages the storage location (typically /var/lib/docker/volumes/ on Linux). Named volumes are the recommended approach for production data — they are portable, easy to back up with docker volume inspect, and survive container removal.' },

      { type: 'h3', text: '5.2 Bind Mounts' },
      { type: 'code', lang: 'bash', code: '# Bind mount a host directory into the container\ndocker run -d --name db \\\n  -v /home/deploy/data/mysql:/var/lib/mysql \\\n  mysql' },
      { type: 'p', text: 'Bind mounts map a specific host directory into the container. You control exactly where data lives on the host. This is useful for development (mount your source code into the container for live reloading) but introduces host-path dependencies that can break portability.' },

      { type: 'hr' },

      // ── Section 6: Docker Compose ──────────────────────────────────────────
      { type: 'h2', text: '6. Docker Compose — Declarative Multi-Container Apps' },
      { type: 'p', text: 'Real applications rarely run in a single container. A typical web app needs at least a backend, a database, and maybe a cache or reverse proxy. Running each one manually with docker run — remembering flags, networks, volumes, environment variables, startup order — is painful and error-prone.' },
      { type: 'p', text: 'Docker Compose solves this with a single YAML file that declares your entire stack:' },
      { type: 'code', lang: 'yaml', code: 'version: "3.8"\n\nservices:\n  mysql:\n    image: mysql\n    ports:\n      - "3306:3306"\n    environment:\n      MYSQL_DATABASE: "app_db"\n      MYSQL_ROOT_PASSWORD: "${DB_PASSWORD}"\n    volumes:\n      - mysql_data:/var/lib/mysql\n    networks:\n      - backend\n    healthcheck:\n      test: ["CMD", "mysqladmin", "ping", "-h", "localhost"]\n      interval: 10s\n      timeout: 5s\n      retries: 5\n      start_period: 60s\n\n  api:\n    build:\n      context: .\n    ports:\n      - "5000:5000"\n    environment:\n      MYSQL_HOST: mysql\n      MYSQL_USER: root\n      MYSQL_PASSWORD: "${DB_PASSWORD}"\n      MYSQL_DB: app_db\n    networks:\n      - backend\n    depends_on:\n      mysql:\n        condition: service_healthy\n    restart: unless-stopped\n\nvolumes:\n  mysql_data:\n\nnetworks:\n  backend:' },

      { type: 'h3', text: '6.1 What Compose Does For You' },
      { type: 'ul', items: [
        'Creates an isolated network for the project — services communicate by name (api reaches the database at mysql:3306).',
        'Manages startup order via depends_on. With condition: service_healthy, it actually waits for the dependency to be ready, not just started.',
        'Defines volumes once — Compose creates and manages them automatically.',
        'One command to start everything: docker compose up -d. One command to tear it all down: docker compose down.',
        'The same compose file works on your laptop, in CI, and in production. No environment drift.',
      ] },

      { type: 'h3', text: '6.2 Important Details' },
      { type: 'p', text: 'Compose namespaces all resources with the project name (derived from the directory name). A network defined as backend in your compose file becomes myproject_backend. This prevents collisions between multiple compose projects on the same host.' },
      { type: 'p', text: 'If you need to use a pre-existing network or volume that was created outside of Compose, declare it with external: true:' },
      { type: 'code', lang: 'yaml', code: 'networks:\n  shared_net:\n    external: true  # Compose will NOT create this — it must already exist' },

      { type: 'hr' },

      // ── Section 7: Multi-Stage Builds ──────────────────────────────────────
      { type: 'h2', text: '7. Multi-Stage Builds — Production-Ready Images' },
      { type: 'p', text: 'Here is the problem: building an application requires compilers, SDKs, build tools, and development dependencies. Running the application requires only the compiled artifact and runtime dependencies. If you use a single build stage, all that build tooling ends up in your production image — wasting hundreds of megabytes and increasing your attack surface.' },
      { type: 'p', text: 'Multi-stage builds solve this with multiple FROM instructions in one Dockerfile. Each FROM starts a new stage. You can copy artifacts from an earlier stage into a later one, leaving all the build tools behind.' },
      { type: 'code', lang: 'dockerfile', code: '# Stage 1: Build — full SDK, all dev dependencies\nFROM python:3.10 AS builder\nWORKDIR /app\nCOPY requirements.txt .\nRUN pip install --prefix=/install -r requirements.txt\n\n# Stage 2: Runtime — slim base, only what we need\nFROM python:3.10-slim\nWORKDIR /app\nCOPY --from=builder /install /usr/local\nCOPY . .\nENTRYPOINT ["python"]\nCMD ["run.py"]' },
      { type: 'p', text: 'The builder stage installs all dependencies into /install. The runtime stage starts fresh from python:3.10-slim (which is ~150MB smaller than the full image) and copies only the installed packages. Your source code never touches the build tools image.' },

      { type: 'p', text: 'A Node.js example makes the savings even more dramatic:' },
      { type: 'code', lang: 'dockerfile', code: '# Stage 1: Build\nFROM node:20-alpine AS build\nWORKDIR /app\nCOPY package*.json .\nRUN npm ci\nCOPY . .\nRUN npm run build\n\n# Stage 2: Serve\nFROM caddy:2-alpine\nCOPY --from=build /app/dist /srv\nCOPY Caddyfile /etc/caddy/Caddyfile' },
      { type: 'p', text: 'The build stage has Node.js, npm, node_modules, TypeScript compiler — easily 500MB+. The final image has only Caddy (~40MB) and the compiled static files. Total production image: ~50MB instead of ~700MB.' },

      { type: 'callout', label: 'Real numbers', text: 'This portfolio site uses exactly this pattern. The build stage (node:20-alpine + dependencies + Vite build) is ~600MB. The production image (caddy:2-alpine + static files) is ~55MB. That is a 91% reduction.' },

      { type: 'hr' },

      // ── Section 8: Docker Registry ─────────────────────────────────────────
      { type: 'h2', text: '8. Docker Registry — Sharing Images' },
      { type: 'p', text: 'Once you have a working image, you need to distribute it. Docker Hub is the default public registry. The workflow is tag, then push:' },
      { type: 'code', lang: 'bash', code: '# Login to Docker Hub\ndocker login\n\n# Tag your local image with your registry username\ndocker image tag flask_app:latest yourusername/flask_app:latest\n\n# Push to Docker Hub\ndocker push yourusername/flask_app:latest' },
      { type: 'p', text: 'After pushing, anyone can pull your image — and your Compose file can reference it directly with image: yourusername/flask_app:latest instead of building from source. For private images, Docker Hub offers private repos, or you can run your own registry.' },

      { type: 'hr' },

      // ── Section 9: Trade-offs ──────────────────────────────────────────────
      { type: 'h2', text: '9. Trade-offs and When NOT to Use Docker' },
      { type: 'p', text: 'Docker is not always the right choice. Be honest about the costs:' },
      { type: 'ul', items: [
        'Overhead: Docker adds a layer of complexity. For a single-binary Go app deployed to one server, a systemd unit file is simpler and has fewer failure modes.',
        'macOS/Windows performance: Docker runs in a Linux VM on non-Linux hosts. File syncing between host and container (bind mounts) is notoriously slow on macOS — especially for node_modules with thousands of files.',
        'Security is not free: Running as root inside a container (the default) means a container escape gives root on the host. You need rootless mode or user namespace remapping for real isolation.',
        'Networking complexity: Docker networking works differently on Linux vs macOS/Windows. The bridge network, docker0, and direct container-IP access only work natively on Linux. On macOS, you always go through port mappings.',
        'State management: Docker is designed for stateless workloads. Running databases in Docker is fine for development, but in production you need to be very deliberate about volume management, backup strategies, and data durability.',
        'Image bloat is easy: Without multi-stage builds and careful .dockerignore files, images grow fast. A 2GB image defeats the purpose of containers.',
      ] },

      { type: 'hr' },

      // ── Section 10: Further Reading ────────────────────────────────────────
      { type: 'h2', text: '10. Further Reading' },
      { type: 'links', items: [
        { label: 'Docker docs — Dockerfile reference', url: 'https://docs.docker.com/reference/dockerfile/' },
        { label: 'Docker docs — Networking overview', url: 'https://docs.docker.com/engine/network/' },
        { label: 'Ivan Velichko — "Container Networking Is Simple!"', url: 'https://iximiuz.com/en/posts/container-networking-is-simple/' },
        { label: 'Julia Evans — "How containers work" (zine)', url: 'https://wizardzines.com/zines/containers/' },
        { label: 'Jérôme Petazzoni — "Containers From Scratch" (PyCon talk)', url: 'https://www.youtube.com/watch?v=8fi7uSYlOdc' },
      ] },
    ],
  },
  {
    file: 'linux_inodes.md',
    displayTitle: 'Linux Internals: Inodes',
    description: 'How Linux tracks every file — inode structure, path resolution, direct/indirect pointers, inode exhaustion, and how Git and CDNs avoid it.',
    date: '2025-12-08',
    readingTime: '12 min',
    tags: ['linux', 'filesystem', 'internals'],
    body: [
      // ── TL;DR ──────────────────────────────────────────────────────────────
      { type: 'callout', label: 'TL;DR', text: 'An inode is a data structure that stores all metadata about a file — permissions, owner, timestamps, size, and pointers to data blocks — everything except the filename and the actual content. The filename is just a directory entry that maps a human-readable string to an inode number. Understanding inodes explains why hard links work, why you can run out of disk space with plenty of bytes free, and how path resolution actually traverses the filesystem.' },

      { type: 'callout', label: 'Audience', text: 'Developers and sysadmins who use Linux daily but have never looked under the hood of the filesystem. You should be comfortable with basic terminal commands (ls, stat, df).' },

      // ── Section 1: What Is an Inode? ───────────────────────────────────────
      { type: 'h2', text: '1. What Is an Inode and Why Should You Care?' },
      { type: 'p', text: 'Every file and directory on a Linux filesystem has exactly one inode (index node) associated with it. The inode is the file\'s identity card — it stores all the metadata the kernel needs to locate and manage the file.' },
      { type: 'p', text: 'Here is the critical mental model. There are three separate things:' },
      { type: 'ol', items: [
        'The inode — a data structure containing metadata and pointers to data blocks.',
        'The filename — a human-readable label stored in a directory entry, pointing to an inode number.',
        'The file data — the actual content (bytes), stored in data blocks on disk.',
      ] },
      { type: 'p', text: 'The filename is NOT part of the inode. The data is NOT part of the inode. The inode is the bridge between the two — it is how the kernel goes from "the user wants /etc/passwd" to "read blocks 48291 through 48293 from disk."' },

      { type: 'h3', text: '1.1 What an Inode Stores' },
      { type: 'ul', items: [
        'File type — regular file, directory, symlink, block device, socket, FIFO, etc.',
        'Permissions — rwxr-xr-- (read/write/execute for owner, group, others)',
        'Owner ID (UID) and Group ID (GID)',
        'File size in bytes',
        'Timestamps — atime (last read), mtime (last data modification), ctime (last metadata change)',
        'Link count — number of hard links pointing to this inode. When it drops to 0, the data blocks are freed.',
        'Pointers to data blocks — the actual disk addresses where file content lives.',
      ] },

      { type: 'p', text: 'You can inspect a file\'s inode directly:' },
      { type: 'code', lang: 'bash', code: '# Show inode number\nls -i /etc/passwd\n# 1835009 /etc/passwd\n\n# Show full inode metadata\nstat /etc/passwd\n#   File: /etc/passwd\n#   Size: 2467        Blocks: 8       IO Block: 4096   regular file\n# Device: 801h/2049d  Inode: 1835009  Links: 1\n# Access: (0644/-rw-r--r--)  Uid: (0/root)   Gid: (0/root)\n# Access: 2025-11-20 09:14:22.000000000 +0530\n# Modify: 2025-11-18 16:30:01.000000000 +0530\n# Change: 2025-11-18 16:30:01.000000000 +0530' },

      { type: 'hr' },

      // ── Section 2: Physical Disk Layout ────────────────────────────────────
      { type: 'h2', text: '2. Physical Disk Layout' },
      { type: 'p', text: 'To understand inodes properly, you need to know how a Linux filesystem is physically organized on disk. A typical ext4 filesystem divides the disk into four main areas:' },
      { type: 'ol', items: [
        'Boot block — contains the bootloader. Only relevant on the boot partition.',
        'Superblock — the filesystem\'s master record. Stores the filesystem type (ext4, XFS, etc.), total number of inodes and data blocks, free counts, block size, and filesystem state.',
        'Inode table — a contiguous array of all inode structures. Each inode has a unique number (its index in this table).',
        'Data blocks — the actual storage units where file content lives. A typical block size is 4096 bytes (4 KB).',
      ] },
      { type: 'p', text: 'The number of inodes is fixed at filesystem creation time (mkfs). The ratio of inodes to data blocks depends on expected usage. This is important — it means you can run out of inodes while having plenty of free disk space.' },

      { type: 'hr' },

      // ── Section 3: Path Resolution ─────────────────────────────────────────
      { type: 'h2', text: '3. Path Resolution — Walking the Tree' },
      { type: 'p', text: 'When you run cat /home/user/document.txt, the kernel does not magically jump to your file. It walks the directory tree, one component at a time, using inodes at every step.' },
      { type: 'ol', items: [
        'Start at the root directory /. Its inode number is always 2 on ext4. The kernel reads inode 2 and follows its data block pointers.',
        'The data blocks of / contain directory entries — pairs of (name, inode number). The kernel finds the entry "home" → inode 131073.',
        'Read inode 131073 (the /home directory). Check permissions. Follow its data block pointers.',
        'In /home\'s data blocks, find "user" → inode 262145. Read that inode, check permissions.',
        'In /home/user\'s data blocks, find "document.txt" → inode 393280. Read that inode.',
        'Inode 393280 gives us: file size, permissions, and most importantly, pointers to the data blocks where the file content is stored.',
        'Read those data blocks. Return content to cat. Done.',
      ] },
      { type: 'p', text: 'Every step involves reading an inode and then reading the data blocks it points to. A deeply nested path requires more disk reads — this is one reason why extremely deep directory structures are slower to traverse. In practice, the kernel\'s dentry cache (dcache) caches directory lookups, so hot paths are fast.' },

      { type: 'hr' },

      // ── Section 4: Pointers ────────────────────────────────────────────────
      { type: 'h2', text: '4. Direct and Indirect Pointers' },
      { type: 'p', text: 'An inode needs to point to the data blocks that hold the file\'s content. For small files this is trivial — a few direct pointers suffice. But a large file might span thousands of blocks. How does a fixed-size inode structure handle files of arbitrary size?' },
      { type: 'p', text: 'The answer is a hierarchical pointer system:' },

      { type: 'h3', text: '4.1 Direct Pointers' },
      { type: 'p', text: 'An ext4 inode has 12 direct pointers. Each points directly to one data block (4 KB). This covers files up to 12 × 4 KB = 48 KB with zero indirection — one disk read per block. Most files on a typical system are under 48 KB, so most file access uses only direct pointers.' },

      { type: 'h3', text: '4.2 Single Indirect Pointer' },
      { type: 'p', text: 'The 13th pointer is a single indirect pointer. It points to a block that contains nothing but more pointers to data blocks. With 4 KB blocks and 4-byte pointers, one indirect block holds 1024 pointers = 4 MB of additional data.' },

      { type: 'h3', text: '4.3 Double Indirect Pointer' },
      { type: 'p', text: 'The 14th pointer is a double indirect pointer. It points to a block of pointers, each of which points to another block of pointers, each of which finally points to data blocks. This adds 1024 × 1024 × 4 KB = 4 GB of addressable data.' },

      { type: 'h3', text: '4.4 Triple Indirect Pointer' },
      { type: 'p', text: 'The 15th pointer adds another level of indirection: 1024 × 1024 × 1024 × 4 KB = 4 TB. This is the theoretical maximum file size from the pointer structure alone (actual limits depend on the filesystem implementation and kernel).' },

      { type: 'callout', label: 'Note', text: 'Modern ext4 uses a more efficient "extents" system instead of the traditional indirect pointer tree. An extent records a contiguous range of blocks as (start_block, length) rather than individual pointers. This dramatically reduces metadata overhead for large files. The indirect pointer scheme described here is the classic Unix design and still the right mental model for understanding how filesystems scale.' },

      { type: 'hr' },

      // ── Section 5: Inode Exhaustion ────────────────────────────────────────
      { type: 'h2', text: '5. Inode Exhaustion — Running Out of "Identity Cards"' },
      { type: 'p', text: 'Here is a scenario that bites people in production. Your disk has 100 GB free. But you cannot create a single new file. Every write fails with "No space left on device." What happened?' },
      { type: 'p', text: 'You ran out of inodes. The filesystem has a fixed number of inodes allocated at format time. If you create millions of tiny files, you exhaust the inode table while barely using any data blocks. Each file — no matter how small, even 0 bytes — consumes one inode.' },

      { type: 'h3', text: '5.1 Common Culprits' },
      { type: 'ul', items: [
        'node_modules — a single JavaScript project can generate 50,000+ files across deeply nested dependencies.',
        'Mail servers — systems like Maildir store each email as a separate file.',
        'Web caches — proxy servers and CDNs create one file per cached resource.',
        'Log rotation gone wrong — thousands of small log fragments accumulating over months.',
        'Container layers — /var/lib/docker can accumulate massive numbers of files from image layers.',
      ] },

      { type: 'h3', text: '5.2 Detection' },
      { type: 'code', lang: 'bash', code: '# Check inode usage per filesystem\ndf -i\n# Filesystem      Inodes   IUsed    IFree  IUse%  Mounted on\n# /dev/sda1      6553600  6553600       0   100%  /\n\n# Find directories with the most files\nfind / -xdev -printf \'%h\\n\' | sort | uniq -c | sort -rh | head -n 20' },

      { type: 'h3', text: '5.3 Resolution' },
      { type: 'ol', items: [
        'Identify the culprit directory using the find command above.',
        'Delete unnecessary files — old caches, stale node_modules, orphaned temp files.',
        'Reconfigure the offending application — consolidate small files, adjust cache policies.',
        'As a last resort: reformat the filesystem with a higher inode ratio (mkfs.ext4 -i bytes-per-inode). This is destructive — you lose all data.',
      ] },

      { type: 'hr' },

      // ── Section 6: Git and CDN Strategies ──────────────────────────────────
      { type: 'h2', text: '6. Real-World Strategies: How Git and CDNs Avoid Inode Problems' },
      { type: 'p', text: 'Both Git and CDN caches deal with potentially millions of small files. They use directory hashing to distribute files evenly and avoid overwhelming any single directory.' },

      { type: 'h3', text: '6.1 Git\'s Object Storage' },
      { type: 'p', text: 'Git stores every object (commits, trees, blobs) in .git/objects/. Each object is identified by its SHA-1 hash — a 40-character hex string. Git uses a two-level directory structure: the first 2 characters become the directory name, the remaining 38 become the filename.' },
      { type: 'code', lang: 'bash', code: '# Object with hash 8d4ae0101c238b939f1c7d6118d042c1613917d5\n# is stored at:\n.git/objects/8d/4ae0101c238b939f1c7d6118d042c1613917d5\n\n# This creates 256 possible directories (00 through ff)\nls .git/objects/\n# 00  01  02 ... 8d ... fd  fe  ff  info  pack' },
      { type: 'p', text: 'Why this works: instead of millions of files in one directory (which would make directory lookups O(n) on many filesystems and risk inode exhaustion in the directory\'s own data blocks), files are spread across 256 subdirectories. Each subdirectory stays manageably small. Lookups are fast because you go directly to the right subdirectory using the first two characters of the hash.' },
      { type: 'p', text: 'For repositories with very many objects, Git also packs objects into .pack files — combining thousands of loose objects into a single file with an index. This further reduces inode usage.' },

      { type: 'h3', text: '6.2 CDN Cache Hierarchies' },
      { type: 'p', text: 'CDN edge servers cache web resources (images, CSS, JS, video segments) and need to store and retrieve them fast. A naive approach — one file per cached URL in a flat directory — would hit both filesystem performance limits and inode exhaustion.' },
      { type: 'p', text: 'Instead, CDNs hash the URL (using MD5, SHA-256, or similar) and use portions of the hash to create a multi-level directory structure:' },
      { type: 'code', lang: 'text', code: 'URL: https://example.com/images/logo.png\nHash: a1b2c3d4e5f6...\n\nCache path: /var/cache/cdn/a1/b2/c3d4e5f6...' },
      { type: 'p', text: 'The hash distributes files uniformly across directories regardless of the URL structure. No hot directories, no single points of inode pressure, and the hash provides O(1) lookup — you compute the hash and go directly to the file location.' },

      { type: 'hr' },

      // ── Section 7: Trade-offs ──────────────────────────────────────────────
      { type: 'h2', text: '7. Trade-offs and Nuances' },
      { type: 'ul', items: [
        'The inode table size is fixed at mkfs time on ext4. XFS and btrfs allocate inodes dynamically, which makes inode exhaustion less likely but adds complexity.',
        'Hard links share an inode — they are multiple directory entries pointing to the same inode number. This is why deleting one hard link does not delete the file; the data is freed only when the link count drops to 0.',
        'Symbolic links (symlinks) have their OWN inode. The symlink\'s data blocks contain the path to the target. If the target is deleted, the symlink becomes dangling — it points to nothing.',
        'The number of inodes you need depends entirely on your workload. A mail server needs many more inodes per GB than a video streaming server.',
        'Checking inode usage (df -i) should be part of your monitoring stack. Inode exhaustion is a silent killer — most dashboards only track disk space.',
      ] },

      { type: 'hr' },

      // ── Section 8: Further Reading ─────────────────────────────────────────
      { type: 'h2', text: '8. Further Reading' },
      { type: 'links', items: [
        { label: 'The Linux Kernel documentation — ext4 filesystem', url: 'https://www.kernel.org/doc/html/latest/filesystems/ext4/' },
        { label: 'Understanding the Linux Filesystem (Anatomy of ext4)', url: 'https://opensource.com/article/18/4/ext4-filesystem' },
        { label: 'OSTEP Chapter 40 — File System Implementation (free textbook)', url: 'https://pages.cs.wisc.edu/~remzi/OSTEP/' },
        { label: 'Git Internals — Git Objects', url: 'https://git-scm.com/book/en/v2/Git-Internals-Git-Objects' },
      ] },
    ],
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
  { label: 'github.com/IIIshan',            url: 'https://github.com/IIIshan' },
  { label: 'linkedin.com/in/ishanrana07',  url: 'https://www.linkedin.com/in/ishanrana07/' },
  { label: 'ishan@proton.me',              url: 'mailto:ishan@proton.me' },
]

// ─── Quotes ───────────────────────────────────────────────────────────────────

export interface Quote {
  text: string
  author: string
}

export const QUOTES: Quote[] = [
  // ── Programming & Software ─────────────────────────────────────────────────
  { text: 'Talk is cheap. Show me the code.', author: 'Linus Torvalds' },
  { text: 'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.', author: 'Martin Fowler' },
  { text: 'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.', author: 'Brian Kernighan' },
  { text: 'The first 90% of the code accounts for the first 90% of the development time. The remaining 10% of the code accounts for the other 90% of the development time.', author: 'Tom Cargill' },
  { text: "Nine people can't make a baby in a month.", author: 'Fred Brooks' },
  { text: 'Always code as if the guy who ends up maintaining your code will be a violent psychopath who knows where you live.', author: 'Martin Golding' },
  { text: 'Optimism is an occupational hazard of programming. Feedback is the treatment.', author: 'Kent Beck' },
  { text: 'The function of good software is to make the complex appear to be simple.', author: 'Grady Booch' },
  { text: 'Given enough eyeballs, all bugs are shallow.', author: 'Linus Torvalds' },
  { text: 'There are only two kinds of languages: the ones people complain about and the ones nobody uses.', author: 'Bjarne Stroustrup' },
  { text: "It's all talk until the code runs.", author: 'Ward Cunningham' },
  { text: 'Simplicity is prerequisite for reliability.', author: 'Edsger Dijkstra' },
  { text: 'Programs must be written for people to read, and only incidentally for machines to execute.', author: 'Harold Abelson' },
  { text: 'The best error message is the one that never shows up.', author: 'Thomas Fuchs' },
  { text: 'Make it work, make it right, make it fast.', author: 'Kent Beck' },
  { text: "Some people, when confronted with a problem, think 'I know, I'll use regular expressions.' Now they have two problems.", author: 'Jamie Zawinski' },
  { text: 'The most disastrous thing that you can ever learn is your first programming language.', author: 'Alan Kay' },
  { text: 'Walking on water and developing software from a specification are easy if both are frozen.', author: 'Edward V Berard' },
  { text: 'When in doubt, use brute force.', author: 'Ken Thompson' },
  { text: "I'm not a great programmer. I'm just a good programmer with great habits.", author: 'Kent Beck' },
  { text: 'People think that computer science is the art of geniuses but the actual reality is the opposite, just many people doing things that build on each other, like a wall of mini stones.', author: 'Donald Knuth' },
  { text: 'Most good programmers do programming not because they expect to get paid or get adulation by the public, but because it is fun to program.', author: 'Linus Torvalds' },
  { text: 'You can use an eraser on the drafting table or a sledgehammer on the construction site.', author: 'Frank Lloyd Wright' },
  { text: 'Programming is the art of telling another human what one wants the computer to do.', author: 'Donald Knuth' },
  { text: "The cheapest, fastest, and most reliable components are those that aren't there.", author: 'Gordon Bell' },
  { text: 'Deleted code is debugged code.', author: 'Jeff Sickel' },
  { text: 'Unix is simple. It just takes a genius to understand its simplicity.', author: 'Dennis Ritchie' },
  { text: 'First, solve the problem. Then, write the code.', author: 'John Johnson' },
  { text: "Code is like humor. When you have to explain it, it's bad.", author: 'Cory House' },
  { text: "If debugging is the process of removing software bugs, then programming must be the process of putting them in.", author: 'Edsger Dijkstra' },

  // ── Science, Engineering & General ─────────────────────────────────────────
  { text: 'Any sufficiently advanced technology is indistinguishable from magic.', author: 'Arthur C. Clarke' },
  { text: 'A clever person solves a problem. A wise person avoids it.', author: 'Albert Einstein' },
  { text: "A ship in port is safe, but that's not what ships are built for.", author: 'Grace Hopper' },
  { text: "In theory, theory and practice are the same. In practice, they're not.", author: 'Yogi Berra' },
  { text: 'The best way to predict the future is to invent it.', author: 'Alan Kay' },
  { text: 'Perfection is achieved not when there is nothing more to add, but when there is nothing left to take away.', author: 'Antoine de Saint-Exupery' },
  { text: 'We are what we repeatedly do. Excellence, then, is not an act, but a habit.', author: 'Aristotle' },
  { text: 'If I have seen further, it is by standing on the shoulders of giants.', author: 'Isaac Newton' },
  { text: 'Measure what is measurable, and make measurable what is not so.', author: 'Galileo Galilei' },
  { text: 'In God we trust. All others must bring data.', author: 'W. Edwards Deming' },
  { text: 'The only way to go fast is to go well.', author: 'Robert C. Martin' },
  { text: 'The important thing is not to stop questioning. Curiosity has its own reason for existing.', author: 'Albert Einstein' },
  { text: 'Science is what we understand well enough to explain to a computer. Art is everything else we do.', author: 'Donald Knuth' },
  { text: "The advance of technology is based on making it fit in so that you don't really even notice it, so it's part of everyday life.", author: 'Bill Gates' },
  { text: 'Automate everything once. Then automate the automation. The goal is a system that runs itself.', author: 'Unknown' },
]
