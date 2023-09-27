const chai = require('chai');
const chaiHttp = require('chai-http');
const sinon = require('sinon');
const connection = require('../../../src/models/connection');
const app = require('../../../src/app');

chai.use(chaiHttp);
const { expect } = chai;
describe('testando a funcionalidade das rotas referente a sales', function () {
    afterEach(function () {
        sinon.restore();
    });
    it('testando rota get /sales', async function () {
        const returnedSales = [{ saleId: 1, itemsSold: [{ productId: 1, quantity: 15 }] }];
        sinon.stub(connection, 'execute').resolves([returnedSales]);
        const { status, body } = await chai.request(app).get('/sales');
        expect(status).to.be.equal(200);
        expect(body).to.be.deep.equal(returnedSales);
    });
    it('testando rota get /sales/:id', async function () {
        const returnedSales = [{ date: '2023-09-27', productId: 1, quantity: 15 }, { date: '2023-09-27', productId: 2, quantity: 3 }];
        sinon.stub(connection, 'execute').resolves([returnedSales]);
        const { status, body } = await chai.request(app).get('/sales/1');
        expect(status).to.be.equal(200);
        expect(body).to.be.deep.equal(returnedSales);
    });
    it('testando rota get /sales/:id com um id inválido', async function () {
        const returnedSales = [];
        sinon.stub(connection, 'execute').resolves([returnedSales]);
        const { status, body } = await chai.request(app).get('/sales/999');
        expect(status).to.be.equal(404);
        expect(body).to.be.deep.equal({ message: 'Sale not found' });
    });
    describe('testando middlewares da rota post /sales', function () {
        it('productId is required', async function () {
          const { status, body } = await chai.request(app).post('/sales').send([{ quantity: 5 }, { quantity: 3 }]);
          expect(status).to.be.equal(400);
          expect(body).to.be.deep.equal({ message: '"productId" is required' });
        });
        it('quantity is required', async function () {
            const { status, body } = await chai.request(app).post('/sales').send([{ productId: 1 }, { productId: 3 }]);
            expect(status).to.be.equal(400);
            expect(body).to.be.deep.equal({ message: '"quantity" is required' });
        });
        it('quantity must be greater than or equal to 1', async function () {
            const { status, body } = await chai.request(app).post('/sales').send([{ productId: 1, quantity: 0 }, { productId: 3, quantity: 15 }]);
            expect(status).to.be.equal(422);
            expect(body).to.be.deep.equal({ message: '"quantity" must be greater than or equal to 1' });
        });
        it('Product not found', async function () {
            sinon.stub(connection, 'execute').onFirstCall().resolves([[]]).onSecondCall()
            .resolves([[{ name: 'martelo de Thor', id: 3 }]]);
            const { status, body } = await chai.request(app).post('/sales').send([{ productId: 999, quantity: 10 }, { productId: 3, quantity: 5 }]);
            expect(status).to.be.equal(404);
            expect(body).to.be.deep.equal({ message: 'Product not found' });
        });
      });
      it('testando criar uma venda com sucesso rota post /sales', async function () {
            sinon.stub(connection, 'execute')
            .onFirstCall().resolves([[{ name: 'martelo de Thor', id: 3 }]])
            .onSecondCall()
            .resolves([{ insertId: 1 }])
            .onThirdCall()
            .resolves();
            const { status, body } = await chai.request(app).post('/sales').send([{ productId: 3, quantity: 10 }]);
            expect(status).to.be.equal(201);
            expect(body).to.be.deep.equal({ id: 1, itemsSold: [{ productId: 3, quantity: 10 }] });
      });
});