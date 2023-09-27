const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

const { expect } = chai;

chai.use(sinonChai);

const { serviceProducts: { findAll, findById } } = require('../../../src/services');  
const { modelProducts } = require('../../../src/models');
const { serviceProducts } = require('../../../src/services');

const { insertProduct, updateProduct } = serviceProducts;

describe('Testes para o módulo de serviços de produtos', function () {
  afterEach(function () {
    sinon.restore();
  });
  
  it(' testa o findAll', async function () {
    const mockProducts = [{ id: 1, name: 'Product 1' }];
    sinon.stub(modelProducts, 'findAll').resolves(mockProducts);
    const result = await findAll();
    expect(result).to.deep.equal({ status: 200, data: mockProducts });
  });

  it(' testa o findById', async function () {
    const mockProduct = { id: 1, name: 'Product 1' };
    sinon.stub(modelProducts, 'findById').resolves(mockProduct);

    const result = await findById(1);
    expect(result).to.deep.equal({ status: 'SUCCESSFUL', data: mockProduct });
  });

  it('deve testar findById quando o produto não for encontrado', async function () {
    sinon.stub(modelProducts, 'findById').resolves(null);

    const result = await findById(1);
    expect(result).to.deep.equal({ status: 'NOT_FOUND', data: { message: 'Product not found' } });
  });

  it('insertProduct should insert a product and return the created product', async function () {
  const product = { name: 'Test Product' };
  const insertedProductId = '1'; 
  const expectedResult = {
    status: 'CREATED',
    data: { id: insertedProductId, name: 'Test Product' },
  };
  const insertProductStub = sinon.stub(modelProducts, 'insertProduct');
  insertProductStub.withArgs(product.name).resolves(insertedProductId);

  const result = await insertProduct(product);
  expect(result).to.deep.equal(expectedResult);
  insertProductStub.restore();
});

it('deve atualizar um produto e devolver o produto atualizado', async function () {
  const productId = '1'; 
  const updatedProductName = 'Updated Test Product';
  const updatedProductData = { id: productId, name: updatedProductName };
  const expectedResult = {
    status: 'SUCCESSFUL',
    data: updatedProductData,
  };
  
  const findByIdStub = sinon.stub(modelProducts, 'findById');
  const updateProductStub = sinon.stub(modelProducts, 'updateProduct');
  findByIdStub.resolves(productId);
  updateProductStub.resolves(updatedProductData);
 
  const result = await updateProduct(productId, updatedProductName);

  expect(result).to.deep.equal(expectedResult);

  findByIdStub.restore();
  updateProductStub.restore();
});

it('deve retornar uma resposta se o produto não existir', async function () {
  const productId = '1'; 
  const updatedProductName = 'coca-cola 200ml';
  const expectedResult = {
    status: 'NOT_FOUND',
    data: { message: 'Product not found' },
  };

  const findByIdStub = sinon.stub(modelProducts, 'findById');
  findByIdStub.withArgs(productId).resolves(null);
 
  const result = await updateProduct(productId, updatedProductName);
  expect(result).to.deep.equal(expectedResult);
  findByIdStub.restore();
});
});