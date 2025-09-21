import React from "react";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="container">
      <div className="p-4 bg-white card">
        <h1>LojaG1</h1>
        <p className="lead">Bem-vindo ao e-commerce da disciplina de Desenvolvimento Full Stack II — navegue pelos produtos ou entre com sua conta.</p>
        <hr />
        <Link className="btn btn-primary me-2" to="/produtos/listar">Ver Produtos</Link>
      </div>
    </div>
  );
}
