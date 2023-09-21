const productsModel = require('../models/products.model');

const findAll = async () => {
  const product = await productsModel.findAll();
  return { status: 200, data: product };
};

const findById = async (id) => {
  const product = await productsModel.findById(id);
  if (!product) {
    return { status: '404', data: { message: 'Product not found' } };
  }

  return { statust: 'SUCCESSFUL', data: product }; // colocando o retorno certo
};
const insertProduct = async (product) => {
  const { name } = product;
  const result = await productsModel.insertProduct(name);

  return { status: '201', data: { id: result, name } };
};

const updateProduct = async (id, name) => {
  const productId = await productsModel.findById(id);
  if (!productId) {
    const notFoundResponse = { status: '404', data: { message: 'Product not found' },
    };
    return notFoundResponse;
  }

  const product = await productsModel.updateProduct(id, name);
  const successResponse = { status: '200', data: product };
  return successResponse;
};
 module.exports = {
  findAll,
  findById,
  insertProduct,
  updateProduct,
};