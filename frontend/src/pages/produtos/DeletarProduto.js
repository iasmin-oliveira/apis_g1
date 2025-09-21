import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../../services/api";

export default function AtualizarProduto() {
  const { id } = useParams();
  const [nome, setNome] = useState("");
  const [preco, setPreco] = useState("");
  const [descricao, setDescricao] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    api.get(`/produtos/${id}`)
      .then(res => {
        setNome(res.data.nome || "");
        setPreco(res.data.preco || "");
        setDescricao(res.data.descricao || "");
      })
      .catch(err => console.error(err));
  }, [id]);

  const handle = async (e) => {
    e.preventDefault();
    try {
      await api.put(`/produtos/${id}`, { nome, preco, descricao });
      alert("Atualizado");
      navigate("/admin/produtos");
    } catch (err) {
      alert("Erro ao atualizar");
    }
  };

  return (
    <div className="container">
      <div className="card p-4">
        <h3>Atualizar Produto</h3>
        <form onSubmit={handle}>
          <input className="form-control mb-2" value={nome} onChange={e => setNome(e.target.value)} required />
          <input className="form-control mb-2" type="number" value={preco} onChange={e => setPreco(e.target.value)} required />
          <textarea className="form-control mb-2" value={descricao} onChange={e => setDescricao(e.target.value)} />
          <button className="btn btn-primary" type="submit">Salvar</button>
        </form>
      </div>
    </div>
  );
}
