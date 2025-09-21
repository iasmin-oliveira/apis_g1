import React, { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export default function Login() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      await login(email, senha);
      navigate("/");
    } catch (err) {
      alert(err?.response?.data?.message || "Erro ao fazer login");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <div className="card p-4">
        <h3>Login</h3>
        <form onSubmit={handleSubmit}>
          <div className="mb-2">
            <input type="email" className="form-control" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} required />
          </div>
          <div className="mb-3">
            <input type="password" className="form-control" placeholder="Senha" value={senha} onChange={e => setSenha(e.target.value)} required />
          </div>
          <button className="btn btn-primary" type="submit" disabled={loading}>{loading ? "Entrando..." : "Entrar"}</button>
          <Link className="btn btn-link" to="/register">Criar conta</Link>
        </form>
      </div>
    </div>
  );
}
