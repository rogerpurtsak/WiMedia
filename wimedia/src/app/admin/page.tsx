'use client';

import { useEffect, useMemo, useState } from 'react';

type Me = { authenticated: boolean; email?: string };
type Block = { id: number; slug: string; data: unknown; updatedAt?: string };

function pretty(json: unknown) {
  try {
    return JSON.stringify(json, null, 2);
  } catch {
    return '';
  }
}

function parseJsonOrThrow(s: string): unknown {
  try {
    return JSON.parse(s);
  } catch {
    throw new Error('Invalid JSON');
  }
}

export default function AdminPage() {
  // auth/session
  const [me, setMe] = useState<Me | null>(null);
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

  const authed = useMemo(() => Boolean(me?.authenticated), [me]);

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
      if (r.status === 401) {
        setBlocks([]);
        return;
      }
      const list = (await r.json()) as Block[];
      setBlocks(list);
    } catch (e) {
      setErr('Failed to load content');
    } finally {
      setLoadingBlocks(false);
    }
  }

  useEffect(() => {
    // on mount: check session, then load blocks if authenticated
    (async () => {
      await fetchMe();
    })();
  }, []);

  useEffect(() => {
    if (authed) void fetchBlocks();
  }, [authed]);

  async function onLogin(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setErr(null);
    setMsg(null);
    const f = new FormData(e.currentTarget);
    const email = String(f.get('email') ?? '');
    const password = String(f.get('password') ?? '');
    if (!email || !password) {
      setErr('Missing email or password');
      return;
    }
    const r = await fetch('/api/admin/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      cache: 'no-store',
      body: JSON.stringify({ email, password }),
    });
    if (r.ok) {
      setMsg('Logged in');
      await fetchMe();
      await fetchBlocks();
    } else {
      setErr('Invalid login');
    }
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
    setMsg('New block');
    setErr(null);
  }

  async function saveBlock() {
    setSaving(true);
    setMsg(null);
    setErr(null);
    try {
      if (!slug.trim()) {
        setErr('Please enter a slug (e.g., home_hero)');
        return;
      }
      const data = parseJsonOrThrow(jsonText);
      const r = await fetch('/api/admin/content', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        cache: 'no-store',
        body: JSON.stringify({ slug: slug.trim(), data }),
      });
      if (!r.ok) {
        setErr('Save failed');
        return;
      }
      setMsg('Saved');
      await fetchBlocks();
    } catch (e) {
      setErr(e instanceof Error ? e.message : 'Invalid JSON');
    } finally {
      setSaving(false);
    }
  }

  async function deleteBlock(s: string) {
    if (!confirm(`Delete "${s}"? This cannot be undone.`)) return;
    setErr(null);
    setMsg(null);
    const r = await fetch(`/api/admin/content/${encodeURIComponent(s)}`, {
      method: 'DELETE',
      cache: 'no-store',
    });
    if (r.ok) {
      setMsg('Deleted');
      if (slug === s) newBlock();
      await fetchBlocks();
    } else {
      setErr('Delete failed');
    }
  }

  function formatJson() {
    try {
      const parsed = parseJsonOrThrow(jsonText);
      setJsonText(JSON.stringify(parsed, null, 2));
      setMsg('Formatted');
      setErr(null);
    } catch (e) {
      setErr(e instanceof Error ? e.message : 'Invalid JSON');
    }
  }

  return (
    <main className="mx-auto max-w-5xl p-6 space-y-8">
      <header className="flex items-center justify-between">
        <h1 className="text-2xl md:text-3xl font-bold">Admin</h1>
        {authed ? (
          <div className="flex items-center gap-3">
            <span className="text-sm text-gray-600">Signed in as {me?.email}</span>
            <button
              onClick={onLogout}
              className="text-sm px-3 py-1 rounded border border-gray-300 hover:bg-gray-50"
            >
              Logout
            </button>
          </div>
        ) : null}
      </header>

      {!authed ? (
        <section className="max-w-md border rounded-2xl p-4 space-y-3">
          <h2 className="font-semibold">Login</h2>
          <form onSubmit={onLogin} className="space-y-3">
            <input
              name="email"
              type="email"
              placeholder="Email"
              className="w-full border rounded px-3 py-2"
              required
            />
            <input
              name="password"
              type="password"
              placeholder="Password"
              className="w-full border rounded px-3 py-2"
              required
            />
            <button className="w-full bg-black text-white py-2 rounded hover:opacity-90">
              Sign in
            </button>
          </form>
          {err && <p className="text-sm text-red-600">{err}</p>}
          {msg && <p className="text-sm text-green-600">{msg}</p>}
        </section>
      ) : (
        <div className="grid md:grid-cols-2 gap-6">
          {/* Left: blocks list */}
          <section className="border rounded-2xl p-4 space-y-3">
            <div className="flex items-center justify-between">
              <h2 className="font-semibold">Content blocks</h2>
              <button
                onClick={newBlock}
                className="text-sm px-3 py-1 rounded border border-gray-300 hover:bg-gray-50"
              >
                + New
              </button>
            </div>

            {loadingBlocks ? (
              <p className="text-sm text-gray-500">Loading…</p>
            ) : blocks.length === 0 ? (
              <p className="text-sm text-gray-500">No blocks yet. Create your first one →</p>
            ) : (
              <ul className="divide-y">
                {blocks.map((b) => (
                  <li key={b.id} className="py-2 flex items-center justify-between gap-3">
                    <div>
                      <p className="font-mono text-sm">{b.slug}</p>
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
                ))}
              </ul>
            )}
          </section>

          {/* Right: editor */}
          <section className="border rounded-2xl p-4 space-y-3">
            <h2 className="font-semibold">Editor</h2>
            <input
              value={slug}
              onChange={(e) => setSlug(e.target.value)}
              placeholder="slug e.g. home_hero"
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
                onClick={formatJson}
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
