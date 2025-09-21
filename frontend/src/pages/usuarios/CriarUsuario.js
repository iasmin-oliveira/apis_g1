import React, { useState } from "react";
import api from "../../services/api";
import { useNavigate } from "react-router-dom";

export default function CriarUsuario() {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const navigate = useNavigate();

  const handle = async (e) => {
    e.preventDefault();
    try {
      await api.post("/usuarios", { nome, email, senha });
      alert("Usuário criado");
      navigate("/admin/usuarios");
    } catch (err) {
      alert("Erro");
    }
  };

  return (
    <div className="container">
      <div className="card p-4">
        <h3>Criar Usuário</h3>
        <form onSubmit={handle}>
          <input className="form-control mb-2" placeholder="Nome" value={nome} onChange={e => setNome(e.target.value)} required />
          <input className="form-control mb-2" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} required />
          <input className="form-control mb-2" type="password" placeholder="Senha" value={senha} onChange={e => setSenha(e.target.value)} required />
          <button className="btn btn-success" type="submit">Salvar</button>
        </form>
      </div>
    </div>
  );
}
