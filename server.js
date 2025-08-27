const express = require('express');
const app = express();
const port = 3000;

const usuariosRoutes = require('./routes/usuarios');
const produtosRoutes = require('./routes/produtos');

app.use(express.json());

// Rotas
app.use('/usuarios', usuariosRoutes);
app.use('/produtos', produtosRoutes);

app.get('/', (req, res) => {
  res.send('API de E-commerce funcionando! 🚀');
});

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
