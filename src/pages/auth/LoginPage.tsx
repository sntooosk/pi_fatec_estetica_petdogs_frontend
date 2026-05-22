import { useState } from "react"
import type { FormEvent } from "react"
import { Link, useNavigate } from "react-router-dom"
import api from "../../services/api"

type Mode = "login" | "register" | "forgot" | "reset"

interface LoginPageProps {
  mode?: Mode
}

export function LoginPage({ mode = "login" }: LoginPageProps) {
  const navigate = useNavigate()
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [token, setToken] = useState("")
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState("")
  const [error, setError] = useState("")

  const titleByMode = {
    login: "Entrar na conta",
    register: "Criar conta",
    forgot: "Recuperar senha",
    reset: "Redefinir senha",
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setLoading(true)
    setError("")
    setMessage("")

    try {
      if (mode === "register") {
        const { data } = await api.post("/auth/register", { name, email, password })
        localStorage.setItem("petshop-token", data.token)
        navigate("/app/dashboard")
        return
      }

      if (mode === "forgot") {
        const { data } = await api.post("/auth/forgot-password", { email })
        setMessage(data.resetToken ? `${data.message}. Token: ${data.resetToken}` : data.message)
        return
      }

      if (mode === "reset") {
        const { data } = await api.post("/auth/reset-password", { token, password })
        setMessage(data.message)
        return
      }

      const { data } = await api.post("/auth/login", { email, password })
      localStorage.setItem("petshop-token", data.token)
      navigate("/app/dashboard")
    } catch (requestError) {
      const fallback = "Não foi possível concluir a operação"
      if (typeof requestError === "object" && requestError && "response" in requestError) {
        const response = requestError.response as { data?: { message?: string } }
        setError(response.data?.message ?? fallback)
      } else {
        setError(fallback)
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-orange-50 px-6 py-10">
      <form className="w-full max-w-md rounded-3xl bg-white p-8 shadow-xl" onSubmit={handleSubmit}>
        <Link className="text-sm font-bold text-orange-700" to="/">← Voltar para início</Link>
        <h1 className="mt-6 text-3xl font-black text-slate-900">{titleByMode[mode]}</h1>
        <p className="mt-2 text-slate-600">Gerencie pets e agendamentos do banho e tosa.</p>

        <div className="mt-6 grid gap-4">
          {mode === "register" && (
            <label className="grid gap-2 text-sm font-semibold text-slate-700">
              Nome
              <input className="rounded-xl border border-slate-200 px-4 py-3" value={name} onChange={(event) => setName(event.target.value)} required />
            </label>
          )}
          {(mode === "login" || mode === "register" || mode === "forgot") && (
            <label className="grid gap-2 text-sm font-semibold text-slate-700">
              E-mail
              <input className="rounded-xl border border-slate-200 px-4 py-3" type="email" value={email} onChange={(event) => setEmail(event.target.value)} required />
            </label>
          )}
          {mode === "reset" && (
            <label className="grid gap-2 text-sm font-semibold text-slate-700">
              Token
              <input className="rounded-xl border border-slate-200 px-4 py-3" value={token} onChange={(event) => setToken(event.target.value)} required />
            </label>
          )}
          {mode !== "forgot" && (
            <label className="grid gap-2 text-sm font-semibold text-slate-700">
              Senha
              <input className="rounded-xl border border-slate-200 px-4 py-3" minLength={6} type="password" value={password} onChange={(event) => setPassword(event.target.value)} required />
            </label>
          )}
        </div>

        {error && <p className="mt-4 rounded-xl bg-red-50 p-3 text-sm font-semibold text-red-700">{error}</p>}
        {message && <p className="mt-4 rounded-xl bg-green-50 p-3 text-sm font-semibold text-green-700">{message}</p>}

        <button className="mt-6 w-full rounded-xl bg-orange-600 px-5 py-3 font-bold text-white disabled:opacity-60" disabled={loading} type="submit">
          {loading ? "Aguarde..." : "Continuar"}
        </button>

        <div className="mt-5 flex flex-wrap gap-3 text-sm font-semibold text-orange-700">
          <Link to="/login">Entrar</Link>
          <Link to="/register">Cadastrar</Link>
          <Link to="/forgot-password">Recuperar senha</Link>
          <Link to="/reset-password">Redefinir</Link>
        </div>
      </form>
    </main>
  )
}
