const express = require('express');
const bcrypt = require('bcrypt');
const { authMiddleware, authorizeRoles } = require('../middleware/auth');
const usuariosStore = require('../store/usuariosStore');

const router = express.Router();

// Listar usuários (admin)
router.get('/', authMiddleware, authorizeRoles(['admin']), (req, res) => {
  res.json(usuariosStore.findAll());
});

// Buscar usuário por ID (admin ou o próprio)
router.get('/:id', authMiddleware, (req, res) => {
  const { id } = req.params;
  if (req.user.role !== "admin" && req.user.id !== Number(id)) {
    return res.status(403).json({ message: "Acesso negado" });
  }
  const usuario = usuariosStore.findById(id);
  if (!usuario) return res.status(404).json({ message: "Usuário não encontrado" });
  res.json(usuario);
});

// Criar usuário
router.post('/', async (req, res) => {
  const { nome, email, senha, role } = req.body;
  if (!nome || !email || !senha) return res.status(400).json({ message: "Dados incompletos" });
  if (usuariosStore.findByEmail(email)) return res.status(409).json({ message: "Email já cadastrado" });

  const hashed = await bcrypt.hash(senha, 10);
  const novoUsuario = usuariosStore.create({ nome, email, senha: hashed, role });
  res.status(201).json(novoUsuario);
});

// Atualizar usuário (admin ou próprio)
router.put('/:id', authMiddleware, async (req, res) => {
  const { id } = req.params;
  if (req.user.role !== "admin" && req.user.id !== Number(id)) {
    return res.status(403).json({ message: "Acesso negado" });
  }
  let { nome, email, senha, role } = req.body;
  if (senha) senha = await bcrypt.hash(senha, 10);
  const atualizado = usuariosStore.update(id, { nome, email, senha, role });
  if (!atualizado) return res.status(404).json({ message: "Usuário não encontrado" });
  res.json(atualizado);
});

// Excluir usuário (admin)
router.delete('/:id', authMiddleware, authorizeRoles(['admin']), (req, res) => {
  const { id } = req.params;
  if (!usuariosStore.remove(id)) return res.status(404).json({ message: "Usuário não encontrado" });
  res.json({ message: "Usuário excluído" });
});

module.exports = router;
