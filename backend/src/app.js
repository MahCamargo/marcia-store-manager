const express = require('express');
const productRouter = require('./routes/product.routes'); // não achei o erro

// const connection = require('./models/connection');

const app = express();

app.use('/products', productRouter);
app.use(express.json());

// não remova esse endpoint, é para o avaliador funcionar
app.get('/', (_request, response) => {
  response.json({ status: 'Store Manager UP!' });
});
module.exports = app;
// utilizando, refazendo PR 30
// verificar a desestruturação onde é feita, nas aulas estao  feitas no app
