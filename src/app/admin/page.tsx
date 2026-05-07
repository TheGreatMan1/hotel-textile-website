"use client";

import { type FormEvent, type ReactNode, useEffect, useMemo, useState } from "react";

const contentDocuments = [
  ["settings", "Site settings"],
  ["site.en", "English page content"],
  ["site.ge", "Georgian page content"],
  ["products.en", "English products"],
  ["products.ge", "Georgian products"],
  ["interactive-bed.en", "English interactive bed"],
  ["interactive-bed.ge", "Georgian interactive bed"],
  ["gallery", "Gallery"],
  ["catalog", "Catalog PDF"],
  ["map", "Map"],
  ["process.en", "English process"],
  ["process.ge", "Georgian process"],
  ["quote-form", "Quote form labels"],
  ["contact", "Contact methods"],
  ["footer", "Footer"]
] as const;

type Lead = Record<string, string | number | null>;

export default function AdminPage() {
  const [authenticated, setAuthenticated] = useState(false);
  const [checking, setChecking] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [selectedKey, setSelectedKey] = useState<string>(contentDocuments[0][0]);
  const [jsonText, setJsonText] = useState("");
  const [message, setMessage] = useState("");
  const [leads, setLeads] = useState<Lead[]>([]);

  const selectedLabel = useMemo(
    () => contentDocuments.find(([key]) => key === selectedKey)?.[1] || selectedKey,
    [selectedKey]
  );

  useEffect(() => {
    fetch("/api/admin/me")
      .then((response) => response.json())
      .then((data) => setAuthenticated(Boolean(data.authenticated)))
      .finally(() => setChecking(false));
  }, []);

  useEffect(() => {
    if (authenticated) {
      loadContent(selectedKey);
      loadLeads();
    }
  }, [authenticated, selectedKey]);

  async function login(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMessage("");
    const response = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password })
    });

    if (response.ok) {
      setAuthenticated(true);
      setPassword("");
    } else {
      setMessage("Invalid admin login.");
    }
  }

  async function logout() {
    await fetch("/api/admin/logout", { method: "POST" });
    setAuthenticated(false);
  }

  async function loadContent(key: string) {
    const response = await fetch(`/api/admin/content/${key}`);
    if (!response.ok) return;
    const data = await response.json();
    setJsonText(JSON.stringify(data, null, 2));
  }

  async function saveContent() {
    setMessage("");
    let parsed: unknown;

    try {
      parsed = JSON.parse(jsonText);
    } catch {
      setMessage("Invalid JSON. Please fix the editor before saving.");
      return;
    }

    const response = await fetch(`/api/admin/content/${selectedKey}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(parsed)
    });

    setMessage(response.ok ? "Content saved." : "Could not save content.");
  }

  async function loadLeads() {
    const response = await fetch("/api/admin/leads");
    if (!response.ok) return;
    const data = await response.json();
    setLeads(data.leads || []);
  }

  async function updateLead(id: string | number, status: string) {
    await fetch(`/api/admin/leads/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status })
    });
    await loadLeads();
  }

  async function uploadFile(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMessage("");
    const form = event.currentTarget;
    const formData = new FormData(form);
    const response = await fetch("/api/admin/uploads", {
      method: "POST",
      body: formData
    });
    const data = await response.json().catch(() => null);
    setMessage(
      response.ok
        ? `Uploaded: ${data.publicPath}`
        : data?.error || "Upload failed."
    );
    if (response.ok) form.reset();
  }

  if (checking) {
    return <AdminShell>Loading admin...</AdminShell>;
  }

  if (!authenticated) {
    return (
      <AdminShell>
        <form onSubmit={login} className="mx-auto max-w-md rounded-xl border border-stone-200 bg-white p-6 shadow-soft">
          <h1 className="font-serif text-3xl font-semibold text-charcoal">
            Admin login
          </h1>
          <label className="mt-6 block text-sm font-semibold">
            Email
            <input
              className="mt-2 w-full rounded-lg border border-stone-300 px-4 py-3"
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
          </label>
          <label className="mt-4 block text-sm font-semibold">
            Password
            <input
              className="mt-2 w-full rounded-lg border border-stone-300 px-4 py-3"
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
          </label>
          <button className="primary-button mt-6 w-full" type="submit">
            Log in
          </button>
          {message ? <p className="mt-4 text-sm text-red-700">{message}</p> : null}
        </form>
      </AdminShell>
    );
  }

  return (
    <AdminShell>
      <div className="mb-8 flex flex-col justify-between gap-4 border-b border-stone-200 pb-6 sm:flex-row sm:items-center">
        <div>
          <p className="eyebrow">Custom CMS</p>
          <h1 className="font-serif text-4xl font-semibold text-charcoal">
            LuxeTex Admin
          </h1>
        </div>
        <button type="button" onClick={logout} className="secondary-button">
          Log out
        </button>
      </div>

      <div className="grid gap-8 xl:grid-cols-[16rem_1fr]">
        <aside className="space-y-2">
          {contentDocuments.map(([key, label]) => (
            <button
              key={key}
              type="button"
              onClick={() => setSelectedKey(key)}
              className={`w-full rounded-lg px-4 py-3 text-left text-sm font-semibold transition ${
                selectedKey === key
                  ? "bg-charcoal text-ivory"
                  : "bg-white text-charcoal hover:bg-champagne/25"
              }`}
            >
              {label}
            </button>
          ))}
        </aside>

        <main className="space-y-8">
          <section className="rounded-xl border border-stone-200 bg-white p-5 shadow-sm">
            <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
              <h2 className="font-serif text-2xl font-semibold text-charcoal">
                {selectedLabel}
              </h2>
              <button type="button" onClick={saveContent} className="primary-button">
                Save JSON
              </button>
            </div>
            <textarea
              className="mt-4 min-h-[32rem] w-full rounded-lg border border-stone-300 bg-stone-950 p-4 font-mono text-sm text-stone-100"
              value={jsonText}
              onChange={(event) => setJsonText(event.target.value)}
              spellCheck={false}
            />
            {message ? (
              <p className="mt-3 rounded-lg bg-champagne/20 px-4 py-3 text-sm font-semibold text-charcoal">
                {message}
              </p>
            ) : null}
          </section>

          <section className="rounded-xl border border-stone-200 bg-white p-5 shadow-sm">
            <h2 className="font-serif text-2xl font-semibold text-charcoal">
              Upload image or catalog PDF
            </h2>
            <form onSubmit={uploadFile} className="mt-4 grid gap-3 sm:grid-cols-[12rem_1fr_auto]">
              <select name="kind" className="rounded-lg border border-stone-300 px-4 py-3">
                <option value="images">Image</option>
                <option value="catalog">Catalog PDF</option>
              </select>
              <input
                name="file"
                type="file"
                className="rounded-lg border border-stone-300 px-4 py-3"
                required
              />
              <button type="submit" className="secondary-button">
                Upload
              </button>
            </form>
          </section>

          <section className="rounded-xl border border-stone-200 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between gap-4">
              <h2 className="font-serif text-2xl font-semibold text-charcoal">
                Quote leads
              </h2>
              <button type="button" onClick={loadLeads} className="secondary-button">
                Refresh
              </button>
            </div>
            <div className="mt-4 overflow-x-auto">
              <table className="w-full min-w-[52rem] text-left text-sm">
                <thead className="bg-ivory text-xs uppercase tracking-[0.14em] text-stone-500">
                  <tr>
                    <th className="px-3 py-3">Date</th>
                    <th className="px-3 py-3">Company</th>
                    <th className="px-3 py-3">Phone</th>
                    <th className="px-3 py-3">Product</th>
                    <th className="px-3 py-3">Price</th>
                    <th className="px-3 py-3">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {leads.map((lead) => (
                    <tr key={String(lead.id)} className="border-t border-stone-200">
                      <td className="px-3 py-3">{String(lead.created_at || "")}</td>
                      <td className="px-3 py-3">{String(lead.company_name || "")}</td>
                      <td className="px-3 py-3">{String(lead.phone || "")}</td>
                      <td className="px-3 py-3">{String(lead.product_interest || "")}</td>
                      <td className="px-3 py-3">{String(lead.selected_price || "")}</td>
                      <td className="px-3 py-3">
                        <select
                          value={String(lead.status || "new")}
                          onChange={(event) => updateLead(lead.id || "", event.target.value)}
                          className="rounded border border-stone-300 px-2 py-1"
                        >
                          <option value="new">New</option>
                          <option value="contacted">Contacted</option>
                          <option value="closed">Closed</option>
                        </select>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        </main>
      </div>
    </AdminShell>
  );
}

function AdminShell({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-ivory px-4 py-8 text-charcoal sm:px-6 lg:px-10">
      <div className="mx-auto max-w-7xl">{children}</div>
    </div>
  );
}
