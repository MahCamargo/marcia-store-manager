const { serviceProducts } = require('../services');
const mapStatusCode = require('../utils/mapStatusCode');

const findById = async (req, res) => {
  const { id } = req.params;
  const product = await serviceProducts.findById(id);
  const statusCode = mapStatusCode(product.status);
  return res.status(statusCode).json(product.data);
};

const findAll = async (_req, res) => {
  const { status, data } = await serviceProducts.findAll();
 
  return res.status(status).json(data);
};

 const insertProduct = async (req, res) => {
    const product = req.body;

   const { status, data } = await serviceProducts.insertProduct(product);
   const statusCode = mapStatusCode(status);

   res.status(statusCode).json(data);
 };

 const updateProduct = async (req, res) => {
   const { name } = req.body;
  const { id } = req.params;

   const { status, data } = await serviceProducts.updateProduct(id, name);
   const statusCode = mapStatusCode(status);
 res.status(statusCode).json(data);
 }; 

 const remover = async (req, res) => {
  const { id } = req.params;

  const { status, data } = await serviceProducts.remover(id);

  return res.status(mapStatusCode(status)).json(data);
};
module.exports = {
  findAll,
  findById,
  insertProduct,
  updateProduct,
  remover,
};