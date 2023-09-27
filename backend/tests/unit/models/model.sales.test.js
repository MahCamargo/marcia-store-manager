// const chai = require('chai');
// const { expect } = require('chai');
// const sinon = require('sinon');
// const sinonChai = require('sinon-chai');
// const connection = require('../../../src/models/connection');

// chai.use(sinonChai);

// const {
//   modelSales: {
//     findAll,
//     findById,
//     insertSales,
//   },
// } = require('../../../src/models');
 
// // const mockProducts = [{ id: 1, name: 'Product 1' }];

// describe('findAll', function () {
//   it('deve retornar todas as vendas existentes', async function () {
//     const queryResult = [{ sale: 1, 
//       product: 1, 
//       date: '2023-09-26',
//        quantity: 5 }];
//     sinon.stub(connection, 'execute').resolves(queryResult);

//     const result = await findAll();

//     expect(connection.execute).to.have.been.calledWithMatch(sinon.match.string);

//     expect(result).to.deep.equal(queryResult);
//   });
  
//   describe('findById', function () {
//     it('deve retornar uma venda pelo ID se encontrada', async function () {
//      const queryResult = [{ product: 1, date: '2021-09-09T04:54:54.000Z', quantity: 5 }];

//      connection.execute.resolves([queryResult]);
//      const result = await findById(1);
//      expect(connection.execute).to.have.been.calledWithMatch(sinon.match.string, [1]);
//      expect(result).to.deep.equal(queryResult);
//     });
     
//      it('deve retornar nulo se a venda não for encontrada', async function () {
//      const saleId = 1;
//      connection.execute.resolves([]);
//      const result = await findById(saleId);
//      expect(connection.execute).to.have.been.calledWithMatch(sinon.match.string, [saleId]);
//      expect(result).to.be.null();
//     });
//   });
  
//   describe('insertSales', function () {
//     it('deve inserir uma venda com produtos', async function () {
//       const insertResult = { insertId: 1 }; // ID de exemplo
//       connection.execute.onFirstCall().resolves([insertResult]);
      
//       const products = [{ productId: 1, quantity: 5 }];
//       const result = await insertSales(products);
      
//       expect(connection.execute).to.have.been.calledWithMatch(sinon.match.string);
//       expect(connection.execute).to.have.been.calledWithMatch(sinon.match.string, [1, 1, 5]);
      
//       expect(result).to.deep.equal(insertResult.insertId);
//     });
    
//     it('deve lidar com erros durante a inserção', async function () {
//   connection.execute.onFirstCall().rejects(new Error('Erro de inserção'));
  
//      const products = [{ productId: 1, quantity: 5 }];     
//      const result = await insertSales(products);
     
//      expect(connection.execute).to.have.been.calledWithMatch(sinon.match.string);
//      expect(connection.execute).to.have.been.calledWithMatch(sinon.match.string, [1, 1, 5]);
   
//      expect(result).to.deep.equal({ status: 'ERROR', message: 'Erro de inserção' });
//     });
//   });
//   afterEach(function () {
//     sinon.restore();
//   });
// });
