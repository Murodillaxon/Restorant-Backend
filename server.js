
const express = require('express');
const authMiddleware = require('./middleware/authMiddleware');

const app = express();

// Применяем middleware к защищенным маршрутам
app.use('/admin', authMiddleware);
app.use('/manager', authMiddleware);
app.use('/waiter', authMiddleware);
app.use('/cook', authMiddleware);

// Определение остальных маршрутов

app.listen(5000, () => {
  console.log('Server is running on port 5000');
});
