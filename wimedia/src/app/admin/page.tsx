'use client';

import { useEffect, useMemo, useState } from 'react';

type Me = { authenticated: boolean; email?: string };
type Block = { id: number; slug: string; data: unknown; updatedAt?: string };

function pretty(json: unknown) {
  try { return JSON.stringify(json, null, 2); } catch { return ''; }
}
function parseJsonOrThrow(s: string): unknown {
  try { return JSON.parse(s); } catch { throw new Error('Invalid JSON'); }
}
function toLabel(s: string) {
  return s.replace(/[_-]+/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());
}
/** Extract page + section from slug like "about_hero" */
function parseSlug(slug: string) {
  const [page, ...rest] = slug.split('_');
  return {
    pageKey: (page || 'general').toUpperCase(),   // ABOUT
    section: rest.length ? rest.join('_') : 'section', // hero
  };
}

export default function AdminPage() {
  // auth/session
  const [me, setMe] = useState<Me | null>(null);
  const authed = useMemo(() => Boolean(me?.authenticated), [me]);

  // blocks
  const [blocks, setBlocks] = useState<Block[]>([]);
  const [loadingBlocks, setLoadingBlocks] = useState(false);

  // editor state
  const [slug, setSlug] = useState('');
  const [jsonText, setJsonText] = useState('{\n  "title": "Hello",\n  "subtitle": "Edit me"\n}');
  const [saving, setSaving] = useState(false);

  // ui
  const [msg, setMsg] = useState<string | null>(null);
  const [err, setErr] = useState<string | null>(null);

  async function fetchMe() {
    const r = await fetch('/api/admin/me', { cache: 'no-store' });
    const data = (await r.json()) as Me;
    setMe(data);
  }
  async function fetchBlocks() {
    setLoadingBlocks(true);
    setErr(null);
    try {
      const r = await fetch('/api/admin/content', { cache: 'no-store' });
      if (r.status === 401) { setBlocks([]); return; }
      const list = (await r.json()) as Block[];
      setBlocks(list);
    } catch {
      setErr('Failed to load content');
    } finally {
      setLoadingBlocks(false);
    }
  }

  useEffect(() => { void fetchMe(); }, []);
  useEffect(() => { if (authed) void fetchBlocks(); }, [authed]);

  async function onLogin(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setErr(null); setMsg(null);
    const f = new FormData(e.currentTarget);
    const email = String(f.get('email') ?? '');
    const password = String(f.get('password') ?? '');
    if (!email || !password) { setErr('Missing email or password'); return; }
    const r = await fetch('/api/admin/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      cache: 'no-store',
      body: JSON.stringify({ email, password }),
    });
    if (r.ok) { setMsg('Logged in'); await fetchMe(); await fetchBlocks(); }
    else setErr('Invalid login');
  }

  async function onLogout() {
    await fetch('/api/admin/logout', { method: 'POST' });
    setMe({ authenticated: false });
    setBlocks([]);
    setMsg('Logged out');
  }

  function loadBlock(b: Block) {
    setSlug(b.slug);
    setJsonText(pretty(b.data));
    setMsg(`Loaded "${b.slug}"`);
    setErr(null);
  }
  function newBlock() {
    setSlug('');
    setJsonText('{\n  "title": "Hello",\n  "subtitle": "Edit me"\n}');
    setMsg('New block'); setErr(null);
  }

  async function saveBlock() {
    setSaving(true); setMsg(null); setErr(null);
    try {
      if (!slug.trim()) { setErr('Please enter a slug (e.g., about_hero)'); return; }
      const data = parseJsonOrThrow(jsonText);
      const r = await fetch('/api/admin/content', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        cache: 'no-store',
        body: JSON.stringify({ slug: slug.trim(), data }),
      });
      if (!r.ok) { setErr('Save failed'); return; }
      setMsg('Saved');
      await fetchBlocks();
    } catch (e) {
      setErr(e instanceof Error ? e.message : 'Invalid JSON');
    } finally { setSaving(false); }
  }

  async function deleteBlock(s: string) {
    if (!confirm(`Delete "${s}"? This cannot be undone.`)) return;
    setErr(null); setMsg(null);
    const r = await fetch(`/api/admin/content/${encodeURIComponent(s)}`, {
      method: 'DELETE', cache: 'no-store',
    });
    if (r.ok) {
      setMsg('Deleted');
      if (slug === s) newBlock();
      await fetchBlocks();
    } else setErr('Delete failed');
  }

  /** Group ONLY existing DB blocks by page (derived from slug) */
  const groupedByPage = useMemo(() => {
    const m: Record<string, Block[]> = {};
    for (const b of blocks) {
      const { pageKey } = parseSlug(b.slug);
      (m[pageKey] ||= []).push(b);
    }
    // sort pages A→Z and blocks by slug for stable UI
    for (const k of Object.keys(m)) m[k].sort((a, b) => a.slug.localeCompare(b.slug));
    return Object.fromEntries(Object.entries(m).sort(([a], [b]) => a.localeCompare(b)));
  }, [blocks]);

  return (
    <main className="mx-auto max-w-5xl p-6 space-y-8">
      <header className="flex items-center justify-between">
        <h1 className="text-2xl md:text-3xl font-bold">Admin</h1>
        {authed ? (
          <div className="flex items-center gap-3">
            <span className="text-sm text-gray-600">Signed in as {me?.email}</span>
            <button onClick={onLogout} className="text-sm px-3 py-1 rounded border border-gray-300 hover:bg-gray-50">
              Logout
            </button>
          </div>
        ) : null}
      </header>

      {!authed ? (
        <section className="max-w-md border rounded-2xl p-4 space-y-3">
          <h2 className="font-semibold">Login</h2>
          <form onSubmit={onLogin} className="space-y-3">
            <input name="email" type="email" placeholder="Email" className="w-full border rounded px-3 py-2" required />
            <input name="password" type="password" placeholder="Password" className="w-full border rounded px-3 py-2" required />
            <button className="w-full bg-black text-white py-2 rounded hover:opacity-90">Sign in</button>
          </form>
          {err && <p className="text-sm text-red-600">{err}</p>}
          {msg && <p className="text-sm text-green-600">{msg}</p>}
        </section>
      ) : (
        <div className="grid md:grid-cols-2 gap-6">
          {/* Left: shows ONLY real DB-backed sections */}
          <section className="border rounded-2xl p-4 space-y-3">
            <div className="flex items-center justify-between">
              <h2 className="font-semibold">Content blocks</h2>
              <button onClick={newBlock} className="text-sm px-3 py-1 rounded border border-gray-300 hover:bg-gray-50">
                + New
              </button>
            </div>

            {loadingBlocks ? (
              <p className="text-sm text-gray-500">Loading…</p>
            ) : Object.keys(groupedByPage).length === 0 ? (
              <p className="text-sm text-gray-500">No blocks found in DB yet.</p>
            ) : (
              <div className="space-y-3">
                {Object.entries(groupedByPage).map(([page, list]) => (
                  <details key={page} className="rounded-xl border p-3 open:shadow-sm" open>
                    <summary className="cursor-pointer list-none font-semibold flex items-center justify-between">
                      <span>{toLabel(page)}</span>
                      <span className="text-xs text-gray-500">
                        {list.length} section{list.length > 1 ? 's' : ''}
                      </span>
                    </summary>

                    <ul className="mt-3 divide-y">
                      {list.map((b) => {
                        const { section } = parseSlug(b.slug);
                        return (
                          <li key={b.id} className="py-2 flex items-center justify-between gap-3">
                            <div>
                              <p className="font-medium">{toLabel(section)}</p>
                              <p className="font-mono text-xs text-gray-500">{b.slug}</p>
                              {b.updatedAt && (
                                <p className="text-xs text-gray-500">
                                  Updated {new Date(b.updatedAt).toLocaleString()}
                                </p>
                              )}
                            </div>
                            <div className="flex items-center gap-2">
                              <button
                                onClick={() => loadBlock(b)}
                                className="text-sm px-3 py-1 rounded border border-gray-300 hover:bg-gray-50"
                              >
                                Edit
                              </button>
                              <button
                                onClick={() => deleteBlock(b.slug)}
                                className="text-sm px-3 py-1 rounded border border-red-300 text-red-700 hover:bg-red-50"
                              >
                                Delete
                              </button>
                            </div>
                          </li>
                        );
                      })}
                    </ul>
                  </details>
                ))}
              </div>
            )}
          </section>

          {/* Right: editor */}
          <section className="border rounded-2xl p-4 space-y-3">
            <h2 className="font-semibold">Editor</h2>
            <input
              value={slug}
              onChange={(e) => setSlug(e.target.value)}
              placeholder="slug e.g. about_hero"
              className="w-full border rounded px-3 py-2 font-mono"
            />
            <textarea
              value={jsonText}
              onChange={(e) => setJsonText(e.target.value)}
              rows={16}
              className="w-full border rounded px-3 py-2 font-mono text-sm"
              spellCheck={false}
            />
            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  try { const p = parseJsonOrThrow(jsonText); setJsonText(JSON.stringify(p, null, 2)); setMsg('Formatted'); setErr(null); }
                  catch (e) { setErr(e instanceof Error ? e.message : 'Invalid JSON'); }
                }}
                type="button"
                className="px-3 py-2 rounded border border-gray-300 hover:bg-gray-50"
              >
                Format JSON
              </button>
              <button
                onClick={saveBlock}
                disabled={saving}
                className="px-4 py-2 rounded bg-black text-white hover:opacity-90 disabled:opacity-60"
              >
                {saving ? 'Saving…' : 'Save'}
              </button>
            </div>
            {err && <p className="text-sm text-red-600">{err}</p>}
            {msg && <p className="text-sm text-green-600">{msg}</p>}
          </section>
        </div>
      )}
    </main>
  );
}
