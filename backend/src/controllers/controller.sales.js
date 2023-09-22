const { serviceSales } = require('../services');
const mapStatusCode = require('../utils/mapStatusCode');

const findAll = async (req, res) => {
  const { status, data } = await serviceSales.findAll();

  return res.status(mapStatusCode(status)).json(data);
};

const findById = async (req, res) => {
const { id } = req.params;
  const { status, data } = await serviceSales.findById(id);

  return res.status(mapStatusCode(status)).json(data);
};

const insertSales = async (req, res) => {
  const products = req.body;
  const { status, data } = await serviceSales.insertSales(products);
  
  const statusCode = mapStatusCode(status);
  res.status(statusCode).json(data);
};
module.exports = {
  findAll,
  findById,
  insertSales,
};