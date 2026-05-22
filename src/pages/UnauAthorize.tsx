import { Link } from "react-router-dom"

export function UnauthorizedPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-100 p-6">
      <div className="rounded-3xl bg-white p-8 text-center shadow-sm">
        <h1 className="text-3xl font-black text-slate-900">Acesso não autorizado</h1>
        <p className="mt-2 text-slate-600">Você não tem permissão para acessar esta página.</p>
        <Link className="mt-6 inline-flex rounded-xl bg-orange-600 px-5 py-3 font-bold text-white" to="/">Voltar</Link>
      </div>
    </main>
  )
}
