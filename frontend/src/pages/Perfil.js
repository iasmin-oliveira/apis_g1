import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export default function Perfil() {
  const { user } = useContext(AuthContext);
  if (!user) return null;

  return (
    <div className="container">
      <div className="card p-4">
        <h3>Meu Perfil</h3>
        <p><strong>Nome:</strong> {user.nome}</p>
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>Role:</strong> {user.role}</p>
      </div>
    </div>
  );
}
