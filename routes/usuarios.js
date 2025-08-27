const express = require('express');
const router = express.Router();
let usuarios = require('../data/usuarios');

// Listar usuários
router.get('/', (req, res) => {
  res.json(usuarios);
});

// Buscar usuário por ID
router.get('/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const usuario = usuarios.find(u => u.id === id);
  if (!usuario) return res.status(404).json({ erro: "Usuário não encontrado" });
  res.json(usuario);
});

// Criar usuário
router.post('/', (req, res) => {
  const { nome, senha, tipo } = req.body;
  const novoUsuario = { id: usuarios.length + 1, nome, senha, tipo: tipo || "cliente" };
  usuarios.push(novoUsuario);
  res.status(201).json(novoUsuario);
});

// Atualizar usuário
router.put('/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const usuario = usuarios.find(u => u.id === id);
  if (!usuario) return res.status(404).json({ erro: "Usuário não encontrado" });

  usuario.nome = req.body.nome ?? usuario.nome;
  usuario.senha = req.body.senha ?? usuario.senha;
  usuario.tipo = req.body.tipo ?? usuario.tipo;

  res.json(usuario);
});

// Excluir usuário
router.delete('/:id', (req, res) => {
  const id = parseInt(req.params.id);
  usuarios = usuarios.filter(u => u.id !== id);
  res.status(204).send();
});

module.exports = router;
