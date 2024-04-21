// middleware/authMiddleware.js

const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  // Получаем токен из заголовков запроса
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ success: false, message: 'Authorization token not provided' });
  }

  try {
    // Расшифровываем токен
    const decoded = jwt.verify(token, 'secret');
    
    // Извлекаем информацию о пользователе из расшифрованного токена
    const { username, type } = decoded;

    // Проверяем тип пользователя и разрешаем доступ только админам, менеджерам, официантам и поварам
    if (type === 'admin' || type === 'manager' || type === 'waiter' || type === 'cook') {
      // Пропускаем запрос дальше
      req.user = { username, type };
      next();
    } else {
      return res.status(403).json({ success: false, message: 'Access denied' });
    }
  } catch (error) {
    console.error('Authentication error:', error);
    return res.status(401).json({ success: false, message: 'Invalid token' });
  }
};

module.exports = authMiddleware;
