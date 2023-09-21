const route = require('express').Router();
const productsController = require('../controllers/products.controller');

route.get('/', productsController.findAll);
route.get('/:id', productsController.findById);
route.post('/', productsController.insertProduct); // rever essa rota
route.put('/:id', productsController.updateProduct);

module.exports = route;