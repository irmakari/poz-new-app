const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    // Demo / test amaçlı header yoksa varsayılan test kullanıcısı ata
    req.user = { id: '00000000-0000-0000-0000-000000000001', email: 'demo@pozapp.com', username: 'analog_lover' };
    return next();
  }

  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'poz_app_secret');
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ success: false, error: 'Geçersiz veya süresi dolmuş token' });
  }
};

module.exports = authMiddleware;
