const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;

const authRoutes = require('./routes/auth');
const usuariosRoutes = require('./routes/usuarios');
const produtosRoutes = require('./routes/produtos');

app.use(cors({
  origin: "http://localhost:3001"
}));
app.use(express.json());

// Rotas
app.use('/auth', authRoutes);
app.use('/usuarios', usuariosRoutes);
app.use('/produtos', produtosRoutes);

app.get('/', (req, res) => {
  res.send('API de E-commerce funcionando! 🚀');
});

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
