import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../../services/api";

export default function DeletarUsuario() {
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (!window.confirm("Confirma exclusão do usuário?")) {
      navigate("/admin/usuarios");
      return;
    }
    api.delete(`/usuarios/${id}`)
      .then(() => {
        alert("Excluído");
        navigate("/admin/usuarios");
      })
      .catch(() => {
        alert("Erro");
        navigate("/admin/usuarios");
      });
  }, [id, navigate]);

  return <div className="container"><div className="card p-4">Excluindo...</div></div>;
}
