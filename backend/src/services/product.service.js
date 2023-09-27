const { modelProducts } = require('../models');

const findAll = async () => {
  const product = await modelProducts.findAll();
  return { status: 200, data: product };
};

const findById = async (id) => {
  const product = await modelProducts.findById(id);
  if (!product) {
    return { status: 'NOT_FOUND', data: { message: 'Product not found' } };
  }

  return { status: 'SUCCESSFUL', data: product }; 
};
 const insertProduct = async (product) => {
  const { name } = product;
  const result = await modelProducts.insertProduct(name);

  return { status: 'CREATED', data: { id: result, name } };
};

const updateProduct = async (id, name) => {
  const productId = await modelProducts.findById(id);
  if (!productId) {
    const notFoundResponse = { status: 'NOT_FOUND', data: { message: 'Product not found' },
    };
    return notFoundResponse;
  }

  const product = await modelProducts.updateProduct(+id, name);
  const successResponse = { status: 'SUCCESSFUL', data: product };
  return successResponse;
};
const remover = async (id) => {
  // const product = await modelProducts.modelProducts.findById(id);
  //   if (!product) {  
  //   return { status: 'NOT_FOUND', data: { message: 'Product not found' } };
  // }
  await modelProducts.remover(id);
  return { status: 'DELETED' };
}; 
 module.exports = {
  findAll,
  findById,
  insertProduct,
  updateProduct, 
  remover,
};