// Middleware for token authentication
const JWT_SECRET = process.env.JWT_SECRET


function authenticateToken(req, res, next) {
    const token = req.headers['authorization'];
    if (!token) return res.status(401).send('Access denied');
  
    jwt.verify(token, JWT_SECRET, (error, decoded) => {
      if (error) return res.status(403).send('Invalid token');
      req.userId = decoded.userId;
      next();
    });
  }