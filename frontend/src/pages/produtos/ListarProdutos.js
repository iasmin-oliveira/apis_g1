import React, { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import api from "../../services/api";
import { AuthContext } from "../../context/AuthContext";

export default function ListarProdutos() {
  const [produtos, setProdutos] = useState([]);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    api.get("/produtos")
      .then(res => setProdutos(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="container">
      <div className="d-flex justify-content-between mb-3">
        <h3>Produtos</h3>
        {user && user.role === "admin" && (
          <div>
            <Link className="btn btn-primary me-2" to="/admin/produtos">Painel Admin</Link>
            <Link className="btn btn-success" to="/admin/produtos/criar">Criar Produto</Link>
          </div>
        )}
      </div>

      <div className="row g-3">
        {produtos.map(p => (
          <div className="col-12 col-md-6" key={p.id}>
            <div className="card p-3">
              <h5>{p.nome}</h5>
              <p className="mb-1">{p.descricao}</p>
              <p className="fw-bold">R$ {p.preco}</p>
              <div>
                {user && user.role === "admin" ? (
                  <>
                    <Link className="btn btn-sm btn-outline-secondary me-2" to={`/produtos/atualizar/${p.id}`}>Editar</Link>
                    <Link className="btn btn-sm btn-danger" to={`/produtos/deletar/${p.id}`}>Excluir</Link>
                  </>
                ) : (
                  <button className="btn btn-sm btn-outline-primary">Adicionar ao carrinho</button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
