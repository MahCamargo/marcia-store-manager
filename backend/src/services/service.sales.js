const { modelSales } = require('../models/model.sales');
// const productsModel = require('../models/product.model');

const findAll = async () => {
  const salesAll = await modelSales.findAll();
 // testei com if e quebrou, procurar erro
  // if (!salesAll) { return { status: 500, data: { message: 'Server Error' } }; 

  return { status: '200', data: salesAll };
};

const findById = async (id) => {
  const saleId = await modelSales.findById(id);

 if (!saleId || saleId.length === 0) {
  return { status: '404', data: { message: 'Sale not found' } };
 }

  return { status: '200', data: saleId };
};

const insertSales = async (products) => {
  const result = await modelSales.insertSales(products);
  return { status: '201', data: result };
};

module.exports = {
  findAll,
  findById,
  insertSales,
};