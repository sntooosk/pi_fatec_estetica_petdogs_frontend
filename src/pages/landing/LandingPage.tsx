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

const benefits = ["Atendimento com horário marcado", "Histórico do pet sempre disponível", "Equipe especializada", "Ambiente seguro e acolhedor"]

const testimonials = [
  { name: "Mariana", text: "Meu cachorro voltou tranquilo, cheiroso e muito bem cuidado." },
  { name: "Carlos", text: "O agendamento online facilitou demais a nossa rotina." },
]

export function LandingPage() {
  const [services, setServices] = useState<Service[]>(fallbackServices)
  const [loadingServices, setLoadingServices] = useState(true)

  useEffect(() => {
    const timeout = window.setTimeout(() => {
      api.get<Service[]>("/servicos")
        .then((response) => {
          if (response.data.length > 0) setServices(response.data)
        })
        .catch(() => setServices(fallbackServices))
        .finally(() => setLoadingServices(false))
    }, 0)

    return () => window.clearTimeout(timeout)
  }, [])

  return (
    <main className="min-h-screen bg-orange-50 text-slate-900">
      <section className="mx-auto flex max-w-6xl flex-col gap-10 px-6 py-10 md:flex-row md:items-center md:py-20">
        <div className="flex-1 space-y-6">
          <span className="rounded-full bg-orange-100 px-4 py-2 text-sm font-semibold text-orange-700">Pet Shop Banho & Tosa</span>
          <h1 className="text-4xl font-black leading-tight md:text-6xl">Cuidado completo para o seu pet, sem complicação.</h1>
          <p className="text-lg text-slate-600">Agende banho, tosa e hidratação em poucos cliques e acompanhe todos os cuidados do seu melhor amigo.</p>
          <div className="flex flex-wrap gap-3">
            <Link className="rounded-full bg-orange-600 px-6 py-3 font-bold text-white shadow-lg transition hover:bg-orange-700 focus:outline-none focus:ring-4 focus:ring-orange-200" to="/register">Agendar agora</Link>
            <Link className="rounded-full border border-orange-300 px-6 py-3 font-bold text-orange-700 transition hover:bg-orange-100 focus:outline-none focus:ring-4 focus:ring-orange-200" to="/login">Já sou cliente</Link>
          </div>
        </div>
        <div className="flex-1 rounded-3xl bg-white p-8 shadow-xl">
          <div className="rounded-2xl bg-gradient-to-br from-orange-400 to-amber-300 p-8 text-white">
            <div className="grid h-20 w-20 place-items-center rounded-3xl bg-white/20 text-3xl font-black">BT</div>
            <h2 className="mt-6 text-3xl font-black">Banho, tosa e carinho no mesmo lugar.</h2>
            <p className="mt-3 text-white/90">Controle pets, serviços e agendamentos em uma plataforma moderna.</p>
          </div>
        </div>
      </section>

      <section className="bg-white py-16" id="servicos">
        <div className="mx-auto max-w-6xl px-6">
          <div className="flex flex-col justify-between gap-3 md:flex-row md:items-end">
            <div>
              <span className="text-sm font-black uppercase tracking-wide text-orange-600">Catálogo</span>
              <h2 className="text-3xl font-black">Serviços disponíveis</h2>
              <p className="mt-2 text-slate-600">Os serviços cadastrados pelo administrador aparecem aqui automaticamente.</p>
            </div>
            {loadingServices && <span className="rounded-full bg-slate-100 px-4 py-2 text-sm font-semibold text-slate-500">Carregando serviços...</span>}
          </div>
          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {services.map((service) => (
              <article className="rounded-2xl border border-orange-100 bg-orange-50 p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md" key={service._id}>
                <h3 className="text-xl font-bold text-orange-700">{service.name}</h3>
                <p className="mt-3 min-h-16 text-slate-600">{service.descricao ?? "Serviço especial para cuidar do seu pet com segurança e carinho."}</p>
                <div className="mt-5 flex flex-wrap gap-2 text-sm font-bold">
                  <span className="rounded-full bg-white px-3 py-1 text-slate-700">{service.duracao_min} min</span>
                  <span className="rounded-full bg-white px-3 py-1 text-orange-700">R$ {Number(service.preco).toFixed(2)}</span>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl gap-10 px-6 py-16 md:grid-cols-2">
        <div>
          <h2 className="text-3xl font-black">Por que escolher a gente?</h2>
          <ul className="mt-6 grid gap-3">
            {benefits.map((benefit) => <li className="rounded-xl bg-white p-4 font-semibold shadow-sm" key={benefit}>✓ {benefit}</li>)}
          </ul>
        </div>
        <div>
          <h2 className="text-3xl font-black">Depoimentos</h2>
          <div className="mt-6 grid gap-4">
            {testimonials.map((testimonial) => (
              <blockquote className="rounded-2xl bg-white p-6 shadow-sm" key={testimonial.name}>
                <p className="text-slate-600">“{testimonial.text}”</p>
                <footer className="mt-4 font-bold text-orange-700">{testimonial.name}</footer>
              </blockquote>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-slate-900 px-6 py-16 text-white">
        <div className="mx-auto max-w-6xl text-center">
          <h2 className="text-3xl font-black">Sobre o nosso banho e tosa</h2>
          <p className="mx-auto mt-4 max-w-3xl text-slate-300">Unimos tecnologia e atendimento humanizado para oferecer uma experiência segura, rápida e transparente para tutores e pets.</p>
          <Link className="mt-8 inline-flex rounded-full bg-orange-500 px-6 py-3 font-bold text-white hover:bg-orange-600 focus:outline-none focus:ring-4 focus:ring-orange-300" to="/register">Criar conta e agendar</Link>
        </div>
      </section>
    </main>
  )
}
