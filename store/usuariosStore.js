let usuarios = [];
let lastId = 0;
const bcrypt = require('bcrypt');

(async function ensureAdmin() {
  if (usuarios.length === 0) {
    const hashed = await bcrypt.hash("admin123", 10);
    usuarios.push({ id: ++lastId, nome: "Admin", email: "admin@loja.com", senha: hashed, role: "admin" });//usuário para testes com admin
  }
})();

function findAll() {
  return usuarios.map(({ senha, ...rest }) => rest);
}

function findById(id) {
  const u = usuarios.find(x => x.id === Number(id));
  if (!u) return null;
  const { senha, ...rest } = u;
  return rest;
}

function findByEmail(email) {
  return usuarios.find(u => u.email === email);
}

function create({ nome, email, senha, role }) {
  const novo = { id: ++lastId, nome, email, senha, role: role || "user" };
  usuarios.push(novo);
  const { senha: _, ...rest } = novo;
  return rest;
}

function update(id, { nome, email, senha, role }) {
  const idx = usuarios.findIndex(u => u.id === Number(id));
  if (idx === -1) return null;
  if (nome) usuarios[idx].nome = nome;
  if (email) usuarios[idx].email = email;
  if (senha) usuarios[idx].senha = senha;
  if (role) usuarios[idx].role = role;
  const { senha: _, ...rest } = usuarios[idx];
  return rest;
}

function remove(id) {
  const idx = usuarios.findIndex(u => u.id === Number(id));
  if (idx === -1) return false;
  usuarios.splice(idx, 1);
  return true;
}

module.exports = { findAll, findById, findByEmail, create, update, remove };
