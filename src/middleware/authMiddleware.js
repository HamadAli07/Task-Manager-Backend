const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  const raw = req.headers.authorization;
  if (!raw) return res.status(401).json({ msg: "No token" });

  const token = raw.startsWith('Bearer ') ? raw.slice(7).trim() : raw.trim();
  if (!token) return res.status(401).json({ msg: "No token" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch {
    res.status(401).json({ msg: "Invalid token" });
  }
};