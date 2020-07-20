const app = require('./src/config/custom-express');

module.exports = app.listen(3001, () => console.log('servidor rodando na porta 3001'));
