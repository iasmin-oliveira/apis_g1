import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Navbar from "./components/Navbar";
import PrivateRoute from "./components/PrivateRoute";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Perfil from "./pages/Perfil";

// produtos
import ListarProdutos from "./pages/produtos/ListarProdutos";
import CriarProduto from "./pages/produtos/CriarProduto";
import AtualizarProduto from "./pages/produtos/AtualizarProduto";
import DeletarProduto from "./pages/produtos/DeletarProduto";

// usuarios
import ListarUsuarios from "./pages/usuarios/ListarUsuarios";
import CriarUsuario from "./pages/usuarios/CriarUsuario";
import AtualizarUsuario from "./pages/usuarios/AtualizarUsuario";
import DeletarUsuario from "./pages/usuarios/DeletarUsuario";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <div className="py-3">
          <Routes>
            {/* público */}
            <Route path="/" element={<Home />} />
            <Route path="/produtos/listar" element={<ListarProdutos />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            {/* perfil - user ou admin */}
            <Route path="/perfil" element={<PrivateRoute roles={['user','admin']}><Perfil /></PrivateRoute>} />

            {/* admin: gerenciar */}
            <Route path="/admin/produtos" element={<PrivateRoute roles={['admin']}><ListarProdutos /></PrivateRoute>} />
            <Route path="/admin/produtos/criar" element={<PrivateRoute roles={['admin']}><CriarProduto /></PrivateRoute>} />
            <Route path="/produtos/criar" element={<PrivateRoute roles={['admin']}><CriarProduto /></PrivateRoute>} />
            <Route path="/produtos/atualizar/:id" element={<PrivateRoute roles={['admin']}><AtualizarProduto /></PrivateRoute>} />
            <Route path="/produtos/deletar/:id" element={<PrivateRoute roles={['admin']}><DeletarProduto /></PrivateRoute>} />

            <Route path="/admin/usuarios" element={<PrivateRoute roles={['admin']}><ListarUsuarios /></PrivateRoute>} />
            <Route path="/usuarios/criar" element={<PrivateRoute roles={['admin']}><CriarUsuario /></PrivateRoute>} />
            <Route path="/usuarios/atualizar/:id" element={<PrivateRoute roles={['admin']}><AtualizarUsuario /></PrivateRoute>} />
            <Route path="/usuarios/deletar/:id" element={<PrivateRoute roles={['admin']}><DeletarUsuario /></PrivateRoute>} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
