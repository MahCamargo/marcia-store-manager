const route = require('express').Router();

const { controllerSales } = require('../controllers');
const { validateQuantity, validateProductExistence } = require('../middlewares/sales');

route.get('/', controllerSales.findAll);
route.get('/:id', controllerSales.findById);
route.post('/', validateQuantity, validateProductExistence, controllerSales.insertSales);

module.exports = route;