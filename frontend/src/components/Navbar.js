import React, { useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export default function Navbar() {
  const { user, logout } = useContext(AuthContext);

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary mb-4">
      <div className="container">
        <Link className="navbar-brand" to="/">LojaG1</Link>

        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navMenu" aria-controls="navMenu" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon" />
        </button>

        <div className="collapse navbar-collapse" id="navMenu">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <NavLink className="nav-link" to="/produtos/listar">Produtos</NavLink>
            </li>
            {user && user.role === "admin" && (
              <>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/admin/produtos">Gerenciar Produtos</NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/admin/usuarios">Gerenciar Usuários</NavLink>
                </li>
              </>
            )}
          </ul>

          <ul className="navbar-nav ms-auto">
            {!user && (
              <>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/login">Login</NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/register">Registrar</NavLink>
                </li>
              </>
            )}

            {user && (
              <>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/perfil">Olá, {user.nome}</NavLink>
                </li>
                <li className="nav-item">
                  <button className="btn btn-outline-light btn-sm" onClick={logout}>Sair</button>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}
