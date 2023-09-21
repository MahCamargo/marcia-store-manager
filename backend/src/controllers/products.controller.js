const productsService = require('../services/product.service');
const mapStatusCode = require('../utils/mapStatusCode');

const findById = async (req, res) => {
  const { id } = req.params;
  const product = await productsService.findById(id);
  const statusCode = mapStatusCode(product.status);
  return res.status(200).json(product.data);
};

const findAll = async (_req, res) => {
  const { status, data } = await productsService.findAll();
 
  return res.status(status).json(data);
};

const insertProduct = async (req, res) => {
    const product = req.body;

   const { status, data } = await productsService.insertProduct(product);
   const statusCode = mapStatusCode(status);

   res.status(statusCode).json(data);
 };

 const updateProduct = async (req, res) => {
   const { name } = req.body;
  const { id } = req.params;

   const { status, data } = await productsService.updateProduct(id, name);

 res.status(status).json(data);
 };

module.exports = {
  findAll,
  findById,
  insertProduct,
  updateProduct,
};