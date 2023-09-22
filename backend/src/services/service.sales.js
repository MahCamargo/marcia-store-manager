const { modelSales } = require('../models');
// const productsModel = require('../models/product.model');

const findAll = async () => {
  const salesAll = await modelSales.findAll();
 // testei com if e quebrou, procurar erro
  // if (!salesAll) { return { status: 500, data: { message: 'Server Error' } }; 

  return { status: 'SUCCESSFUL', data: salesAll };
};

const findById = async (id) => {
  const saleId = await modelSales.findById(id);

 if (!saleId || saleId.length === 0) {
  return { status: 'NOT_FOUND', data: { message: 'Sale not found' } };
 }

  return { status: 'SUCCESSFUL', data: saleId };
};

const insertSales = async (products) => {
  const result = await modelSales.insertSales(products);
  return { status: 'CREATED', 
  data: {
    id: result,
    itemsSold: products,
  } };
};

module.exports = {
  findAll,
  findById,
  insertSales,
};