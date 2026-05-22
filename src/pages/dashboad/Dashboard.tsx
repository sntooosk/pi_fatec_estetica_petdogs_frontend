import { useEffect, useState } from "react"
import type { ChangeEvent, FormEvent, ReactNode } from "react"
import api from "../../services/api"

type Role = "admin" | "profissional" | "cliente"

type TabKey = "agenda" | "servicos" | "profissionais" | "clientes" | "pets" | "perfil"

interface UserSession {
  id: string
  name: string
  email: string
  role: Role
}

interface Customer {
  _id: string
  name: string
  email: string
  telefone?: string
  foto?: string
}

interface Pet {
  _id: string
  nome: string
  raca: string
  idade: number
  porte: string
  foto?: string
  cliente?: Customer
}

interface Service {
  _id: string
  name: string
  descricao?: string
  duracao_min: number
  preco: number
}

interface Professional {
  _id: string
  name: string
  email: string
  telefone?: string
  foto?: string
  especialidade: string
  disponibilidade_inicio: string
  disponibilidade_fim: string
}

interface Schedule {
  _id: string
  data_hora: string
  status: "scheduled" | "canceled"
  cliente?: Customer
  animal?: Pet
  servico?: Service
  profissional?: Professional
}

const inputClass = "rounded-2xl border border-slate-200 bg-white px-4 py-3 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-orange-500 focus:ring-4 focus:ring-orange-100 disabled:cursor-not-allowed disabled:bg-slate-100"
const buttonClass = "inline-flex items-center justify-center rounded-2xl bg-orange-600 px-5 py-3 font-bold text-white shadow-sm transition hover:-translate-y-0.5 hover:bg-orange-700 focus:outline-none focus:ring-4 focus:ring-orange-200 disabled:translate-y-0 disabled:cursor-not-allowed disabled:opacity-60"
const secondaryButtonClass = "inline-flex items-center justify-center rounded-2xl border border-slate-200 bg-white px-4 py-2.5 font-bold text-slate-700 transition hover:bg-slate-50 focus:outline-none focus:ring-4 focus:ring-slate-200 disabled:cursor-not-allowed disabled:opacity-60"
const dangerButtonClass = "inline-flex items-center justify-center rounded-2xl border border-red-200 bg-red-50 px-4 py-2.5 font-bold text-red-700 transition hover:bg-red-100 focus:outline-none focus:ring-4 focus:ring-red-100 disabled:cursor-not-allowed disabled:opacity-60"

type IconName = "calendar" | "services" | "users" | "clients" | "pets" | "settings" | "dashboard" | "list" | "user" | "clock" | "cut"

function Icon({ name, className = "h-5 w-5" }: { name: IconName; className?: string }) {
  const paths: Record<IconName, ReactNode> = {
    calendar: <><path d="M8 2v4M16 2v4M3 10h18" /><path d="M5 4h14a2 2 0 0 1 2 2v13a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2Z" /></>,
    services: <><path d="M7 3h10l1 6H6l1-6Z" /><path d="M6 9h12l-1 12H7L6 9Z" /><path d="M9 13h6" /></>,
    users: <><path d="M16 21v-2a4 4 0 0 0-4-4H7a4 4 0 0 0-4 4v2" /><circle cx="9.5" cy="7" r="4" /><path d="M22 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></>,
    clients: <><path d="M20 21a8 8 0 1 0-16 0" /><circle cx="12" cy="7" r="4" /></>,
    pets: <><circle cx="5.5" cy="10.5" r="2.5" /><circle cx="18.5" cy="10.5" r="2.5" /><circle cx="9" cy="5" r="2.5" /><circle cx="15" cy="5" r="2.5" /><path d="M7.5 18.5c0-3 2-5.5 4.5-5.5s4.5 2.5 4.5 5.5c0 1.8-1.2 2.5-2.5 2l-2-.7-2 .7c-1.3.5-2.5-.2-2.5-2Z" /></>,
    settings: <><path d="M12 15.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Z" /><path d="M19.4 15a1.7 1.7 0 0 0 .34 1.88l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06A1.7 1.7 0 0 0 15 19.4a1.7 1.7 0 0 0-1 .6 1.7 1.7 0 0 0-.4 1.1V21a2 2 0 1 1-4 0v-.09A1.7 1.7 0 0 0 8.6 19.4a1.7 1.7 0 0 0-1.88.34l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06A1.7 1.7 0 0 0 4.6 15a1.7 1.7 0 0 0-.6-1 1.7 1.7 0 0 0-1.1-.4H3a2 2 0 1 1 0-4h.09A1.7 1.7 0 0 0 4.6 8.6a1.7 1.7 0 0 0-.34-1.88l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06A1.7 1.7 0 0 0 9 4.6a1.7 1.7 0 0 0 1-.6 1.7 1.7 0 0 0 .4-1.1V3a2 2 0 1 1 4 0v.09A1.7 1.7 0 0 0 15.4 4.6a1.7 1.7 0 0 0 1.88-.34l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06A1.7 1.7 0 0 0 19.4 9c.36.2.72.6 1 .6h.6a2 2 0 1 1 0 4h-.09a1.7 1.7 0 0 0-1.51 1.4Z" /></>,
    dashboard: <><rect x="3" y="3" width="7" height="7" rx="2" /><rect x="14" y="3" width="7" height="7" rx="2" /><rect x="3" y="14" width="7" height="7" rx="2" /><rect x="14" y="14" width="7" height="7" rx="2" /></>,
    list: <><path d="M8 6h13M8 12h13M8 18h13" /><path d="M3 6h.01M3 12h.01M3 18h.01" /></>,
    user: <><circle cx="12" cy="8" r="4" /><path d="M4 21a8 8 0 0 1 16 0" /></>,
    clock: <><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></>,
    cut: <><circle cx="6" cy="7" r="3" /><circle cx="6" cy="17" r="3" /><path d="M8.5 8.5 21 21" /><path d="M8.5 15.5 21 3" /></>,
  }

  return (
    <svg className={className} fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
      {paths[name]}
    </svg>
  )
}

function Field({ label, hint, children }: { label: string; hint?: string; children: ReactNode }) {
  return (
    <label className="grid gap-2 text-sm font-bold text-slate-700">
      <span>{label}</span>
      {children}
      {hint && <span className="text-xs font-medium text-slate-500">{hint}</span>}
    </label>
  )
}

function Card({ icon, title, description, children }: { icon?: IconName; title: string; description?: string; children: ReactNode }) {
  return (
    <section className="rounded-[2rem] border border-slate-100 bg-white p-6 shadow-sm shadow-slate-200/70">
      <div className="mb-5 flex items-start gap-3">
        {icon && <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-orange-100 text-orange-700"><Icon name={icon} className="h-6 w-6" /></span>}
        <div>
          <h2 className="text-2xl font-black">{title}</h2>
          {description && <p className="mt-1 text-sm text-slate-600">{description}</p>}
        </div>
      </div>
      {children}
    </section>
  )
}

function PhotoPreview({ src, alt }: { src?: string; alt: string }) {
  if (!src) return null

  return <img className="h-20 w-20 rounded-2xl border border-slate-200 object-cover shadow-sm" src={src} alt={alt} />
}

async function compressImage(file: File): Promise<string> {
  const image = new Image()
  const source = URL.createObjectURL(file)

  try {
    await new Promise<void>((resolve, reject) => {
      image.onload = () => resolve()
      image.onerror = () => reject(new Error("Imagem inválida"))
      image.src = source
    })

    const maxSize = 900
    const scale = Math.min(1, maxSize / Math.max(image.width, image.height))
    const canvas = document.createElement("canvas")
    canvas.width = Math.round(image.width * scale)
    canvas.height = Math.round(image.height * scale)

    const context = canvas.getContext("2d")
    if (!context) throw new Error("Não foi possível processar a imagem")

    context.drawImage(image, 0, 0, canvas.width, canvas.height)
    return canvas.toDataURL("image/jpeg", 0.72)
  } finally {
    URL.revokeObjectURL(source)
  }
}

async function readImage(event: ChangeEvent<HTMLInputElement>, callback: (value: string) => void, onError: (value: string) => void) {
  const file = event.target.files?.[0]
  if (!file) return

  if (!file.type.startsWith("image/")) {
    onError("Selecione um arquivo de imagem válido")
    return
  }

  try {
    callback(await compressImage(file))
  } catch {
    onError("Não foi possível carregar a imagem")
  }
}

function formatCurrency(value: number) {
  return Number(value).toLocaleString("pt-BR", { style: "currency", currency: "BRL" })
}

function toDateTimeLocal(value?: string) {
  return value ? value.slice(0, 16) : ""
}

function emptyServiceForm() {
  return { name: "", descricao: "", duracao_min: "", preco: "" }
}

function emptyProfessionalForm() {
  return { name: "", email: "", senha: "", telefone: "", foto: "", especialidade: "", disponibilidade_inicio: "", disponibilidade_fim: "" }
}

function emptyClientForm() {
  return { name: "", email: "", senha: "", telefone: "", foto: "" }
}

function emptyPetForm() {
  return { nome: "", raca: "", idade: "", porte: "pequeno", foto: "", cliente: "" }
}

export function Dashboard() {
  const [user, setUser] = useState<UserSession | null>(null)
  const [activeTab, setActiveTab] = useState<TabKey>("agenda")
  const [pets, setPets] = useState<Pet[]>([])
  const [services, setServices] = useState<Service[]>([])
  const [professionals, setProfessionals] = useState<Professional[]>([])
  const [customers, setCustomers] = useState<Customer[]>([])
  const [schedules, setSchedules] = useState<Schedule[]>([])
  const [message, setMessage] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [petForm, setPetForm] = useState(emptyPetForm())
  const [editingPetId, setEditingPetId] = useState<string | null>(null)
  const [scheduleForm, setScheduleForm] = useState({ animal: "", servico: "", profissional: "", data_hora: "" })
  const [serviceForm, setServiceForm] = useState(emptyServiceForm())
  const [editingServiceId, setEditingServiceId] = useState<string | null>(null)
  const [professionalForm, setProfessionalForm] = useState(emptyProfessionalForm())
  const [editingProfessionalId, setEditingProfessionalId] = useState<string | null>(null)
  const [clientForm, setClientForm] = useState(emptyClientForm())
  const [editingClientId, setEditingClientId] = useState<string | null>(null)
  const [profileForm, setProfileForm] = useState({ name: "", email: "", telefone: "", foto: "", especialidade: "", disponibilidade_inicio: "", disponibilidade_fim: "" })

  const isAdmin = user?.role === "admin"
  const isProfessional = user?.role === "profissional"
  const isCustomer = user?.role === "cliente"
  const availableTabs: Array<{ key: TabKey; label: string; icon: IconName; show: boolean }> = [
    { key: "agenda", label: "Agenda", icon: "calendar", show: true },
    { key: "servicos", label: "Serviços", icon: "services", show: isAdmin || isCustomer },
    { key: "profissionais", label: "Profissionais", icon: "users", show: isAdmin || isCustomer },
    { key: "clientes", label: "Clientes", icon: "clients", show: isAdmin },
    { key: "pets", label: "Pets", icon: "pets", show: isAdmin || isCustomer },
    { key: "perfil", label: "Perfil", icon: "settings", show: isCustomer || isProfessional },
  ]

  async function loadData() {
    setError("")
    const meResponse = await api.get<{ user: UserSession }>("/auth/me")
    const currentUser = meResponse.data.user
    setUser(currentUser)

    const professionalsRequest = api.get<Professional[]>("/profissionais")
    const requests: Promise<unknown>[] = [
      api.get<Service[]>("/servicos").then((response) => setServices(response.data)),
      professionalsRequest.then((response) => setProfessionals(response.data)),
      api.get<Schedule[]>("/agendamentos").then((response) => setSchedules(response.data)),
    ]

    if (currentUser.role === "cliente" || currentUser.role === "admin") {
      requests.push(api.get<Pet[]>("/pets").then((response) => setPets(response.data)))
    }

    if (currentUser.role === "cliente") {
      requests.push(api.get<Customer>("/clientes/me").then((response) => setProfileForm({ name: response.data.name ?? "", email: response.data.email ?? "", telefone: response.data.telefone ?? "", foto: response.data.foto ?? "", especialidade: "", disponibilidade_inicio: "", disponibilidade_fim: "" })))
    }

    if (currentUser.role === "admin") {
      requests.push(api.get<Customer[]>("/clientes").then((response) => setCustomers(response.data)))
    }

    if (currentUser.role === "profissional") {
      requests.push(professionalsRequest.then((response) => {
        const professional = response.data.find((item) => item._id === currentUser.id)
        if (!professional) return

        setProfileForm({
          name: professional.name ?? "",
          email: professional.email ?? "",
          telefone: professional.telefone ?? "",
          foto: professional.foto ?? "",
          especialidade: professional.especialidade ?? "",
          disponibilidade_inicio: toDateTimeLocal(professional.disponibilidade_inicio),
          disponibilidade_fim: toDateTimeLocal(professional.disponibilidade_fim),
        })
      }))
    }

    await Promise.all(requests)
    setLoading(false)
  }

  useEffect(() => {
    const timeout = window.setTimeout(() => {
      void loadData().catch(() => {
        setLoading(false)
        setError("Não foi possível carregar o painel")
      })
    }, 0)

    return () => window.clearTimeout(timeout)
  }, [])

  async function submit(action: () => Promise<void>, success: string) {
    try {
      setSaving(true)
      setError("")
      await action()
      setMessage(success)
      await loadData()
    } catch (requestError) {
      const fallback = "Não foi possível concluir a operação"
      if (typeof requestError === "object" && requestError && "response" in requestError) {
        const response = requestError.response as { data?: { message?: string } }
        setError(response.data?.message ?? fallback)
      } else {
        setError(fallback)
      }
    } finally {
      setSaving(false)
    }
  }

  function startEditService(service: Service) {
    setEditingServiceId(service._id)
    setServiceForm({ name: service.name, descricao: service.descricao ?? "", duracao_min: String(service.duracao_min), preco: String(service.preco) })
    setActiveTab("servicos")
  }

  function startEditProfessional(professional: Professional) {
    setEditingProfessionalId(professional._id)
    setProfessionalForm({ name: professional.name, email: professional.email, senha: "", telefone: professional.telefone ?? "", foto: professional.foto ?? "", especialidade: professional.especialidade, disponibilidade_inicio: toDateTimeLocal(professional.disponibilidade_inicio), disponibilidade_fim: toDateTimeLocal(professional.disponibilidade_fim) })
    setActiveTab("profissionais")
  }

  function startEditClient(customer: Customer) {
    setEditingClientId(customer._id)
    setClientForm({ name: customer.name, email: customer.email, senha: "", telefone: customer.telefone ?? "", foto: customer.foto ?? "" })
    setActiveTab("clientes")
  }

  function startEditPet(pet: Pet) {
    setEditingPetId(pet._id)
    setPetForm({ nome: pet.nome, raca: pet.raca, idade: String(pet.idade), porte: pet.porte, foto: pet.foto ?? "", cliente: pet.cliente?._id ?? "" })
    setActiveTab("pets")
  }

  async function handlePetSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    await submit(async () => {
      const payload = { ...petForm, idade: Number(petForm.idade), cliente: isAdmin ? petForm.cliente : undefined }
      if (editingPetId) {
        await api.put(`/pets/${editingPetId}`, payload)
      } else {
        await api.post("/pets", payload)
      }
      setPetForm(emptyPetForm())
      setEditingPetId(null)
    }, editingPetId ? "Pet atualizado com sucesso" : "Pet salvo com sucesso")
  }

  async function handleScheduleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    await submit(async () => {
      await api.post("/agendamentos", scheduleForm)
      setScheduleForm({ animal: "", servico: "", profissional: "", data_hora: "" })
    }, "Agendamento realizado com sucesso")
  }

  async function handleServiceSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    await submit(async () => {
      const payload = { ...serviceForm, duracao_min: Number(serviceForm.duracao_min), preco: Number(serviceForm.preco) }
      if (editingServiceId) {
        await api.put(`/servicos/${editingServiceId}`, payload)
      } else {
        await api.post("/servicos", payload)
      }
      setServiceForm(emptyServiceForm())
      setEditingServiceId(null)
    }, editingServiceId ? "Serviço atualizado com sucesso" : "Serviço cadastrado com sucesso")
  }

  async function handleProfessionalSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    await submit(async () => {
      const payload = { ...professionalForm, senha: professionalForm.senha || undefined }
      if (editingProfessionalId) {
        await api.put(`/profissionais/${editingProfessionalId}`, payload)
      } else {
        await api.post("/profissionais", professionalForm)
      }
      setProfessionalForm(emptyProfessionalForm())
      setEditingProfessionalId(null)
    }, editingProfessionalId ? "Profissional atualizado com sucesso" : "Profissional cadastrado com sucesso")
  }

  async function handleClientSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    await submit(async () => {
      const payload = { ...clientForm, senha: clientForm.senha || undefined }
      if (editingClientId) {
        await api.put(`/clientes/${editingClientId}`, payload)
      } else {
        await api.post("/clientes", clientForm)
      }
      setClientForm(emptyClientForm())
      setEditingClientId(null)
    }, editingClientId ? "Cliente atualizado com sucesso" : "Cliente cadastrado com sucesso")
  }

  async function handleProfileSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    await submit(async () => {
      if (isProfessional) {
        await api.put("/profissionais/me", profileForm)
      } else {
        await api.put("/clientes/me", profileForm)
      }
    }, "Perfil atualizado com sucesso")
  }

  async function removeResource(path: string, success: string) {
    await submit(async () => {
      await api.delete(path)
    }, success)
  }

  async function cancelSchedule(id: string) {
    await submit(async () => {
      await api.patch(`/agendamentos/${id}/cancel`)
    }, "Agendamento cancelado")
  }

  function logout() {
    localStorage.removeItem("petshop-token")
    window.location.href = "/login"
  }

  return (
    <main className="min-h-screen bg-[#f6f3ee] text-slate-900">
      <div className="mx-auto grid max-w-7xl gap-6 px-4 py-6 lg:grid-cols-[280px_1fr]">
        <aside className="rounded-[2rem] border border-white/60 bg-slate-950 p-5 text-white shadow-xl shadow-slate-200 lg:sticky lg:top-6 lg:h-[calc(100vh-3rem)]">
          <div className="rounded-3xl bg-gradient-to-br from-orange-500 to-amber-400 p-5 text-slate-950">
            <div className="grid h-14 w-14 place-items-center rounded-2xl bg-slate-950 text-orange-100"><Icon name="cut" className="h-7 w-7" /></div>
            <h1 className="mt-4 text-2xl font-black">PetCare Banho & Tosa</h1>
            <p className="mt-1 text-sm font-semibold text-slate-800">Painel organizado por rotinas de atendimento.</p>
          </div>

          <div className="mt-5 rounded-3xl bg-white/10 p-4 ring-1 ring-white/10">
            <p className="text-xs font-black uppercase tracking-widest text-orange-200">Sessão</p>
            <p className="mt-2 font-black">{user?.name ?? "Carregando"}</p>
            <p className="text-sm text-slate-300">{user?.role ?? "..."}</p>
          </div>

          <nav className="mt-5 grid gap-2">
            {availableTabs.filter((tab) => tab.show).map((tab) => (
              <button className={`flex items-center gap-3 rounded-2xl px-4 py-3 text-left font-bold transition ${activeTab === tab.key ? "bg-white text-slate-950" : "text-slate-200 hover:bg-white/10"}`} key={tab.key} onClick={() => setActiveTab(tab.key)}>
                <Icon name={tab.icon} />
                {tab.label}
              </button>
            ))}
          </nav>

          <button className="mt-5 w-full rounded-2xl bg-white/10 px-4 py-3 font-bold text-white transition hover:bg-white/20" onClick={logout}>Sair do painel</button>
        </aside>

        <div>
          <header className="overflow-hidden rounded-[2rem] bg-white shadow-sm shadow-slate-200/70">
            <div className="flex flex-col justify-between gap-6 bg-gradient-to-br from-white via-white to-orange-100 p-6 md:flex-row md:items-center">
              <div>
                <span className="rounded-full bg-orange-100 px-3 py-1 text-sm font-black uppercase text-orange-700">{user?.role ?? "carregando"}</span>
                <h2 className="mt-3 text-4xl font-black tracking-tight">Gestão do banho e tosa</h2>
                <p className="mt-2 max-w-2xl text-slate-600">Painel completo para administrar serviços, equipe, clientes, pets e agendamentos com uma experiência clara e moderna.</p>
              </div>
              <div className="grid grid-cols-3 gap-3 text-center">
                <div className="rounded-2xl bg-white p-4 shadow-sm"><p className="text-2xl font-black">{schedules.length}</p><p className="text-xs font-bold text-slate-500">Agendas</p></div>
                <div className="rounded-2xl bg-white p-4 shadow-sm"><p className="text-2xl font-black">{services.length}</p><p className="text-xs font-bold text-slate-500">Serviços</p></div>
                <div className="rounded-2xl bg-white p-4 shadow-sm"><p className="text-2xl font-black">{professionals.length}</p><p className="text-xs font-bold text-slate-500">Equipe</p></div>
              </div>
            </div>
          </header>

          {message && <p className="mt-4 rounded-2xl border border-green-200 bg-green-50 p-4 font-semibold text-green-700" role="status">{message}</p>}
          {error && <p className="mt-4 rounded-2xl border border-red-200 bg-red-50 p-4 font-semibold text-red-700" role="alert">{error}</p>}
          {loading && <p className="mt-4 rounded-2xl bg-white p-4 font-semibold text-slate-600 shadow-sm">Carregando dados do painel...</p>}

          {activeTab === "servicos" && (isAdmin || isCustomer) && (
            <section className={`mt-6 grid gap-6 ${isAdmin ? "xl:grid-cols-[minmax(320px,420px)_1fr]" : ""}`}>
              {isAdmin && (
                <Card icon="services" title={editingServiceId ? "Editar serviço" : "Novo serviço"} description="Descrição, duração e preço aparecem para o cliente e na LP.">
                  <form className="grid gap-4" onSubmit={handleServiceSubmit}>
                    <Field label="Nome do serviço *"><input className={inputClass} placeholder="Ex.: Banho completo" value={serviceForm.name} onChange={(event) => setServiceForm({ ...serviceForm, name: event.target.value })} required /></Field>
                    <Field label="Descrição *"><textarea className={`${inputClass} min-h-28 resize-y`} value={serviceForm.descricao} onChange={(event) => setServiceForm({ ...serviceForm, descricao: event.target.value })} required /></Field>
                    <div className="grid gap-4 md:grid-cols-2">
                      <Field label="Duração *"><input className={inputClass} min="1" type="number" value={serviceForm.duracao_min} onChange={(event) => setServiceForm({ ...serviceForm, duracao_min: event.target.value })} required /></Field>
                      <Field label="Preço *"><input className={inputClass} min="0" step="0.01" type="number" value={serviceForm.preco} onChange={(event) => setServiceForm({ ...serviceForm, preco: event.target.value })} required /></Field>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      <button className={buttonClass} disabled={saving}>{editingServiceId ? "Salvar alterações" : "Cadastrar serviço"}</button>
                      {editingServiceId && <button className={secondaryButtonClass} type="button" onClick={() => { setEditingServiceId(null); setServiceForm(emptyServiceForm()) }}>Cancelar edição</button>}
                    </div>
                  </form>
                </Card>
              )}

              <Card icon="list" title={isAdmin ? "Serviços cadastrados" : "Serviços disponíveis"} description={isAdmin ? "Gerencie serviços do catálogo do banho e tosa." : "Consulte duração, valores e detalhes antes de agendar."}>
                <div className="grid gap-3">
                  {services.map((service) => <article className="rounded-3xl border border-slate-100 bg-slate-50 p-4" key={service._id}><div className="flex flex-col justify-between gap-3 md:flex-row md:items-start"><div><h3 className="text-lg font-black">{service.name}</h3><p className="mt-1 text-sm text-slate-600">{service.descricao ?? "Sem descrição."}</p><p className="mt-2 text-sm font-bold text-slate-500">Tempo: {service.duracao_min} min • {formatCurrency(service.preco)}</p></div>{isAdmin && <div className="flex gap-2"><button className={secondaryButtonClass} onClick={() => startEditService(service)}>Editar</button><button className={dangerButtonClass} onClick={() => void removeResource(`/servicos/${service._id}`, "Serviço removido")} disabled={saving}>Excluir</button></div>}</div></article>)}
                  {services.length === 0 && <p className="rounded-2xl bg-slate-50 p-4 text-sm text-slate-500">Nenhum serviço cadastrado.</p>}
                </div>
              </Card>
            </section>
          )}

          {activeTab === "profissionais" && (isAdmin || isCustomer) && (
            <section className={`mt-6 grid gap-6 ${isAdmin ? "xl:grid-cols-[minmax(320px,420px)_1fr]" : ""}`}>
              {isAdmin && (
                <Card icon="users" title={editingProfessionalId ? "Editar profissional" : "Novo profissional"} description="Gerencie acesso, especialidade e disponibilidade da equipe.">
                  <form className="grid gap-4" onSubmit={handleProfessionalSubmit}>
                    <Field label="Nome *"><input className={inputClass} value={professionalForm.name} onChange={(event) => setProfessionalForm({ ...professionalForm, name: event.target.value })} required /></Field>
                    <Field label="E-mail *"><input className={inputClass} type="email" value={professionalForm.email} onChange={(event) => setProfessionalForm({ ...professionalForm, email: event.target.value })} required /></Field>
                    <Field label={editingProfessionalId ? "Nova senha" : "Senha inicial *"} hint={editingProfessionalId ? "Deixe em branco para manter a senha atual." : "Mínimo de 6 caracteres."}><input className={inputClass} minLength={6} type="password" value={professionalForm.senha} onChange={(event) => setProfessionalForm({ ...professionalForm, senha: event.target.value })} required={!editingProfessionalId} /></Field>
                    <Field label="Telefone"><input className={inputClass} value={professionalForm.telefone} onChange={(event) => setProfessionalForm({ ...professionalForm, telefone: event.target.value })} /></Field>
                    <Field label="Especialidade *"><input className={inputClass} value={professionalForm.especialidade} onChange={(event) => setProfessionalForm({ ...professionalForm, especialidade: event.target.value })} required /></Field>
                    <div className="grid gap-4 md:grid-cols-2"><Field label="Início *"><input className={inputClass} type="datetime-local" value={professionalForm.disponibilidade_inicio} onChange={(event) => setProfessionalForm({ ...professionalForm, disponibilidade_inicio: event.target.value })} required /></Field><Field label="Fim *"><input className={inputClass} type="datetime-local" value={professionalForm.disponibilidade_fim} onChange={(event) => setProfessionalForm({ ...professionalForm, disponibilidade_fim: event.target.value })} required /></Field></div>
                    <Field label="Foto"><input className={inputClass} type="file" accept="image/*" onChange={(event) => void readImage(event, (foto) => setProfessionalForm({ ...professionalForm, foto }), setError)} /></Field>
                    <PhotoPreview src={professionalForm.foto} alt="Prévia do profissional" />
                    <div className="flex flex-wrap gap-2"><button className={buttonClass} disabled={saving}>{editingProfessionalId ? "Salvar alterações" : "Criar profissional"}</button>{editingProfessionalId && <button className={secondaryButtonClass} type="button" onClick={() => { setEditingProfessionalId(null); setProfessionalForm(emptyProfessionalForm()) }}>Cancelar edição</button>}</div>
                  </form>
                </Card>
              )}

              <Card icon="users" title="Equipe profissional" description={isAdmin ? "Gerencie os profissionais do banho e tosa." : "Conheça os profissionais disponíveis para o atendimento."}>
                <div className="grid gap-3">
                  {professionals.map((professional) => <article className="flex flex-col gap-4 rounded-3xl border border-slate-100 bg-slate-50 p-4 md:flex-row md:items-center md:justify-between" key={professional._id}><div className="flex gap-3">{professional.foto ? <img className="h-14 w-14 rounded-2xl object-cover" src={professional.foto} alt={professional.name} /> : <div className="grid h-14 w-14 place-items-center rounded-2xl bg-orange-100 text-orange-700"><Icon name="user" /></div>}<div><h3 className="font-black">{professional.name}</h3><p className="text-sm text-slate-600">{professional.especialidade}</p><p className="text-xs font-semibold text-slate-500">{professional.email}</p></div></div>{isAdmin && <div className="flex gap-2"><button className={secondaryButtonClass} onClick={() => startEditProfessional(professional)}>Editar</button><button className={dangerButtonClass} onClick={() => void removeResource(`/profissionais/${professional._id}`, "Profissional removido")} disabled={saving}>Excluir</button></div>}</article>)}
                  {professionals.length === 0 && <p className="rounded-2xl bg-slate-50 p-4 text-sm text-slate-500">Nenhum profissional cadastrado.</p>}
                </div>
              </Card>
            </section>
          )}

          {activeTab === "clientes" && isAdmin && (
            <section className="mt-6 grid gap-6 xl:grid-cols-[minmax(320px,420px)_1fr]">
              <Card icon="clients" title={editingClientId ? "Editar cliente" : "Novo cliente"} description="Cadastre tutores e atualize seus dados de contato.">
                <form className="grid gap-4" onSubmit={handleClientSubmit}>
                  <Field label="Nome *"><input className={inputClass} value={clientForm.name} onChange={(event) => setClientForm({ ...clientForm, name: event.target.value })} required /></Field>
                  <Field label="E-mail *"><input className={inputClass} type="email" value={clientForm.email} onChange={(event) => setClientForm({ ...clientForm, email: event.target.value })} required /></Field>
                  <Field label={editingClientId ? "Nova senha" : "Senha inicial *"} hint={editingClientId ? "Opcional na edição." : "Mínimo de 6 caracteres."}><input className={inputClass} minLength={6} type="password" value={clientForm.senha} onChange={(event) => setClientForm({ ...clientForm, senha: event.target.value })} required={!editingClientId} /></Field>
                  <Field label="Telefone"><input className={inputClass} value={clientForm.telefone} onChange={(event) => setClientForm({ ...clientForm, telefone: event.target.value })} /></Field>
                  <Field label="Foto"><input className={inputClass} type="file" accept="image/*" onChange={(event) => void readImage(event, (foto) => setClientForm({ ...clientForm, foto }), setError)} /></Field>
                  <PhotoPreview src={clientForm.foto} alt="Prévia do cliente" />
                  <div className="flex flex-wrap gap-2"><button className={buttonClass} disabled={saving}>{editingClientId ? "Salvar alterações" : "Cadastrar cliente"}</button>{editingClientId && <button className={secondaryButtonClass} type="button" onClick={() => { setEditingClientId(null); setClientForm(emptyClientForm()) }}>Cancelar edição</button>}</div>
                </form>
              </Card>

              <Card icon="list" title="Clientes cadastrados" description="Edite ou exclua tutores da base.">
                <div className="grid gap-3">
                  {customers.map((customer) => <article className="flex flex-col gap-4 rounded-3xl border border-slate-100 bg-slate-50 p-4 md:flex-row md:items-center md:justify-between" key={customer._id}><div className="flex gap-3">{customer.foto ? <img className="h-14 w-14 rounded-2xl object-cover" src={customer.foto} alt={customer.name} /> : <div className="grid h-14 w-14 place-items-center rounded-2xl bg-orange-100 text-orange-700"><Icon name="clients" /></div>}<div><h3 className="font-black">{customer.name}</h3><p className="text-sm text-slate-600">{customer.email}</p><p className="text-xs font-semibold text-slate-500">{customer.telefone ?? "Sem telefone"}</p></div></div><div className="flex gap-2"><button className={secondaryButtonClass} onClick={() => startEditClient(customer)}>Editar</button><button className={dangerButtonClass} onClick={() => void removeResource(`/clientes/${customer._id}`, "Cliente removido")} disabled={saving}>Excluir</button></div></article>)}
                  {customers.length === 0 && <p className="rounded-2xl bg-slate-50 p-4 text-sm text-slate-500">Nenhum cliente cadastrado.</p>}
                </div>
              </Card>
            </section>
          )}

          {activeTab === "pets" && (isAdmin || isCustomer) && (
            <section className="mt-6 grid gap-6 xl:grid-cols-[minmax(320px,420px)_1fr]">
              <Card icon="pets" title={editingPetId ? "Editar pet" : "Novo pet"} description={isAdmin ? "Vincule o pet a um tutor." : "Cadastre seu animal antes de agendar."}>
                <form className="grid gap-4" onSubmit={handlePetSubmit}>
                  {isAdmin && <Field label="Tutor *"><select className={inputClass} value={petForm.cliente} onChange={(event) => setPetForm({ ...petForm, cliente: event.target.value })} required><option value="">Selecione o cliente</option>{customers.map((customer) => <option key={customer._id} value={customer._id}>{customer.name}</option>)}</select></Field>}
                  <Field label="Nome *"><input className={inputClass} value={petForm.nome} onChange={(event) => setPetForm({ ...petForm, nome: event.target.value })} required /></Field>
                  <Field label="Raça *"><input className={inputClass} value={petForm.raca} onChange={(event) => setPetForm({ ...petForm, raca: event.target.value })} required /></Field>
                  <div className="grid gap-4 md:grid-cols-2"><Field label="Idade *"><input className={inputClass} min="0" type="number" value={petForm.idade} onChange={(event) => setPetForm({ ...petForm, idade: event.target.value })} required /></Field><Field label="Porte *"><select className={inputClass} value={petForm.porte} onChange={(event) => setPetForm({ ...petForm, porte: event.target.value })}><option value="pequeno">Pequeno</option><option value="medio">Médio</option><option value="grande">Grande</option></select></Field></div>
                  <Field label="Foto"><input className={inputClass} type="file" accept="image/*" onChange={(event) => void readImage(event, (foto) => setPetForm({ ...petForm, foto }), setError)} /></Field>
                  <PhotoPreview src={petForm.foto} alt="Foto do pet" />
                  <div className="flex flex-wrap gap-2"><button className={buttonClass} disabled={saving}>{editingPetId ? "Salvar alterações" : "Cadastrar pet"}</button>{editingPetId && <button className={secondaryButtonClass} type="button" onClick={() => { setEditingPetId(null); setPetForm(emptyPetForm()) }}>Cancelar edição</button>}</div>
                </form>
              </Card>

              <Card icon="pets" title={isAdmin ? "Pets cadastrados" : "Meus pets"} description={isAdmin ? "Gerencie todos os pets e seus tutores." : "Cadastre, edite ou remova seus pets."}>
                <div className="grid gap-3">
                  {pets.map((pet) => <article className="flex flex-col gap-4 rounded-3xl border border-slate-100 bg-slate-50 p-4 md:flex-row md:items-center md:justify-between" key={pet._id}><div className="flex gap-3">{pet.foto ? <img className="h-14 w-14 rounded-2xl object-cover" src={pet.foto} alt={pet.nome} /> : <div className="grid h-14 w-14 place-items-center rounded-2xl bg-orange-100 text-orange-700"><Icon name="pets" /></div>}<div><h3 className="font-black">{pet.nome}</h3><p className="text-sm text-slate-600">{pet.raca} • {pet.idade} anos • {pet.porte}</p>{isAdmin && <p className="text-xs font-semibold text-slate-500">Tutor: {pet.cliente?.name ?? "Não informado"}</p>}</div></div><div className="flex gap-2"><button className={secondaryButtonClass} onClick={() => startEditPet(pet)}>Editar</button><button className={dangerButtonClass} onClick={() => void removeResource(`/pets/${pet._id}`, "Pet removido")} disabled={saving}>Excluir</button></div></article>)}
                  {pets.length === 0 && <p className="rounded-2xl bg-slate-50 p-4 text-sm text-slate-500">Nenhum pet cadastrado.</p>}
                </div>
              </Card>
            </section>
          )}

          {activeTab === "perfil" && (isCustomer || isProfessional) && (
            <section className="mt-6">
              <Card icon="settings" title="Meu perfil" description="Mantenha seus dados atualizados para facilitar contato e identificação.">
                <form className="grid gap-4" onSubmit={handleProfileSubmit}>
                  <div className="grid gap-4 md:grid-cols-2">
                    <Field label="Nome *"><input className={inputClass} value={profileForm.name} onChange={(event) => setProfileForm({ ...profileForm, name: event.target.value })} required /></Field>
                    <Field label="E-mail *"><input className={inputClass} type="email" value={profileForm.email} onChange={(event) => setProfileForm({ ...profileForm, email: event.target.value })} required /></Field>
                    <Field label="Telefone"><input className={inputClass} value={profileForm.telefone} onChange={(event) => setProfileForm({ ...profileForm, telefone: event.target.value })} /></Field>
                    <Field label="Foto"><input className={inputClass} type="file" accept="image/*" onChange={(event) => void readImage(event, (foto) => setProfileForm({ ...profileForm, foto }), setError)} /></Field>
                    {isProfessional && <Field label="Especialidade *"><input className={inputClass} value={profileForm.especialidade} onChange={(event) => setProfileForm({ ...profileForm, especialidade: event.target.value })} required /></Field>}
                    {isProfessional && <Field label="Disponível a partir de *"><input className={inputClass} type="datetime-local" value={profileForm.disponibilidade_inicio} onChange={(event) => setProfileForm({ ...profileForm, disponibilidade_inicio: event.target.value })} required /></Field>}
                    {isProfessional && <Field label="Disponível até *"><input className={inputClass} type="datetime-local" value={profileForm.disponibilidade_fim} onChange={(event) => setProfileForm({ ...profileForm, disponibilidade_fim: event.target.value })} required /></Field>}
                  </div>
                  <PhotoPreview src={profileForm.foto} alt="Foto do perfil" />
                  <button className={buttonClass} disabled={saving}>Atualizar perfil</button>
                </form>
              </Card>
            </section>
          )}

          {activeTab === "agenda" && (
            <section className="mt-6 grid gap-6 xl:grid-cols-[minmax(320px,420px)_1fr]">
              {isCustomer && (
                <Card icon="calendar" title="Novo agendamento" description="Escolha pet, serviço, profissional e horário.">
                  <form className="grid gap-4" onSubmit={handleScheduleSubmit}>
                    <Field label="Pet *"><select className={inputClass} value={scheduleForm.animal} onChange={(event) => setScheduleForm({ ...scheduleForm, animal: event.target.value })} required><option value="">Selecione o pet</option>{pets.map((pet) => <option key={pet._id} value={pet._id}>{pet.nome}</option>)}</select></Field>
                    <Field label="Serviço *"><select className={inputClass} value={scheduleForm.servico} onChange={(event) => setScheduleForm({ ...scheduleForm, servico: event.target.value })} required><option value="">Selecione o serviço</option>{services.map((service) => <option key={service._id} value={service._id}>{service.name} - {formatCurrency(service.preco)}</option>)}</select></Field>
                    <Field label="Profissional *"><select className={inputClass} value={scheduleForm.profissional} onChange={(event) => setScheduleForm({ ...scheduleForm, profissional: event.target.value })} required><option value="">Selecione o profissional</option>{professionals.map((professional) => <option key={professional._id} value={professional._id}>{professional.name} - {professional.especialidade}</option>)}</select></Field>
                    <Field label="Data e hora *"><input className={inputClass} type="datetime-local" value={scheduleForm.data_hora} onChange={(event) => setScheduleForm({ ...scheduleForm, data_hora: event.target.value })} required /></Field>
                    <button className={buttonClass} disabled={saving || pets.length === 0 || services.length === 0 || professionals.length === 0}>Confirmar agendamento</button>
                  </form>
                </Card>
              )}

              <Card icon="calendar" title="Agendamentos" description={isAdmin ? "Visão geral de todos os clientes." : isProfessional ? "Atendimentos atribuídos ao seu perfil." : "Seus horários marcados."}>
                <div className="mb-4 flex justify-end"><span className="rounded-full bg-slate-100 px-4 py-2 text-sm font-bold text-slate-600">{schedules.length} registro(s)</span></div>
                <div className="grid gap-3">
                  {schedules.map((schedule) => <article className="rounded-3xl border border-slate-100 bg-slate-50 p-4" key={schedule._id}><div className="flex flex-col justify-between gap-3 md:flex-row md:items-start"><div><h3 className="font-black">{schedule.animal?.nome ?? "Pet"} • {schedule.servico?.name ?? "Serviço"}</h3><p className="text-sm text-slate-600">Profissional: {schedule.profissional?.name ?? "Não informado"}</p>{isAdmin && <p className="text-sm text-slate-600">Cliente: {schedule.cliente?.name ?? "Não informado"} ({schedule.cliente?.email ?? "sem e-mail"})</p>}<p className="mt-1 text-sm font-bold text-slate-700">{new Date(schedule.data_hora).toLocaleString()} • {schedule.status}</p></div>{(isCustomer || isAdmin) && schedule.status === "scheduled" && <button className={dangerButtonClass} onClick={() => void cancelSchedule(schedule._id)} disabled={saving}>Cancelar</button>}</div></article>)}
                  {schedules.length === 0 && <p className="rounded-2xl bg-slate-50 p-4 text-sm text-slate-500">Nenhum agendamento encontrado.</p>}
                </div>
              </Card>
            </section>
          )}
        </div>
      </div>
    </main>
  )
}
