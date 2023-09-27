const route = require('express').Router();
const { controllerProducts } = require('../controllers');
const { validateProductExistence } = require('../middlewares/sales');
const validation = require('../middlewares/validation');

route.get('/', controllerProducts.findAll);
route.get('/:id', controllerProducts.findById);
route.post('/', validation, controllerProducts.insertProduct); 
route.put(
  '/:id', 
  validateProductExistence,
  validation,
controllerProducts.updateProduct,
);
route.delete('/:id', validateProductExistence, controllerProducts.remover);

module.exports = route;