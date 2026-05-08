"use client";

import {
  BarChart3,
  BedDouble,
  BookOpen,
  Camera,
  ChevronDown,
  Edit3,
  Eye,
  FileText,
  Globe2,
  Home,
  ImageIcon,
  LayoutDashboard,
  ListChecks,
  LogOut,
  Mail,
  MapPin,
  Menu,
  Moon,
  Package,
  Plus,
  Save,
  Settings,
  Sparkles,
  Sun,
  Upload,
  Users,
  X
} from "lucide-react";
import {
  type ChangeEvent,
  type FormEvent,
  type ReactNode,
  useEffect,
  useMemo,
  useState
} from "react";

type ContentKey =
  | "settings"
  | "site.en"
  | "site.ge"
  | "products.en"
  | "products.ge"
  | "interactive-bed.en"
  | "interactive-bed.ge"
  | "gallery"
  | "contact"
  | "catalog"
  | "map"
  | "process.en"
  | "process.ge"
  | "quote-form"
  | "footer";

type Docs = Record<ContentKey, any>;
type Lead = Record<string, string | number | null>;
type NavItem = {
  id: string;
  label: string;
  icon: ReactNode;
};

const contentKeys: ContentKey[] = [
  "settings",
  "site.en",
  "site.ge",
  "products.en",
  "products.ge",
  "interactive-bed.en",
  "interactive-bed.ge",
  "gallery",
  "contact",
  "catalog",
  "map",
  "process.en",
  "process.ge",
  "quote-form",
  "footer"
];

const navItems: NavItem[] = [
  { id: "dashboard", label: "Dashboard", icon: <LayoutDashboard size={18} /> },
  { id: "hero", label: "Hero Section", icon: <Home size={18} /> },
  { id: "bed", label: "Interactive Bed", icon: <BedDouble size={18} /> },
  { id: "products", label: "Products", icon: <Package size={18} /> },
  { id: "pricing", label: "Pricing (GEL)", icon: <BarChart3 size={18} /> },
  { id: "gallery", label: "Gallery", icon: <ImageIcon size={18} /> },
  { id: "catalog", label: "Catalog PDF", icon: <FileText size={18} /> },
  { id: "map", label: "Map & Location", icon: <MapPin size={18} /> },
  { id: "quote", label: "Quote Form", icon: <ListChecks size={18} /> },
  { id: "contact", label: "Contact Methods", icon: <Mail size={18} /> },
  { id: "visibility", label: "Section Visibility", icon: <Eye size={18} /> },
  { id: "advanced", label: "Advanced JSON", icon: <Settings size={18} /> }
];

const sectionToggles = [
  ["hero", "Hero Section", "site.en", "hero"],
  ["interactiveBed", "Interactive Bed Explorer", "interactive-bed.en", ""],
  ["products", "Products", "products.en", ""],
  ["whyChooseUs", "Why Hotels Choose Us", "site.en", "whyChooseUs"],
  ["about", "About Company", "site.en", "about"],
  ["gallery", "Gallery", "gallery", ""],
  ["catalog", "Catalog", "catalog", ""],
  ["process", "Process", "process.en", ""],
  ["map", "Map & Location", "map", ""],
  ["quoteForm", "Quote Form", "quote-form", ""],
  ["contact", "Contact", "contact", ""],
  ["footer", "Footer", "footer", ""]
] as const;

const emptyDocs = Object.fromEntries(contentKeys.map((key) => [key, {}])) as Docs;

export default function AdminPage() {
  const [authenticated, setAuthenticated] = useState(false);
  const [checking, setChecking] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [docs, setDocs] = useState<Docs>(emptyDocs);
  const [leads, setLeads] = useState<Lead[]>([]);
  const [message, setMessage] = useState("");
  const [saving, setSaving] = useState(false);
  const [selectedHotspot, setSelectedHotspot] = useState(0);
  const [selectedJsonKey, setSelectedJsonKey] = useState<ContentKey>("site.en");
  const [jsonText, setJsonText] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [adminTheme, setAdminTheme] = useState<"light" | "dark">("light");

  useEffect(() => {
    fetch("/api/admin/me")
      .then((response) => response.json())
      .then((data) => setAuthenticated(Boolean(data.authenticated)))
      .finally(() => setChecking(false));

    const savedTheme = window.localStorage.getItem("admin-theme");
    if (savedTheme === "light" || savedTheme === "dark") {
      setAdminTheme(savedTheme);
    }
  }, []);

  useEffect(() => {
    if (!authenticated) return;
    void loadDashboard();
  }, [authenticated]);

  useEffect(() => {
    setJsonText(JSON.stringify(docs[selectedJsonKey] || {}, null, 2));
  }, [docs, selectedJsonKey]);

  const heroEn = docs["site.en"]?.hero || {};
  const heroGe = docs["site.ge"]?.hero || {};
  const productsEn = docs["products.en"]?.items || [];
  const productsGe = docs["products.ge"]?.items || [];
  const bedEn = docs["interactive-bed.en"] || {};
  const bedGe = docs["interactive-bed.ge"] || {};
  const hotspotsEn = bedEn.hotspots || [];
  const hotspotsGe = bedGe.hotspots || [];
  const activeHotspotEn = hotspotsEn[selectedHotspot] || hotspotsEn[0] || {};
  const activeHotspotGe = hotspotsGe[selectedHotspot] || hotspotsGe[0] || {};
  const visibleProducts = productsEn.filter((product: any) => product.isVisible);
  const visibleHotspots = hotspotsEn.filter((hotspot: any) => hotspot.isVisible);

  const analytics = useMemo(() => {
    const total = leads.length;
    const contacted = leads.filter((lead) => lead.status === "contacted").length;
    const closed = leads.filter((lead) => lead.status === "closed").length;
    const productCounts = leads.reduce<Record<string, number>>((acc, lead) => {
      const product = String(lead.product_interest || "Unspecified");
      acc[product] = (acc[product] || 0) + 1;
      return acc;
    }, {});
    const topProduct =
      Object.entries(productCounts).sort((a, b) => b[1] - a[1])[0]?.[0] ||
      "No leads yet";

    return { total, contacted, closed, topProduct };
  }, [leads]);

  async function loadDashboard() {
    const [contentResponse, leadsResponse] = await Promise.all([
      fetch("/api/admin/content"),
      fetch("/api/admin/leads")
    ]);

    if (contentResponse.ok) {
      const content = await contentResponse.json();
      setDocs({ ...emptyDocs, ...content });
    }

    if (leadsResponse.ok) {
      const data = await leadsResponse.json();
      setLeads(data.leads || []);
    }
  }

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

  function toggleAdminTheme() {
    setAdminTheme((current) => {
      const next = current === "dark" ? "light" : "dark";
      window.localStorage.setItem("admin-theme", next);
      return next;
    });
  }

  function patchDoc(key: ContentKey, updater: (current: any) => any) {
    setDocs((current) => ({ ...current, [key]: updater(clone(current[key])) }));
  }

  function updateNested(key: ContentKey, path: Array<string | number>, value: any) {
    patchDoc(key, (draft) => {
      setPath(draft, path, value);
      return draft;
    });
  }

  async function saveDocuments(keys: ContentKey[], success = "Content saved.") {
    setSaving(true);
    setMessage("");

    try {
      await Promise.all(
        Array.from(new Set(keys)).map((key) =>
          fetch(`/api/admin/content/${key}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(docs[key])
          })
        )
      );
      setMessage(success);
    } catch {
      setMessage("Could not save content. Please try again.");
    } finally {
      setSaving(false);
    }
  }

  async function saveAdvancedJson() {
    try {
      const parsed = JSON.parse(jsonText);
      setDocs((current) => ({ ...current, [selectedJsonKey]: parsed }));
      setSaving(true);
      const response = await fetch(`/api/admin/content/${selectedJsonKey}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(parsed)
      });
      setMessage(response.ok ? "Advanced JSON saved." : "Could not save JSON.");
    } catch {
      setMessage("Invalid JSON. Please fix it before saving.");
    } finally {
      setSaving(false);
    }
  }

  async function updateLead(id: string | number, status: string) {
    await fetch(`/api/admin/leads/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status })
    });
    await loadDashboard();
  }

  async function uploadFile(
    event: ChangeEvent<HTMLInputElement>,
    kind: "images" | "catalog",
    onUploaded: (path: string) => void
  ) {
    const file = event.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("kind", kind);
    formData.append("file", file);

    const response = await fetch("/api/admin/uploads", {
      method: "POST",
      body: formData
    });
    const data = await response.json().catch(() => null);

    if (response.ok && data?.publicPath) {
      onUploaded(data.publicPath);
      setMessage(`Uploaded: ${data.publicPath}`);
    } else {
      setMessage(data?.error || "Upload failed.");
    }

    event.target.value = "";
  }

  function addProduct() {
    const sortOrder = productsEn.length + 1;
    const base = {
      slug: `new-product-${sortOrder}`,
      title: "New Product",
      category: "Hotel Textile",
      shortDescription: "Describe this hotel textile product.",
      image: "/placeholders/textile-sets.svg",
      imageAlt: "Hotel textile product",
      buttonText: "Request Offer",
      buttonLink: "#quote-form",
      material: "",
      availableSizes: ["Custom"],
      colorOptions: ["White"],
      isVisible: true,
      sortOrder,
      showPrice: true,
      priceType: "from",
      price: "0",
      priceMin: "",
      priceMax: "",
      unit: "per piece",
      priceNote: ""
    };

    patchDoc("products.en", (draft) => ({ ...draft, items: [...(draft.items || []), base] }));
    patchDoc("products.ge", (draft) => ({
      ...draft,
      items: [...(draft.items || []), { ...base, title: "ახალი პროდუქტი" }]
    }));
  }

  function removeProduct(index: number) {
    patchDoc("products.en", (draft) => ({
      ...draft,
      items: (draft.items || []).filter((_: any, itemIndex: number) => itemIndex !== index)
    }));
    patchDoc("products.ge", (draft) => ({
      ...draft,
      items: (draft.items || []).filter((_: any, itemIndex: number) => itemIndex !== index)
    }));
  }

  if (checking) {
    return <AdminShell>Loading admin...</AdminShell>;
  }

  if (!authenticated) {
    return (
      <AdminShell>
        <form
          onSubmit={login}
          className="mx-auto mt-20 max-w-md rounded-2xl border border-stone-200 bg-white p-7 shadow-[0_24px_90px_rgba(17,16,15,0.12)]"
        >
          <div className="flex items-center gap-3">
            <LogoMark />
            <div>
              <h1 className="font-serif text-3xl font-semibold text-charcoal">
                LuxeTex Admin
              </h1>
              <p className="text-sm text-stone-500">Visual content dashboard</p>
            </div>
          </div>
          <Field label="Email" value={email} onChange={setEmail} type="email" />
          <Field
            label="Password"
            value={password}
            onChange={setPassword}
            type="password"
          />
          <button className="admin-primary mt-6 w-full" type="submit">
            Log in
          </button>
          {message ? <p className="mt-4 text-sm text-red-700">{message}</p> : null}
        </form>
      </AdminShell>
    );
  }

  return (
    <div
      className={`admin-dashboard min-h-screen bg-[#f7f1e8] text-[#19130e] ${
        adminTheme === "dark" ? "admin-dark" : ""
      }`}
    >
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-72 transform bg-[linear-gradient(180deg,#111918,#0b1111)] px-4 py-5 text-white shadow-2xl transition lg:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <LogoMark />
            <div>
              <p className="font-serif text-3xl font-semibold leading-none">LuxeTex</p>
              <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-stone-400">
                Hotel Textiles
              </p>
            </div>
          </div>
          <button className="lg:hidden" onClick={() => setSidebarOpen(false)} aria-label="Close menu">
            <X size={20} />
          </button>
        </div>

        <nav className="mt-8 space-y-1">
          {navItems.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              onClick={() => setSidebarOpen(false)}
              className="flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-semibold text-stone-200 transition hover:bg-white/10 hover:text-champagne"
            >
              <span className="text-champagne">{item.icon}</span>
              {item.label}
            </a>
          ))}
        </nav>

        <div className="absolute bottom-5 left-4 right-4 rounded-xl border border-champagne/25 bg-white/5 p-4">
          <p className="font-serif text-xl font-semibold">LuxeTex Hotel Textiles</p>
          <p className="mt-2 text-sm leading-6 text-stone-300">
            Manage showroom content, pricing, leads, and uploads.
          </p>
          <a href="/" className="admin-secondary mt-4 w-full border-champagne/30 text-champagne">
            View Site
            <Eye size={15} />
          </a>
        </div>
      </aside>

      <main className="lg:pl-72">
        <header className="sticky top-0 z-30 border-b border-stone-200/80 bg-[#fbf7ef]/90 backdrop-blur">
          <div className="flex min-h-20 items-center justify-between gap-4 px-4 sm:px-6 xl:px-8">
            <div className="flex items-center gap-4">
              <button
                type="button"
                className="rounded-lg border border-stone-200 bg-white p-2 lg:hidden"
                onClick={() => setSidebarOpen(true)}
                aria-label="Open menu"
              >
                <Menu size={20} />
              </button>
              <div>
                <h1 className="text-2xl font-bold">Dashboard</h1>
                <p className="text-sm text-stone-500">
                  Manage website content, products, leads, and settings.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span className="hidden rounded-lg border border-stone-200 bg-white px-3 py-2 text-sm font-semibold sm:inline-flex">
                🇬🇧 EN / 🇬🇪 GE
              </span>
              <button
                type="button"
                onClick={toggleAdminTheme}
                className="hidden items-center gap-2 rounded-lg border border-stone-200 bg-white px-3 py-2 text-sm font-semibold sm:inline-flex"
                aria-label={`Switch admin dashboard to ${
                  adminTheme === "dark" ? "light" : "dark"
                } mode`}
              >
                {adminTheme === "dark" ? (
                  <Moon size={15} className="text-champagne" />
                ) : (
                  <Sun size={15} className="text-brass" />
                )}
                {adminTheme === "dark" ? "Dark" : "Light"}
                <ChevronDown size={14} />
              </button>
              <div className="hidden items-center gap-3 rounded-lg bg-white px-3 py-2 shadow-sm md:flex">
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-champagne/30 font-bold text-brass">
                  A
                </span>
                <div>
                  <p className="text-sm font-bold">Admin User</p>
                  <p className="text-xs text-stone-500">Super Admin</p>
                </div>
              </div>
              <button type="button" onClick={logout} className="rounded-lg border border-stone-200 bg-white p-3">
                <LogOut size={18} />
              </button>
            </div>
          </div>
        </header>

        <div className="space-y-5 px-4 py-5 sm:px-6 xl:px-8">
          {message ? (
            <div className="rounded-lg border border-champagne/50 bg-champagne/15 px-4 py-3 text-sm font-semibold">
              {message}
            </div>
          ) : null}

          <section id="dashboard" className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            <MetricCard title="Leads" value={analytics.total} helper="Form submissions" icon={<Users size={19} />} />
            <MetricCard title="Products" value={productsEn.length} helper={`${visibleProducts.length} visible`} icon={<Package size={19} />} />
            <MetricCard title="Bed Hotspots" value={hotspotsEn.length} helper={`${visibleHotspots.length} visible`} icon={<BedDouble size={19} />} />
            <MetricCard title="Top Interest" value={analytics.topProduct} helper="From quote leads" icon={<BarChart3 size={19} />} />
          </section>

          <div className="grid gap-5 xl:grid-cols-[1fr_1.35fr_1fr]">
            <DashboardCard
              id="hero"
              title="1. Hero Section Editor"
              action={<Toggle checked={Boolean(heroEn.isVisible)} onChange={(value) => {
                updateNested("site.en", ["hero", "isVisible"], value);
                updateNested("site.ge", ["hero", "isVisible"], value);
              }} />}
            >
              <div className="grid gap-4 lg:grid-cols-[1fr_13rem]">
                <div className="space-y-3">
                  <PairedField label="Title" en={heroEn.title} ge={heroGe.title} onEn={(value) => updateNested("site.en", ["hero", "title"], value)} onGe={(value) => updateNested("site.ge", ["hero", "title"], value)} />
                  <PairedArea label="Subtitle" en={heroEn.subtitle} ge={heroGe.subtitle} onEn={(value) => updateNested("site.en", ["hero", "subtitle"], value)} onGe={(value) => updateNested("site.ge", ["hero", "subtitle"], value)} />
                  <PairedField label="Primary CTA" en={heroEn.primaryButtonText} ge={heroGe.primaryButtonText} onEn={(value) => updateNested("site.en", ["hero", "primaryButtonText"], value)} onGe={(value) => updateNested("site.ge", ["hero", "primaryButtonText"], value)} />
                  <PairedField label="Secondary CTA" en={heroEn.secondaryButtonText} ge={heroGe.secondaryButtonText} onEn={(value) => updateNested("site.en", ["hero", "secondaryButtonText"], value)} onGe={(value) => updateNested("site.ge", ["hero", "secondaryButtonText"], value)} />
                </div>
                <ImageUploadPanel
                  image={heroEn.image}
                  label="Hero Background Image"
                  onUploaded={(path) => {
                    updateNested("site.en", ["hero", "image"], path);
                    updateNested("site.ge", ["hero", "image"], path);
                  }}
                  uploadFile={uploadFile}
                />
              </div>
              <SaveRow onSave={() => saveDocuments(["site.en", "site.ge"], "Hero section saved.")} saving={saving} />
            </DashboardCard>

            <DashboardCard
              id="bed"
              title="2. Interactive Bed Explorer Editor"
              action={<Toggle checked={Boolean(bedEn.isVisible)} onChange={(value) => {
                updateNested("interactive-bed.en", ["isVisible"], value);
                updateNested("interactive-bed.ge", ["isVisible"], value);
              }} />}
            >
              <div className="grid gap-4 xl:grid-cols-[18rem_1fr_16rem]">
                <div>
                  <p className="admin-label">Bed Preview</p>
                  <div className="relative mt-2 overflow-hidden rounded-lg border border-stone-200">
                    <img src={bedEn.bedImage || "/placeholders/interactive-bed.svg"} alt="" className="aspect-[4/5] w-full object-cover" />
                    {hotspotsEn.map((hotspot: any, index: number) => (
                      <button
                        key={hotspot.id || index}
                        type="button"
                        className={`absolute flex h-7 w-7 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-white bg-brass text-xs font-bold text-white shadow ${selectedHotspot === index ? "ring-4 ring-champagne/50" : ""}`}
                        style={{ left: `${hotspot.x || 50}%`, top: `${hotspot.y || 50}%` }}
                        onClick={() => setSelectedHotspot(index)}
                      >
                        {index + 1}
                      </button>
                    ))}
                  </div>
                  <ImageUploadPanel
                    compact
                    image={bedEn.bedImage}
                    label="Bed Image"
                    onUploaded={(path) => {
                      updateNested("interactive-bed.en", ["bedImage"], path);
                      updateNested("interactive-bed.ge", ["bedImage"], path);
                    }}
                    uploadFile={uploadFile}
                  />
                </div>

                <div className="overflow-x-auto">
                  <table className="admin-table min-w-[42rem]">
                    <thead>
                      <tr>
                        <th>#</th>
                        <th>Hotspot</th>
                        <th>Category</th>
                        <th>X %</th>
                        <th>Y %</th>
                        <th>Show</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {hotspotsEn.map((hotspot: any, index: number) => (
                        <tr key={hotspot.id || index}>
                          <td>{index + 1}</td>
                          <td>{hotspot.title}</td>
                          <td>{hotspot.category}</td>
                          <td>{hotspot.x}</td>
                          <td>{hotspot.y}</td>
                          <td><Toggle checked={Boolean(hotspot.isVisible)} onChange={(value) => {
                            updateNested("interactive-bed.en", ["hotspots", index, "isVisible"], value);
                            updateNested("interactive-bed.ge", ["hotspots", index, "isVisible"], value);
                          }} /></td>
                          <td>
                            <button className="admin-icon-button" onClick={() => setSelectedHotspot(index)}>
                              <Edit3 size={14} />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div className="rounded-lg border border-stone-200 bg-[#fbf7ef] p-3">
                  <p className="admin-label">Edit Hotspot #{selectedHotspot + 1}</p>
                  <PairedField label="Title" en={activeHotspotEn.title} ge={activeHotspotGe.title} onEn={(value) => updateNested("interactive-bed.en", ["hotspots", selectedHotspot, "title"], value)} onGe={(value) => updateNested("interactive-bed.ge", ["hotspots", selectedHotspot, "title"], value)} />
                  <Field label="Category" value={activeHotspotEn.category || ""} onChange={(value) => {
                    updateNested("interactive-bed.en", ["hotspots", selectedHotspot, "category"], value);
                    updateNested("interactive-bed.ge", ["hotspots", selectedHotspot, "category"], value);
                  }} />
                  <div className="grid grid-cols-2 gap-2">
                    <Field label="X %" type="number" value={activeHotspotEn.x ?? ""} onChange={(value) => {
                      updateNested("interactive-bed.en", ["hotspots", selectedHotspot, "x"], Number(value));
                      updateNested("interactive-bed.ge", ["hotspots", selectedHotspot, "x"], Number(value));
                    }} />
                    <Field label="Y %" type="number" value={activeHotspotEn.y ?? ""} onChange={(value) => {
                      updateNested("interactive-bed.en", ["hotspots", selectedHotspot, "y"], Number(value));
                      updateNested("interactive-bed.ge", ["hotspots", selectedHotspot, "y"], Number(value));
                    }} />
                  </div>
                  <PriceEditor item={activeHotspotEn} onChange={(field, value) => {
                    updateNested("interactive-bed.en", ["hotspots", selectedHotspot, field], value);
                    updateNested("interactive-bed.ge", ["hotspots", selectedHotspot, field], value);
                  }} />
                  <div className="mt-3 grid gap-2 sm:grid-cols-2">
                    {(activeHotspotEn.materialVariants || []).slice(0, 2).map((variant: any, index: number) => (
                      <div key={variant.id || index} className="rounded-lg border border-champagne/40 bg-white p-3 text-xs">
                        <div className="flex items-center justify-between">
                          <strong>{variant.label}</strong>
                          <Toggle checked={Boolean(variant.isVisible)} onChange={(value) => updateNested("interactive-bed.en", ["hotspots", selectedHotspot, "materialVariants", index, "isVisible"], value)} />
                        </div>
                        <p className="mt-2 text-brass">From {variant.price || "-"} GEL / {variant.unit || "unit"}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <SaveRow onSave={() => saveDocuments(["interactive-bed.en", "interactive-bed.ge"], "Interactive bed saved.")} saving={saving} />
            </DashboardCard>

            <DashboardCard
              id="products"
              title="3. Product Management"
              action={<button className="admin-primary" onClick={addProduct}><Plus size={15} /> Add Product</button>}
            >
              <div className="overflow-x-auto">
                <table className="admin-table min-w-[48rem]">
                  <thead>
                    <tr>
                      <th>Image</th>
                      <th>Product Title</th>
                      <th>Category</th>
                      <th>Price GEL</th>
                      <th>Type</th>
                      <th>Unit</th>
                      <th>Visible</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {productsEn.map((product: any, index: number) => (
                      <tr key={product.slug || index}>
                        <td><img src={product.image || "/placeholders/textile-sets.svg"} alt="" className="h-12 w-14 rounded object-cover" /></td>
                        <td>
                          <InlineInput value={product.title} onChange={(value) => updateNested("products.en", ["items", index, "title"], value)} />
                          <InlineInput value={productsGe[index]?.title || ""} onChange={(value) => updateNested("products.ge", ["items", index, "title"], value)} placeholder="Georgian title" />
                        </td>
                        <td><InlineInput value={product.category} onChange={(value) => {
                          updateNested("products.en", ["items", index, "category"], value);
                          updateNested("products.ge", ["items", index, "category"], value);
                        }} /></td>
                        <td><InlineInput value={product.price || ""} onChange={(value) => {
                          updateNested("products.en", ["items", index, "price"], value);
                          updateNested("products.ge", ["items", index, "price"], value);
                        }} /></td>
                        <td>
                          <select className="admin-mini-input" value={product.priceType || "from"} onChange={(event) => {
                            updateNested("products.en", ["items", index, "priceType"], event.target.value);
                            updateNested("products.ge", ["items", index, "priceType"], event.target.value);
                          }}>
                            <option value="fixed">Fixed</option>
                            <option value="from">From</option>
                            <option value="range">Range</option>
                            <option value="custom">Custom</option>
                          </select>
                        </td>
                        <td><InlineInput value={product.unit || ""} onChange={(value) => {
                          updateNested("products.en", ["items", index, "unit"], value);
                          updateNested("products.ge", ["items", index, "unit"], value);
                        }} /></td>
                        <td><Toggle checked={Boolean(product.isVisible)} onChange={(value) => {
                          updateNested("products.en", ["items", index, "isVisible"], value);
                          updateNested("products.ge", ["items", index, "isVisible"], value);
                        }} /></td>
                        <td>
                          <button className="admin-icon-button text-red-600" onClick={() => removeProduct(index)}>
                            <X size={14} />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <SaveRow onSave={() => saveDocuments(["products.en", "products.ge"], "Products saved.")} saving={saving} />
            </DashboardCard>
          </div>

          <div className="grid gap-5 xl:grid-cols-[0.75fr_1fr_0.8fr]">
            <DashboardCard id="pricing" title="4. Product Pricing (GEL)">
              <div className="space-y-3">
                {(productsEn.slice(0, 5) || []).map((product: any, index: number) => (
                  <div key={product.slug || index} className="grid grid-cols-[1fr_6rem_6rem] items-center gap-3 rounded-lg border border-stone-200 p-3">
                    <span className="font-semibold">{product.title}</span>
                    <InlineInput value={product.price || ""} onChange={(value) => {
                      updateNested("products.en", ["items", index, "price"], value);
                      updateNested("products.ge", ["items", index, "price"], value);
                    }} />
                    <span className="text-xs text-stone-500">{product.unit}</span>
                  </div>
                ))}
              </div>
              <SaveRow onSave={() => saveDocuments(["products.en", "products.ge"], "Pricing saved.")} saving={saving} />
            </DashboardCard>

            <DashboardCard id="quote" title="5. Quote Form Settings">
              <PairedField label="Title" en={docs["quote-form"]?.title?.en} ge={docs["quote-form"]?.title?.ge} onEn={(value) => updateNested("quote-form", ["title", "en"], value)} onGe={(value) => updateNested("quote-form", ["title", "ge"], value)} />
              <PairedArea label="Description" en={docs["quote-form"]?.description?.en} ge={docs["quote-form"]?.description?.ge} onEn={(value) => updateNested("quote-form", ["description", "en"], value)} onGe={(value) => updateNested("quote-form", ["description", "ge"], value)} />
              <div className="mt-4 grid gap-3 md:grid-cols-2">
                {Object.entries(docs["quote-form"]?.fields || {}).map(([key, field]: [string, any]) => (
                  <div key={key} className="rounded-lg border border-stone-200 p-3">
                    <p className="admin-label">{key}</p>
                    <InlineInput value={field.label?.en || ""} onChange={(value) => updateNested("quote-form", ["fields", key, "label", "en"], value)} />
                    <InlineInput value={field.label?.ge || ""} onChange={(value) => updateNested("quote-form", ["fields", key, "label", "ge"], value)} />
                  </div>
                ))}
              </div>
              <SaveRow onSave={() => saveDocuments(["quote-form"], "Quote form saved.")} saving={saving} />
            </DashboardCard>

            <DashboardCard id="contact" title="6. Contact Methods">
              <div className="space-y-3">
                {(docs.contact?.methods || []).map((method: any, index: number) => (
                  <div key={method.key || index} className="grid grid-cols-[1fr_1.2fr_auto] items-center gap-3">
                    <span className="font-semibold capitalize">{method.key}</span>
                    <InlineInput value={method.value || ""} onChange={(value) => updateNested("contact", ["methods", index, "value"], value)} />
                    <Toggle checked={Boolean(method.isVisible)} onChange={(value) => updateNested("contact", ["methods", index, "isVisible"], value)} />
                  </div>
                ))}
              </div>
              <SaveRow onSave={() => saveDocuments(["contact"], "Contact methods saved.")} saving={saving} />
            </DashboardCard>
          </div>

          <div className="grid gap-5 xl:grid-cols-[0.7fr_1fr]">
            <DashboardCard id="catalog" title="7. Catalog PDF">
              <p className="admin-label">Current Catalog</p>
              <div className="mt-2 rounded-lg border border-stone-200 bg-[#fbf7ef] p-4">
                <p className="font-semibold">{docs.catalog?.pdfFile || "No PDF uploaded"}</p>
                <p className="text-xs text-stone-500">Upload a replacement PDF and save.</p>
              </div>
              <label className="admin-secondary mt-3 cursor-pointer">
                <Upload size={15} /> Replace PDF
                <input type="file" accept="application/pdf" className="hidden" onChange={(event) => uploadFile(event, "catalog", (path) => updateNested("catalog", ["pdfFile"], path))} />
              </label>
              <PairedField label="Catalog Title" en={docs.catalog?.title?.en} ge={docs.catalog?.title?.ge} onEn={(value) => updateNested("catalog", ["title", "en"], value)} onGe={(value) => updateNested("catalog", ["title", "ge"], value)} />
              <SaveRow onSave={() => saveDocuments(["catalog"], "Catalog saved.")} saving={saving} />
            </DashboardCard>

            <DashboardCard id="gallery" title="8. Gallery Manager" action={<label className="admin-primary cursor-pointer"><Upload size={15} /> Upload Images<input type="file" accept="image/*" className="hidden" onChange={(event) => uploadFile(event, "images", (path) => patchDoc("gallery", (draft) => ({ ...draft, images: [...(draft.images || []), { image: path, alt: "Uploaded gallery image", caption: { en: "New gallery image", ge: "ახალი სურათი" }, isVisible: true, sortOrder: (draft.images || []).length + 1 }] })))} /></label>}>
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {(docs.gallery?.images || []).map((image: any, index: number) => (
                  <div key={`${image.image}-${index}`} className="rounded-lg border border-stone-200 p-2">
                    <img src={image.image || "/placeholders/gallery-room.svg"} alt="" className="aspect-[4/3] w-full rounded object-cover" />
                    <InlineInput value={image.caption?.en || ""} onChange={(value) => updateNested("gallery", ["images", index, "caption", "en"], value)} />
                    <InlineInput value={image.caption?.ge || ""} onChange={(value) => updateNested("gallery", ["images", index, "caption", "ge"], value)} />
                    <Toggle checked={Boolean(image.isVisible)} onChange={(value) => updateNested("gallery", ["images", index, "isVisible"], value)} />
                  </div>
                ))}
              </div>
              <SaveRow onSave={() => saveDocuments(["gallery"], "Gallery saved.")} saving={saving} />
            </DashboardCard>
          </div>

          <div className="grid gap-5 xl:grid-cols-[1fr_1fr_1.2fr]">
            <DashboardCard id="map" title="9. Map & Location">
              <PairedField label="Address" en={docs.map?.address?.en} ge={docs.map?.address?.ge} onEn={(value) => updateNested("map", ["address", "en"], value)} onGe={(value) => updateNested("map", ["address", "ge"], value)} />
              <Field label="Google Maps Embed URL" value={docs.map?.embedUrl || ""} onChange={(value) => updateNested("map", ["embedUrl"], value)} />
              <Field label="External Map Link" value={docs.map?.externalLink || ""} onChange={(value) => updateNested("map", ["externalLink"], value)} />
              <SaveRow onSave={() => saveDocuments(["map"], "Map saved.")} saving={saving} />
            </DashboardCard>

            <DashboardCard id="visibility" title="10. Section Visibility">
              <div className="grid gap-3 sm:grid-cols-2">
                {sectionToggles.map(([, label, key, nested]) => {
                  const checked = nested
                    ? Boolean(docs[key]?.[nested]?.isVisible)
                    : Boolean(docs[key]?.isVisible);
                  return (
                    <div key={`${key}-${nested || "root"}`} className="flex items-center justify-between rounded-lg border border-stone-200 px-3 py-2">
                      <span className="text-sm font-semibold">{label}</span>
                      <Toggle checked={checked} onChange={(value) => {
                        if (nested) {
                          updateNested(key, [nested, "isVisible"], value);
                          if (key === "site.en") updateNested("site.ge", [nested, "isVisible"], value);
                        } else {
                          updateNested(key, ["isVisible"], value);
                          if (key === "products.en") updateNested("products.ge", ["isVisible"], value);
                          if (key === "interactive-bed.en") updateNested("interactive-bed.ge", ["isVisible"], value);
                          if (key === "process.en") updateNested("process.ge", ["isVisible"], value);
                        }
                      }} />
                    </div>
                  );
                })}
              </div>
              <SaveRow onSave={() => saveDocuments(contentKeys, "Section visibility saved.")} saving={saving} />
            </DashboardCard>

            <DashboardCard id="analytics" title="11. Analytics Overview">
              <div className="grid gap-3 sm:grid-cols-3">
                <SmallStat label="New Leads" value={analytics.total} />
                <SmallStat label="Contacted" value={analytics.contacted} />
                <SmallStat label="Closed" value={analytics.closed} />
              </div>
              <div className="mt-4 overflow-x-auto">
                <table className="admin-table min-w-[38rem]">
                  <thead>
                    <tr>
                      <th>Date</th>
                      <th>Company</th>
                      <th>Phone</th>
                      <th>Product</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {leads.slice(0, 6).map((lead) => (
                      <tr key={String(lead.id)}>
                        <td>{String(lead.created_at || "").slice(0, 10)}</td>
                        <td>{String(lead.company_name || "")}</td>
                        <td>{String(lead.phone || "")}</td>
                        <td>{String(lead.product_interest || "")}</td>
                        <td>
                          <select value={String(lead.status || "new")} onChange={(event) => updateLead(lead.id || "", event.target.value)} className="admin-mini-input">
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
            </DashboardCard>
          </div>

          <DashboardCard id="advanced" title="12. Advanced JSON">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <select className="admin-input sm:max-w-xs" value={selectedJsonKey} onChange={(event) => setSelectedJsonKey(event.target.value as ContentKey)}>
                {contentKeys.map((key) => <option key={key} value={key}>{key}</option>)}
              </select>
              <button className="admin-secondary" onClick={() => setJsonText(JSON.stringify(docs[selectedJsonKey] || {}, null, 2))}>
                Reload JSON
              </button>
              <button className="admin-primary" onClick={saveAdvancedJson}>
                <Save size={15} /> Save JSON
              </button>
            </div>
            <textarea
              value={jsonText}
              onChange={(event) => setJsonText(event.target.value)}
              className="mt-4 min-h-[28rem] w-full rounded-lg border border-stone-300 bg-stone-950 p-4 font-mono text-sm text-stone-100"
              spellCheck={false}
            />
          </DashboardCard>

          <footer className="py-4 text-center text-xs text-stone-500">
            © 2026 LuxeTex Hotel Textiles. Admin dashboard.
          </footer>
        </div>
      </main>
    </div>
  );
}

function AdminShell({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-[#f7f1e8] px-4 py-8 text-charcoal sm:px-6 lg:px-10">
      <div className="mx-auto max-w-7xl">{children}</div>
    </div>
  );
}

function DashboardCard({
  id,
  title,
  action,
  children
}: {
  id: string;
  title: string;
  action?: ReactNode;
  children: ReactNode;
}) {
  return (
    <section id={id} className="rounded-xl border border-stone-200 bg-white p-5 shadow-[0_18px_55px_rgba(28,26,23,0.06)]">
      <div className="mb-4 flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
        <h2 className="text-lg font-bold">{title}</h2>
        {action}
      </div>
      {children}
    </section>
  );
}

function MetricCard({ title, value, helper, icon }: { title: string; value: ReactNode; helper: string; icon: ReactNode }) {
  return (
    <div className="rounded-xl border border-stone-200 bg-white p-5 shadow-sm">
      <div className="flex items-center justify-between">
        <span className="flex h-10 w-10 items-center justify-center rounded-full bg-champagne/25 text-brass">{icon}</span>
        <span className="text-xs font-bold uppercase tracking-[0.14em] text-green-700">Live</span>
      </div>
      <p className="mt-5 text-sm font-semibold text-stone-500">{title}</p>
      <p className="mt-1 truncate text-3xl font-bold">{value}</p>
      <p className="mt-1 text-xs text-stone-500">{helper}</p>
    </div>
  );
}

function SmallStat({ label, value }: { label: string; value: ReactNode }) {
  return (
    <div className="rounded-lg border border-stone-200 bg-[#fbf7ef] p-4">
      <p className="text-xs font-semibold text-stone-500">{label}</p>
      <p className="mt-1 text-3xl font-bold">{value}</p>
    </div>
  );
}

function LogoMark() {
  return (
    <span className="flex h-11 w-11 items-center justify-center rounded-full border border-champagne/40 bg-champagne/10 text-champagne">
      <Sparkles size={23} strokeWidth={1.6} />
    </span>
  );
}

function Toggle({ checked, onChange }: { checked: boolean; onChange: (value: boolean) => void }) {
  return (
    <button
      type="button"
      aria-pressed={checked}
      onClick={() => onChange(!checked)}
      className={`relative h-6 w-11 rounded-full transition ${checked ? "bg-brass" : "bg-stone-300"}`}
    >
      <span className={`absolute top-1 h-4 w-4 rounded-full bg-white transition ${checked ? "left-6" : "left-1"}`} />
    </button>
  );
}

function Field({ label, value, onChange, type = "text" }: { label: string; value: string | number; onChange: (value: string) => void; type?: string }) {
  return (
    <label className="mt-3 block">
      <span className="admin-label">{label}</span>
      <input className="admin-input" type={type} value={value ?? ""} onChange={(event) => onChange(event.target.value)} />
    </label>
  );
}

function PairedField({ label, en, ge, onEn, onGe }: { label: string; en: string; ge: string; onEn: (value: string) => void; onGe: (value: string) => void }) {
  return (
    <div>
      <span className="admin-label">{label}</span>
      <div className="mt-2 grid gap-2 sm:grid-cols-2">
        <input className="admin-input" value={en || ""} onChange={(event) => onEn(event.target.value)} placeholder="English" />
        <input className="admin-input" value={ge || ""} onChange={(event) => onGe(event.target.value)} placeholder="Georgian" />
      </div>
    </div>
  );
}

function PairedArea({ label, en, ge, onEn, onGe }: { label: string; en: string; ge: string; onEn: (value: string) => void; onGe: (value: string) => void }) {
  return (
    <div>
      <span className="admin-label">{label}</span>
      <div className="mt-2 grid gap-2 sm:grid-cols-2">
        <textarea className="admin-input min-h-24 py-3" value={en || ""} onChange={(event) => onEn(event.target.value)} placeholder="English" />
        <textarea className="admin-input min-h-24 py-3" value={ge || ""} onChange={(event) => onGe(event.target.value)} placeholder="Georgian" />
      </div>
    </div>
  );
}

function InlineInput({ value, onChange, placeholder = "" }: { value: string | number; onChange: (value: string) => void; placeholder?: string }) {
  return (
    <input className="admin-mini-input mt-1" value={value ?? ""} placeholder={placeholder} onChange={(event) => onChange(event.target.value)} />
  );
}

function PriceEditor({ item, onChange }: { item: any; onChange: (field: string, value: any) => void }) {
  return (
    <div className="mt-3 rounded-lg border border-stone-200 bg-white p-3">
      <div className="mb-2 flex items-center justify-between">
        <span className="admin-label">Pricing</span>
        <Toggle checked={Boolean(item.showPrice)} onChange={(value) => onChange("showPrice", value)} />
      </div>
      <div className="grid grid-cols-2 gap-2">
        <select className="admin-mini-input" value={item.priceType || "from"} onChange={(event) => onChange("priceType", event.target.value)}>
          <option value="fixed">Fixed</option>
          <option value="from">From</option>
          <option value="range">Range</option>
          <option value="custom">Custom</option>
        </select>
        <InlineInput value={item.price || ""} onChange={(value) => onChange("price", value)} placeholder="Price" />
        <InlineInput value={item.priceMin || ""} onChange={(value) => onChange("priceMin", value)} placeholder="Min" />
        <InlineInput value={item.priceMax || ""} onChange={(value) => onChange("priceMax", value)} placeholder="Max" />
        <InlineInput value={item.unit || ""} onChange={(value) => onChange("unit", value)} placeholder="Unit" />
        <InlineInput value={item.priceNote || ""} onChange={(value) => onChange("priceNote", value)} placeholder="Note" />
      </div>
    </div>
  );
}

function ImageUploadPanel({ image, label, compact = false, onUploaded, uploadFile }: { image: string; label: string; compact?: boolean; onUploaded: (path: string) => void; uploadFile: (event: ChangeEvent<HTMLInputElement>, kind: "images" | "catalog", onUploaded: (path: string) => void) => Promise<void> }) {
  return (
    <div className={compact ? "mt-3" : ""}>
      <p className="admin-label">{label}</p>
      {!compact ? <img src={image || "/placeholders/hero.svg"} alt="" className="mt-2 aspect-[4/5] w-full rounded-lg border border-stone-200 object-cover" /> : null}
      <label className="admin-secondary mt-2 w-full cursor-pointer">
        <Upload size={15} /> Change Image
        <input type="file" accept="image/*" className="hidden" onChange={(event) => uploadFile(event, "images", onUploaded)} />
      </label>
      {image ? <p className="mt-2 break-all text-xs text-stone-500">{image}</p> : null}
    </div>
  );
}

function SaveRow({ onSave, saving }: { onSave: () => void; saving: boolean }) {
  return (
    <div className="mt-5 flex justify-end">
      <button type="button" className="admin-primary" onClick={onSave} disabled={saving}>
        <Save size={15} /> {saving ? "Saving..." : "Save Changes"}
      </button>
    </div>
  );
}

function clone<T>(value: T): T {
  return JSON.parse(JSON.stringify(value || {}));
}

function setPath(target: any, path: Array<string | number>, value: any) {
  let current = target;
  path.forEach((part, index) => {
    if (index === path.length - 1) {
      current[part] = value;
      return;
    }

    if (current[part] === undefined || current[part] === null) {
      current[part] = typeof path[index + 1] === "number" ? [] : {};
    }

    current = current[part];
  });
}
