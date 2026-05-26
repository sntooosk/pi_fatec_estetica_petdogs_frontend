import type { ReactNode } from "react"

export function BenefitCard({ icon, title, text }: { icon: ReactNode; title: string; text: string }) {
  return (
    <article className="group rounded-[1.6rem] border border-blue-100 bg-white p-5 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-[0_18px_45px_-25px_rgba(37,99,235,0.45)]">
      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50 text-blue-700 transition group-hover:bg-blue-600 group-hover:text-white">{icon}</div>
      <h3 className="mt-4 text-lg font-black text-slate-950">{title}</h3>
      <p className="mt-2 text-sm leading-6 text-slate-600">{text}</p>
    </article>
  )
}

export function ServiceCard({ title, text, highlight, actionHref, actionLabel = "Agendar no WhatsApp" }: { title: string; text: string; highlight: string; actionHref?: string; actionLabel?: string }) {
  return (
    <article className="group relative overflow-hidden rounded-[1.6rem] border border-slate-200 bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-[0_18px_45px_-25px_rgba(15,23,42,0.2)]">
      <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-blue-600 via-sky-500 to-orange-400" />
      <div className="flex items-start justify-between gap-3">
        <div>
          <span className="text-xs font-black uppercase tracking-[0.26em] text-blue-600">Serviço</span>
          <h3 className="mt-2 text-xl font-black text-slate-950">{title}</h3>
        </div>
        <span className="rounded-full bg-orange-100 px-3 py-1 text-xs font-bold text-orange-700">{highlight}</span>
      </div>
      <p className="mt-4 text-sm leading-6 text-slate-600">{text}</p>
      {actionHref && (
        <a className="mt-5 inline-flex items-center justify-center rounded-2xl bg-blue-600 px-4 py-3 text-sm font-black text-white transition duration-300 hover:-translate-y-0.5 hover:bg-blue-700" href={actionHref} target="_blank" rel="noreferrer">
          {actionLabel}
        </a>
      )}
    </article>
  )
}

export function ReviewCard({ name, profile, text }: { name: string; profile: string; text: string }) {
  return (
    <article className="rounded-[1.6rem] border border-slate-200 bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-[0_18px_45px_-25px_rgba(37,99,235,0.25)]">
      <div className="flex items-center gap-1 text-orange-500" aria-label="5 estrelas">
        <Star />
        <Star />
        <Star />
        <Star />
        <Star />
      </div>
      <p className="mt-4 text-sm leading-6 text-slate-600">“{text}”</p>
      <footer className="mt-5 border-t border-slate-100 pt-4">
        <p className="font-black text-slate-950">{name}</p>
        <p className="text-sm text-slate-500">{profile}</p>
      </footer>
    </article>
  )
}

export function FaqItem({ question, answer }: { question: string; answer: string }) {
  return (
    <details className="group rounded-[1.4rem] border border-slate-200 bg-white p-5 shadow-sm transition open:shadow-[0_18px_45px_-28px_rgba(37,99,235,0.2)]">
      <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-left font-black text-slate-950">
        <span>{question}</span>
        <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-blue-50 text-blue-700 transition group-open:rotate-45">+</span>
      </summary>
      <p className="mt-4 text-sm leading-6 text-slate-600">{answer}</p>
    </details>
  )
}

function Star() {
  return (
    <svg aria-hidden="true" className="h-4 w-4 fill-current" viewBox="0 0 20 20">
      <path d="m10 1.5 2.6 5.28 5.83.85-4.22 4.11 1 5.81L10 14.82 4.79 17.55l1-5.81L1.57 7.63l5.83-.85L10 1.5Z" />
    </svg>
  )
}