import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import api from "../../services/api"

interface Service {
  _id: string
  name: string
  descricao?: string
  duracao_min: number
  preco: number
}

const fallbackServices: Service[] = [
  { _id: "banho", name: "Banho", descricao: "Higienização completa com produtos seguros para cada tipo de pelagem.", duracao_min: 45, preco: 60 },
  { _id: "tosa", name: "Tosa", descricao: "Tosa higiênica e estética feita por profissionais experientes.", duracao_min: 60, preco: 80 },
  { _id: "hidratacao", name: "Hidratação", descricao: "Tratamentos para pelos macios, saudáveis e cheirosos por mais tempo.", duracao_min: 40, preco: 70 },
]

const benefits = [
  { title: "Agendamento claro", text: "Seu cliente agenda em poucos passos, sem ruído visual." },
  { title: "Operação organizada", text: "Agenda, pets, clientes e profissionais em um único fluxo." },
  { title: "Experiência responsiva", text: "Leitura fácil no celular, tablet e desktop." },
  { title: "Identidade premium", text: "Visual branco e azul com aparência profissional." },
]

const testimonials = [
  { name: "Mariana", text: "Meu cachorro voltou tranquilo, cheiroso e muito bem cuidado." },
  { name: "Carlos", text: "O agendamento online facilitou demais a nossa rotina." },
]

function SectionTitle({ eyebrow, title, description }: { eyebrow: string; title: string; description: string }) {
  return (
    <div>
      <span className="text-sm font-black uppercase tracking-[0.28em] text-blue-600">{eyebrow}</span>
      <h2 className="mt-2 text-3xl font-black tracking-tight text-slate-950 sm:text-4xl">{title}</h2>
      <p className="mt-3 max-w-2xl text-slate-600">{description}</p>
    </div>
  )
}

export function LandingPage() {
  const [services, setServices] = useState<Service[]>(fallbackServices)
  const [loadingServices, setLoadingServices] = useState(true)

  useEffect(() => {
    const timeout = window.setTimeout(() => {
      api.get<Service[]>('/servicos')
        .then((response) => {
          if (response.data.length > 0) setServices(response.data)
        })
        .catch(() => setServices(fallbackServices))
        .finally(() => setLoadingServices(false))
    }, 0)

    return () => window.clearTimeout(timeout)
  }, [])

  return (
    <main className="min-h-screen text-slate-900">
      <header className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-5 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3">
          <div className="grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br from-blue-600 via-sky-500 to-blue-200 text-white shadow-lg shadow-blue-200/60">BT</div>
          <div>
            <p className="text-xs font-black uppercase tracking-[0.25em] text-blue-600">PetCare</p>
            <p className="font-black text-slate-950">Banho & Tosa</p>
          </div>
        </div>
        <div className="hidden items-center gap-3 sm:flex">
          <Link className="rounded-2xl px-4 py-2 text-sm font-bold text-slate-600 transition hover:bg-white hover:text-slate-950" to="/login">Entrar</Link>
          <Link className="rounded-2xl bg-blue-600 px-4 py-2 text-sm font-bold text-white transition hover:bg-blue-700" to="/register">Criar conta</Link>
        </div>
      </header>

      <section className="mx-auto grid max-w-7xl gap-8 px-4 pb-10 pt-4 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:px-8 lg:py-10">
        <div className="flex flex-col justify-center gap-7">
          <div className="inline-flex w-fit rounded-full border border-blue-100 bg-white px-4 py-2 text-sm font-semibold text-blue-700 shadow-sm">Agendamento digital para banho e tosa</div>
          <div>
            <h1 className="max-w-3xl text-4xl font-black tracking-tight text-slate-950 sm:text-5xl lg:text-6xl">Uma experiência moderna para sua clínica de pets.</h1>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-600">Apresente seus serviços com uma interface premium, mantenha a operação organizada no dashboard e ofereça aos clientes uma navegação clara em qualquer tela.</p>
          </div>

          <div className="flex flex-wrap gap-3">
            <Link className="rounded-2xl bg-blue-600 px-6 py-3 font-bold text-white shadow-lg shadow-blue-200 transition hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-200" to="/register">Agendar agora</Link>
            <Link className="rounded-2xl border border-slate-200 bg-white px-6 py-3 font-bold text-slate-700 transition hover:bg-slate-50 focus:outline-none focus:ring-4 focus:ring-blue-100" to="/login">Já sou cliente</Link>
          </div>

          <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
            {benefits.map((benefit) => (
              <article className="rounded-[1.4rem] border border-slate-200 bg-white p-4 shadow-sm" key={benefit.title}>
                <h3 className="font-black text-slate-950">{benefit.title}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">{benefit.text}</p>
              </article>
            ))}
          </div>
        </div>

        <div className="relative">
          <div className="absolute inset-0 -z-10 rounded-[2.5rem] bg-blue-200/30 blur-3xl" />
          <div className="overflow-hidden rounded-[2.5rem] border border-white/70 bg-white shadow-[0_30px_80px_-50px_rgba(37,99,235,0.45)]">
            <div className="bg-gradient-to-br from-slate-950 via-blue-950 to-blue-700 p-8 text-white">
              <div className="flex items-center justify-between gap-4">
                <div className="grid h-14 w-14 place-items-center rounded-2xl bg-white/10 text-2xl font-black">BT</div>
                <div className="rounded-full border border-white/15 bg-white/10 px-3 py-1 text-xs font-bold uppercase tracking-[0.2em]">Painel premium</div>
              </div>
              <h2 className="mt-10 max-w-xl text-3xl font-black tracking-tight">Banho, tosa e carinho com controle visual profissional.</h2>
              <p className="mt-3 max-w-xl text-white/80">Tudo em um ambiente leve, organizado e pronto para escalar atendimento sem parecer sistema genérico.</p>
            </div>

            <div className="grid gap-4 p-5 sm:grid-cols-3">
              <div className="rounded-[1.4rem] bg-slate-50 p-4">
                <p className="text-xs font-black uppercase tracking-[0.2em] text-slate-500">Clientes</p>
                <p className="mt-2 text-3xl font-black text-slate-950">+120</p>
                <p className="mt-1 text-sm text-slate-600">tutores satisfeitos</p>
              </div>
              <div className="rounded-[1.4rem] bg-slate-50 p-4">
                <p className="text-xs font-black uppercase tracking-[0.2em] text-slate-500">Agenda</p>
                <p className="mt-2 text-3xl font-black text-slate-950">24/7</p>
                <p className="mt-1 text-sm text-slate-600">acesso online</p>
              </div>
              <div className="rounded-[1.4rem] bg-slate-50 p-4">
                <p className="text-xs font-black uppercase tracking-[0.2em] text-slate-500">Equipe</p>
                <p className="mt-2 text-3xl font-black text-slate-950">100%</p>
                <p className="mt-1 text-sm text-slate-600">foco no cuidado</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white/80 py-16" id="servicos">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-8">
            <SectionTitle eyebrow="Catálogo" title="Serviços disponíveis" description="O administrador atualiza o catálogo e ele aparece automaticamente para seus clientes." />
            {loadingServices && <span className="w-fit rounded-full bg-slate-100 px-4 py-2 text-sm font-semibold text-slate-500">Carregando serviços...</span>}
            <div className="grid gap-5 md:grid-cols-3">
              {services.map((service) => (
                <article className="rounded-[1.5rem] border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg" key={service._id}>
                  <div className="flex items-start justify-between gap-4">
                    <h3 className="text-xl font-black text-slate-950">{service.name}</h3>
                    <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-bold text-blue-700">{service.duracao_min} min</span>
                  </div>
                  <p className="mt-4 min-h-16 text-sm leading-6 text-slate-600">{service.descricao ?? "Serviço especial para cuidar do seu pet com segurança e carinho."}</p>
                  <div className="mt-5 inline-flex rounded-full bg-slate-100 px-3 py-1 text-sm font-bold text-slate-700">R$ {Number(service.preco).toFixed(2)}</div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-8 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:px-8">
        <div className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm">
          <SectionTitle eyebrow="Experiência" title="Por que escolher a plataforma?" description="Uma apresentação profissional melhora a percepção do serviço e simplifica o caminho até o agendamento." />
          <div className="mt-8 grid gap-4">
            {[
              "Atendimento com horário marcado",
              "Histórico do pet sempre disponível",
              "Equipe especializada e organizada",
              "Interface premium e confiável",
            ].map((item) => (
              <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4 font-semibold text-slate-700" key={item}>
                {item}
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm">
          <SectionTitle eyebrow="Depoimentos" title="O que os clientes sentem" description="Uma UX boa também passa confiança antes mesmo do primeiro agendamento." />
          <div className="mt-8 grid gap-4">
            {testimonials.map((testimonial) => (
              <blockquote className="rounded-2xl border border-slate-200 bg-slate-50 p-6" key={testimonial.name}>
                <p className="text-slate-600">“{testimonial.text}”</p>
                <footer className="mt-4 font-black text-blue-700">{testimonial.name}</footer>
              </blockquote>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 pb-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl overflow-hidden rounded-[2.5rem] bg-gradient-to-r from-blue-600 via-blue-700 to-slate-950 px-6 py-14 text-center text-white shadow-[0_30px_80px_-40px_rgba(37,99,235,0.65)] sm:px-10">
          <h2 className="text-3xl font-black tracking-tight sm:text-4xl">Sobre o banho e tosa</h2>
          <p className="mx-auto mt-4 max-w-3xl text-white/80">Unimos tecnologia e atendimento humanizado para oferecer uma experiência segura, rápida e transparente para tutores e pets.</p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link className="rounded-2xl bg-white px-6 py-3 font-bold text-blue-700 transition hover:bg-blue-50" to="/register">Criar conta e agendar</Link>
            <Link className="rounded-2xl border border-white/20 px-6 py-3 font-bold text-white transition hover:bg-white/10" to="/login">Entrar na conta</Link>
          </div>
        </div>
      </section>
    </main>
  )
}
