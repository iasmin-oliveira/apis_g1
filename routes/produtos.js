const express = require('express');
const router = express.Router();
let produtos = require('../data/produtos');

// Listar todos os produtos
router.get('/', (req, res) => {
  res.json(produtos);
});

// Buscar produto por ID
router.get('/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const produto = produtos.find(p => p.id === id);
  if (!produto) return res.status(404).json({ erro: "Produto não encontrado" });
  res.json(produto);
});

// Criar produto
router.post('/', (req, res) => {
  const { nome, valor, quantidade } = req.body;
  const novoProduto = { id: produtos.length + 1, nome, valor, quantidade };
  produtos.push(novoProduto);
  res.status(201).json(novoProduto);
});

// Atualizar produto
router.put('/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const produto = produtos.find(p => p.id === id);
  if (!produto) return res.status(404).json({ erro: "Produto não encontrado" });

  produto.nome = req.body.nome ?? produto.nome;
  produto.valor = req.body.valor ?? produto.valor;
  produto.quantidade = req.body.quantidade ?? produto.quantidade;

  res.json(produto);
});

// Excluir produto
router.delete('/:id', (req, res) => {
  const id = parseInt(req.params.id);
  produtos = produtos.filter(p => p.id !== id);
  res.status(204).send();
});

module.exports = router;
