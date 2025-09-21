const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || "segredo_super_seguranca";

function authMiddleware(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ message: "Token não fornecido" });

  const [scheme, token] = authHeader.split(" ");
  if (scheme !== "Bearer" || !token) return res.status(401).json({ message: "Token inválido" });

  try {
    const payload = jwt.verify(token, JWT_SECRET);
    req.user = payload;
    next();
  } catch {
    return res.status(401).json({ message: "Token inválido ou expirado" });
  }
}

function authorizeRoles(allowedRoles = []) {
  return (req, res, next) => {
    if (!req.user) return res.status(401).json({ message: "Não autenticado" });
    if (!allowedRoles.includes(req.user.role)) return res.status(403).json({ message: "Acesso negado" });
    next();
  };
}

module.exports = { authMiddleware, authorizeRoles, JWT_SECRET };
