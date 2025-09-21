import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

export default function Register() {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post("/auth/register", { nome, email, senha });
      alert("Conta criada. Faça login.");
      navigate("/login");
    } catch (err) {
      alert(err?.response?.data?.message || "Erro ao registrar");
    }
  };

  return (
    <div className="container">
      <div className="card p-4">
        <h3>Registrar</h3>
        <form onSubmit={handleSubmit}>
          <div className="mb-2">
            <input className="form-control" placeholder="Nome" value={nome} onChange={e => setNome(e.target.value)} required />
          </div>
          <div className="mb-2">
            <input type="email" className="form-control" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} required />
          </div>
          <div className="mb-3">
            <input type="password" className="form-control" placeholder="Senha" value={senha} onChange={e => setSenha(e.target.value)} required />
          </div>
          <button className="btn btn-success" type="submit">Registrar</button>
        </form>
      </div>
    </div>
  );
}
