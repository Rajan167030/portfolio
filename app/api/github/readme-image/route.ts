export async function GET(req: Request) {
  try {
    const url = new URL(req.url)
    const owner = url.searchParams.get("owner")
    const repo = url.searchParams.get("repo")

    if (!owner || !repo) {
      return new Response(JSON.stringify({ error: "Missing owner or repo" }), {
        status: 400,
        headers: { "content-type": "application/json" },
      })
    }

    const token = process.env.GITHUB_TOKEN
    const headers: HeadersInit = token
      ? { Authorization: `Bearer ${token}`, Accept: "application/vnd.github+json" }
      : { Accept: "application/vnd.github+json" }

    // Get README metadata (to find download_url)
    const readmeRes = await fetch(`https://api.github.com/repos/${owner}/${repo}/readme`, {
      headers,
      next: { revalidate: 3600 },
    } as any)

    if (!readmeRes.ok) {
      return new Response(JSON.stringify({ imageUrl: null }), {
        status: 200,
        headers: { "content-type": "application/json" },
      })
    }

    const readme = await readmeRes.json()
    const downloadUrl: string | undefined = readme?.download_url
    const defaultBranch: string = readme?.content ? readme?.default_branch || "HEAD" : "HEAD"

    if (!downloadUrl) {
      return new Response(JSON.stringify({ imageUrl: null }), {
        status: 200,
        headers: { "content-type": "application/json" },
      })
    }

    const md = await fetch(downloadUrl, { headers }).then((r) => r.text())

    // Find first Markdown image ![alt](url)
    const match = md.match(/!\[[^\]]*\]$$([^)]+)$$/)
    if (!match) {
      return new Response(JSON.stringify({ imageUrl: null }), {
        status: 200,
        headers: { "content-type": "application/json" },
      })
    }

    let imageUrl = match[1].trim().replace(/^<|>$/g, "")

    // Resolve relative paths to raw.githubusercontent.com
    if (!/^https?:\/\//i.test(imageUrl)) {
      const cleanPath = imageUrl.replace(/^\.?\//, "")
      imageUrl = `https://raw.githubusercontent.com/${owner}/${repo}/${defaultBranch}/${cleanPath}`
    }

    return Response.json({ imageUrl })
  } catch (err: any) {
    return new Response(JSON.stringify({ imageUrl: null, error: err?.message || "Unknown error" }), {
      status: 200,
      headers: { "content-type": "application/json" },
    })
  }
}
