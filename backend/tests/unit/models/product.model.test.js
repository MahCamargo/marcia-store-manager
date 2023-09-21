const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const camelize = require('camelize');
const connection = require('../../../src/models/connection');
const { findAll, findById } = require('../../../src/models'); 
const { allProducts } = require('../../mocks/products.mocks');

chai.use(sinonChai);

const { expect } = chai;

describe('models', function () {
  describe('findAll', function () {
    it('deve retornar todos os produtos da base de dados', async function () {
      const executeStub = sinon.stub(connection, 'execute').resolves([allProducts]);

      const result = await findAll();

      // Verifique se o stub foi chamado com a consulta correta
      expect(executeStub).to.have.been.calledWith('SELECT * FROM products WHERE id');

            expect(result).to.deep.equal(camelize(allProducts));

          executeStub.restore();
    });
  });

//   describe('findById', function () {
//     it('deve retornar um produto específico da base de dados', async function () {
//       const productId = 123; 
//       const productData = [{ }];

//           const executeStub = sinon.stub(connection, 'execute').resolves([productData]);

//       const result = await findById(productId);

//             expect(executeStub).to.have.been.calledWith('SELECT * FROM products WHERE id = ?', [productId]);

//       expect(result).to.deep.equal(camelize(productData[0]));

//       executeStub.restore();
//     });
//   });
});