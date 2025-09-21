const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../middleware/auth');
const usuariosDB = require('../store/usuariosStore');

const router = express.Router();

// Registro
router.post('/register', async (req, res) => {
  const { nome, email, senha } = req.body;
  if (!nome || !email || !senha) return res.status(400).json({ message: "Preencha todos os campos" });

  if (usuariosDB.findByEmail(email)) return res.status(409).json({ message: "Email já cadastrado" });

  const hashed = await bcrypt.hash(senha, 10);
  const user = usuariosDB.create({ nome, email, senha: hashed, role: "user" });

  res.status(201).json(user);
});

// Login
router.post('/login', async (req, res) => {
  const { email, senha } = req.body;
  const user = usuariosDB.findByEmail(email);
  if (!user) return res.status(401).json({ message: "Credenciais inválidas" });

  const valid = await bcrypt.compare(senha, user.senha);
  if (!valid) return res.status(401).json({ message: "Credenciais inválidas" });

  const payload = { id: user.id, nome: user.nome, email: user.email, role: user.role };
  const token = jwt.sign(payload, JWT_SECRET, { expiresIn: "8h" });

  res.json({ token, user: payload });
});

module.exports = router;
