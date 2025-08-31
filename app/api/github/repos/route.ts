export async function GET(req: Request) {
  try {
    const url = new URL(req.url)
    const excludeForks = url.searchParams.get("excludeForks") === "true"
    const excludeArchived = url.searchParams.get("excludeArchived") === "true"
    const usernameParam = url.searchParams.get("username") || ""

    const token = process.env.GITHUB_TOKEN
    const headers: HeadersInit = token
      ? { Authorization: `Bearer ${token}`, Accept: "application/vnd.github+json" }
      : { Accept: "application/vnd.github+json" }

    // Determine username
    let username = usernameParam
    if (!username && token) {
      const me = await fetch("https://api.github.com/user", { headers }).then((r) => r.json())
      if (me?.login) username = me.login
    }
    if (!username) {
      // Fallback: try a public example username (change if needed)
      username = "rajanjha"
    }

    const reposRes = await fetch(`https://api.github.com/users/${username}/repos?per_page=100&sort=updated`, {
      headers,
      // Cache for one hour; adjust as needed
      next: { revalidate: 3600 },
    } as any)

    if (!reposRes.ok) {
      const text = await reposRes.text()
      return new Response(JSON.stringify({ error: `GitHub API error: ${reposRes.status} ${text}` }), {
        status: reposRes.status,
        headers: { "content-type": "application/json" },
      })
    }

    const repos = await reposRes.json()

    // Minimal normalization and optional filtering
    const normalized = (Array.isArray(repos) ? repos : []).map((r: any) => ({
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

    const filtered = normalized.filter((r: any) => {
      if (excludeForks && r.fork) return false
      if (excludeArchived && r.archived) return false
      return true
    })

    return Response.json(filtered)
  } catch (err: any) {
    return new Response(JSON.stringify({ error: err?.message || "Unknown error" }), {
      status: 500,
      headers: { "content-type": "application/json" },
    })
  }
}
