const express = require('express');
const { productRouter, salesRouter } = require('./routes'); 

// const connection = require('./models/connection');

const app = express();

app.use(express.json());

app.use('/products', productRouter);
app.use('/sales', salesRouter);

// não remova esse endpoint, é para o avaliador funcionar
app.get('/', (_request, response) => {
  response.json({ status: 'Store Manager UP!' });
});
module.exports = app;
// Trouxe meu projeto da T.30, pude usar parte dele, fiz os testes com ajuda de colegas.
// Troquei o nome de algumas constantes e funções, para deixar mais padrão, processo feito por sugestão de colegas.