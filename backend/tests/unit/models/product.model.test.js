const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const camelize = require('camelize');
const connection = require('../../../src/models/connection');
const { modelProducts: { findAll, findById, insertProduct, updateProduct, remover } } = require('../../../src/models'); 
const { allProducts } = require('../../mocks/mocks.products');

chai.use(sinonChai);

const { expect } = chai;

describe('models', function () {
  describe('findAll', function () {
    it('deve retornar todos os produtos da base de dados', async function () {
      const executeStub = sinon.stub(connection, 'execute').resolves([allProducts]);

      const result = await findAll();
      expect(executeStub).to.have.been.calledWith('SELECT * FROM products');
      expect(result).to.deep.equal(camelize(allProducts));
      executeStub.restore();
    });
  });

   describe('findById', function () {
  it('deve retornar um produto específico da base de dados', async function () {
      const productId = 1; 
      const productData = [{
        id: 1,
        name: 'Martelo de Thor',
      }];
      const executeStub = sinon.stub(connection, 'execute').resolves([productData]);
      const result = await findById(productId);

      expect(executeStub).to.have.been.calledWith('SELECT * FROM products WHERE id = ?', [productId]);

      expect(result).to.deep.equal(camelize(productData[0]));
      });
    });
    it('deve inserir um produto e retornar o insertId', async function () {
      const productName = 'New Product';
      sinon.stub(connection, 'execute').resolves([{ insertId: 1 }]);

      const insertId = await insertProduct(productName);
    
      expect(connection.execute).to.have.been.calledWith('INSERT INTO products (name) VALUES (?)', [productName]);
      expect(insertId).to.be.equal(1);
    });
    
    it('deve atualizar um produto e devolver o produto atualizado', async function () {
      const id = 1;
      const nameToUpdate = 'Updated Product';
      sinon.stub(connection, 'execute').resolves([]);
      const updatedProduct = await updateProduct(id, nameToUpdate);
      expect(connection.execute).to.have.been.calledWith('UPDATE products SET name = ? WHERE id = ?', [nameToUpdate, id]);
      expect(updatedProduct).to.be.deep.equal({ id, name: nameToUpdate });
    });
    afterEach(function () {
      sinon.restore();
    });
    it('deve executar a query correta ao tentar deletar um produto', async function () {
      const query = 'DELETE FROM products WHERE id = ?';
      const id = 1;
      sinon.stub(connection, 'execute').resolves();
      await remover(id);
      expect(connection.execute).to.have.been.calledWith(query, [id]);
    });
});
