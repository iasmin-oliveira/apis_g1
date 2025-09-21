import React, { useEffect, useState } from "react";
import api from "../../services/api";
import { Link } from "react-router-dom";

export default function ListarUsuarios() {
  const [usuarios, setUsuarios] = useState([]);

  useEffect(() => {
    api.get("/usuarios")
      .then(res => setUsuarios(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="container">
      <h3>Usuários</h3>
      <div className="list-group">
        {usuarios.map(u => (
          <div className="list-group-item" key={u.id}>
            <div className="d-flex justify-content-between">
              <div>
                <strong>{u.nome}</strong><br />
                <small>{u.email}</small>
              </div>
              <div>
                <Link className="btn btn-sm btn-outline-primary me-2" to={`/usuarios/atualizar/${u.id}`}>Editar</Link>
                <Link className="btn btn-sm btn-danger" to={`/usuarios/deletar/${u.id}`}>Excluir</Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
