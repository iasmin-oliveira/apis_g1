const express = require('express');
const { authMiddleware, authorizeRoles } = require('../middleware/auth');

const router = express.Router();

let produtos = [];
let lastId = 0;

// listar (público)
router.get('/', (req, res) => res.json(produtos));

// buscar por id (público)
router.get('/:id', (req, res) => {
  const p = produtos.find(x => x.id === Number(req.params.id));
  if (!p) return res.status(404).json({ message: "Produto não encontrado" });
  res.json(p);
});

// criar (admin)
router.post('/', authMiddleware, authorizeRoles(['admin']), (req, res) => {
  const { nome, preco, descricao } = req.body;
  const novo = { id: ++lastId, nome, preco, descricao };
  produtos.push(novo);
  res.status(201).json(novo);
});

// atualizar (admin)
router.put('/:id', authMiddleware, authorizeRoles(['admin']), (req, res) => {
  const idx = produtos.findIndex(x => x.id === Number(req.params.id));
  if (idx === -1) return res.status(404).json({ message: "Produto não encontrado" });
  Object.assign(produtos[idx], req.body);
  res.json(produtos[idx]);
});

// deletar (admin)
router.delete('/:id', authMiddleware, authorizeRoles(['admin']), (req, res) => {
  const idx = produtos.findIndex(x => x.id === Number(req.params.id));
  if (idx === -1) return res.status(404).json({ message: "Produto não encontrado" });
  produtos.splice(idx, 1);
  res.json({ message: "Produto excluído" });
});

module.exports = router;
