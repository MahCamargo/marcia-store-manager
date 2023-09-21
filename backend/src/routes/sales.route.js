const route = require('express').Router();

const { controllerSales } = require('../controllers/controller.sales');

route.get('/', controllerSales.findAll);
route.get('/:id', controllerSales.findAll);
route.post('/', controllerSales.insertProduct);

module.exports = route;