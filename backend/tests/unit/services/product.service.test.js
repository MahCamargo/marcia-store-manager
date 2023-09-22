const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

const { expect } = chai;

chai.use(sinonChai);

const { serviceProducts: { findAll, findById } } = require('../../../src/services');  
const { modelProducts } = require('../../../src/models');

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

  /* it(' testa oinsertProduct', async function () {
    const mockProduct = { name: 'New Product' };
    const mockInsertResult = 123; // colocar ID

    sinon.stub(modelProducts, 'insertProduct').resolves(mockInsertResult);

    const result = await insertProduct(mockProduct);
    expect(result).to.deep.equal({ status: '201', data: { id: mockInsertResult, name: 'New Product' } });
  });

  it('deveria testar updateProduct', async function () {
    const mockProductId = 1;
    const mockNewName = 'Updated Product';
    const mockUpdatedProduct = { id: mockProductId, name: mockNewName };

    sinon.stub(modelProducts, 'findById').resolves(mockProductId);
    sinon.stub(modelProducts, 'updateProduct').resolves(mockUpdatedProduct);

    const result = await updateProduct(mockProductId, mockNewName);
    expect(result).to.deep.equal({ status: '200', data: mockUpdatedProduct });
  });

  it(' testa updateProduct quando o produto não for encontrado', async function () {
    const mockProductId = 1;
    sinon.stub(modelProducts, 'findById').resolves(null);

    const result = await updateProduct(mockProductId, 'Updated Product');
    expect(result).to.deep.equal({ status: '404', data: { message: 'Product not found' } });
  }); */
});