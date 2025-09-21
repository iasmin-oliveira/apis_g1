import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../../services/api";

export default function AtualizarUsuario() {
  const { id } = useParams();
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    api.get(`/usuarios/${id}`)
      .then(res => {
        setNome(res.data.nome);
        setEmail(res.data.email);
      })
      .catch(err => console.error(err));
  }, [id]);

  const handle = async (e) => {
    e.preventDefault();
    try {
      await api.put(`/usuarios/${id}`, { nome, email });
      alert("Atualizado");
      navigate("/admin/usuarios");
    } catch {
      alert("Erro");
    }
  };

  return (
    <div className="container">
      <div className="card p-4">
        <h3>Atualizar Usuário</h3>
        <form onSubmit={handle}>
          <input className="form-control mb-2" value={nome} onChange={e => setNome(e.target.value)} required />
          <input className="form-control mb-2" value={email} onChange={e => setEmail(e.target.value)} required />
          <button className="btn btn-primary" type="submit">Salvar</button>
        </form>
      </div>
    </div>
  );
}
