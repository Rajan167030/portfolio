import ProjectsExplorer from "./explorer"

type Repo = {
  id: number
  name: string
  full_name: string
  html_url: string
  description: string | null
  language: string | null
  stargazers_count: number
  forks_count: number
  open_issues_count: number
  watchers_count: number
  archived: boolean
  fork: boolean
  topics?: string[]
  homepage?: string | null
  default_branch?: string
  pushed_at?: string
  updated_at?: string
  created_at?: string
  owner?: { login?: string }
  visibility?: string
}

async function getRepos(): Promise<Repo[]> {
  // Prefer server-side GitHub API using token if available; fall back to public username.
  const token = process.env.GITHUB_TOKEN
  const headers: HeadersInit = token
    ? { Authorization: `Bearer ${token}`, Accept: "application/vnd.github+json" }
    : { Accept: "application/vnd.github+json" }

  // If we have a token, resolve the username dynamically
  let username: string | null = null
  if (token) {
    try {
      const me = await fetch("https://api.github.com/user", {
        headers,
        next: { revalidate: 3600 },
      } as any).then((r) => (r.ok ? r.json() : null))
      username = me?.login ?? null
    } catch {
      // ignore
    }
  }

  // Fallback username if not resolved (adjust if needed)
  if (!username) {
    username = "rajanjha"
  }

  const res = await fetch(`https://api.github.com/users/${username}/repos?per_page=100&sort=updated`, {
    headers,
    next: { revalidate: 1800 },
  } as any)

  if (!res.ok) {
    // Return empty list to avoid build failure
    return []
  }

  const repos = await res.json()

  return (Array.isArray(repos) ? repos : []).map((r: any) => ({
    id: r.id,
    name: r.name,
    full_name: r.full_name,
    html_url: r.html_url,
    description: r.description,
    language: r.language,
    stargazers_count: r.stargazers_count,
    forks_count: r.forks_count,
    open_issues_count: r.open_issues_count,
    watchers_count: r.watchers_count,
    archived: r.archived,
    fork: r.fork,
    topics: r.topics ?? [],
    homepage: r.homepage,
    default_branch: r.default_branch || "main",
    pushed_at: r.pushed_at,
    updated_at: r.updated_at,
    created_at: r.created_at,
    owner: { login: r.owner?.login },
    visibility: r.visibility,
  }))
}

export default async function Page() {
  const repos = await getRepos()

  // Optionally define pinned repo names
  const pinned: string[] = []

  return (
    <main className="min-h-screen w-full bg-white dark:bg-background">
      <div className="mx-auto max-w-7xl px-4 py-10">
        <h1 className="mb-2 text-3xl font-semibold tracking-tight">Projects</h1>
        <p className="mb-8 text-muted-foreground">
          Explore my public GitHub repositories. Use search and filters to find something specific.
        </p>

        <ProjectsExplorer initialRepos={repos} pinned={pinned} />
      </div>
    </main>
  )
}
