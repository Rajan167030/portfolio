"use client"

import { useEffect, useMemo, useState } from "react"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ExternalLink, GitFork, Star, RefreshCw } from "lucide-react"

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

type ProjectsExplorerProps = {
  initialRepos?: Repo[]
  pinned?: string[]
}

function formatDate(input?: string) {
  if (!input) return ""
  const d = new Date(input)
  if (Number.isNaN(d.getTime())) return ""
  return d.toLocaleDateString(undefined, { year: "numeric", month: "short", day: "numeric" })
}

function cn(...classes: (string | undefined | false | null)[]) {
  return classes.filter(Boolean).join(" ")
}

function RepoImage({ owner, repo }: { owner?: string; repo: string }) {
  const [src, setSrc] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let isMounted = true
    async function run() {
      try {
        const o = owner || ""
        const u = `/api/github/readme-image?owner=${encodeURIComponent(o)}&repo=${encodeURIComponent(repo)}`
        const res = await fetch(u, { cache: "force-cache" })
        const data = await res.json()
        if (!isMounted) return
        if (data?.imageUrl) setSrc(data.imageUrl)
      } catch {
        // ignore
      } finally {
        if (isMounted) setLoading(false)
      }
    }
    run()
    return () => {
      isMounted = false
    }
  }, [owner, repo])

  return (
    <div className="aspect-video w-full overflow-hidden rounded-md bg-gradient-to-br from-zinc-100 to-zinc-200 dark:from-zinc-900 dark:to-zinc-800">
      {src ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={src || "/placeholder.svg"}
          alt={`${repo} preview image from README`}
          className="h-full w-full object-cover"
          loading="lazy"
        />
      ) : (
        <div className="flex h-full w-full items-center justify-center text-xs text-muted-foreground">
          {loading ? "Loading preview…" : "No preview found"}
        </div>
      )}
    </div>
  )
}

export default function ProjectsExplorer({ initialRepos = [], pinned = [] }: ProjectsExplorerProps) {
  const [query, setQuery] = useState("")
  const [language, setLanguage] = useState("all")
  const [hideForks, setHideForks] = useState(true)
  const [hideArchived, setHideArchived] = useState(true)
  const [sortKey, setSortKey] = useState<"updated" | "stars" | "name">("updated")
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [repos, setRepos] = useState<Repo[]>(initialRepos)

  const languages = useMemo(() => {
    const set = new Set<string>()
    for (const r of repos) {
      if (r.language) set.add(r.language)
    }
    return Array.from(set).sort((a, b) => a.localeCompare(b))
  }, [repos])

  const filtered = useMemo(() => {
    let list = [...repos]

    if (hideForks) list = list.filter((r) => !r.fork)
    if (hideArchived) list = list.filter((r) => !r.archived)

    if (language !== "all") {
      list = list.filter((r) => (r.language || "").toLowerCase() === language.toLowerCase())
    }

    const q = query.trim().toLowerCase()
    if (q) {
      list = list.filter((r) => {
        const name = r.name.toLowerCase()
        const desc = (r.description || "").toLowerCase()
        const topics = (r.topics || []).join(" ").toLowerCase()
        return name.includes(q) || desc.includes(q) || topics.includes(q)
      })
    }

    list.sort((a, b) => {
      if (sortKey === "name") return a.name.localeCompare(b.name)
      if (sortKey === "stars") return (b.stargazers_count || 0) - (a.stargazers_count || 0)
      // updated
      const ad = new Date(a.updated_at || a.pushed_at || a.created_at || 0).getTime()
      const bd = new Date(b.updated_at || b.pushed_at || b.created_at || 0).getTime()
      return bd - ad
    })

    if (pinned.length > 0) {
      const pinSet = new Set(pinned.map((s) => s.toLowerCase()))
      const pins: Repo[] = []
      const rest: Repo[] = []
      for (const r of list) {
        if (pinSet.has(r.name.toLowerCase())) pins.push(r)
        else rest.push(r)
      }
      return [...pins, ...rest]
    }

    return list
  }, [repos, hideForks, hideArchived, language, query, sortKey, pinned])

  async function refresh() {
    try {
      setIsRefreshing(true)
      // Ask API to exclude forks and archived by default, we still allow toggling in UI
      const params = new URLSearchParams({
        excludeForks: String(hideForks),
        excludeArchived: String(hideArchived),
      })
      const res = await fetch(`/api/github/repos?${params.toString()}`, { cache: "no-store" })
      if (!res.ok) throw new Error(`Failed to refresh: ${res.status}`)
      const data: Repo[] = await res.json()
      setRepos(data)
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error(err)
    } finally {
      setIsRefreshing(false)
    }
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div className="grid w-full grid-cols-1 gap-3 sm:grid-cols-2 md:max-w-3xl md:grid-cols-4">
          <div className="col-span-2">
            <label htmlFor="search" className="mb-1 block text-sm font-medium">
              Search
            </label>
            <Input
              id="search"
              placeholder="Search repositories…"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium">Language</label>
            <Select value={language} onValueChange={setLanguage}>
              <SelectTrigger>
                <SelectValue placeholder="Language" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                {languages.map((lang) => (
                  <SelectItem key={lang} value={lang}>
                    {lang}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium">Sort by</label>
            <Select value={sortKey} onValueChange={(v) => setSortKey(v as any)}>
              <SelectTrigger>
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="updated">Recently Updated</SelectItem>
                <SelectItem value="stars">Stars</SelectItem>
                <SelectItem value="name">Name</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="flex items-center gap-6">
          <label className="flex items-center gap-2 text-sm">
            <Checkbox checked={hideForks} onCheckedChange={(v) => setHideForks(Boolean(v))} />
            <span>Hide forks</span>
          </label>
          <label className="flex items-center gap-2 text-sm">
            <Checkbox checked={hideArchived} onCheckedChange={(v) => setHideArchived(Boolean(v))} />
            <span>Hide archived</span>
          </label>
          <Button onClick={refresh} disabled={isRefreshing} variant="secondary">
            <RefreshCw className={cn("mr-2 h-4 w-4", isRefreshing && "animate-spin")} />
            {isRefreshing ? "Refreshing…" : "Refresh"}
          </Button>
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="rounded-md border p-8 text-center text-sm text-muted-foreground">
          No repositories match your filters.
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((repo) => (
            <Card key={repo.id} className="flex flex-col overflow-hidden">
              <CardHeader className="space-y-1">
                <CardTitle className="flex items-center justify-between gap-3">
                  <a
                    href={repo.html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="line-clamp-1 hover:underline"
                  >
                    {repo.name}
                  </a>
                  <a href={repo.html_url} target="_blank" rel="noopener noreferrer" aria-label="Open on GitHub">
                    <ExternalLink className="h-4 w-4 text-muted-foreground" />
                  </a>
                </CardTitle>
                {repo.topics && repo.topics.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {repo.topics.slice(0, 5).map((t) => (
                      <Badge key={t} variant="secondary">
                        {t}
                      </Badge>
                    ))}
                  </div>
                )}
              </CardHeader>

              <CardContent className="flex flex-1 flex-col gap-4">
                <RepoImage owner={repo.owner?.login} repo={repo.name} />

                <p className="line-clamp-3 text-sm text-muted-foreground">{repo.description || "No description."}</p>

                <div className="mt-auto flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
                  {repo.language && <Badge variant="outline">{repo.language}</Badge>}
                  <span className="inline-flex items-center gap-1">
                    <Star className="h-3.5 w-3.5" /> {repo.stargazers_count}
                  </span>
                  <span className="inline-flex items-center gap-1">
                    <GitFork className="h-3.5 w-3.5" /> {repo.forks_count}
                  </span>
                  <span className="ml-auto">Updated {formatDate(repo.updated_at)}</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
