const chai = require('chai');
const chaiHttp = require('chai-http');
const sinon = require('sinon');
const connection = require('../../../src/models/connection');
const app = require('../../../src/app');

chai.use(chaiHttp);
const { expect } = chai;
describe('testando a funcionalidade das rotas referente a product', function () {
    afterEach(function () {
        sinon.restore();
    });
    it('testando rota get /products', async function () {
        const returnedProduct = [{ name: 'martelo de Thor', id: 1 }, { id: 2, name: 'machado StormBraker' }];
        sinon.stub(connection, 'execute').resolves([returnedProduct]);
        const { status, body } = await chai.request(app).get('/products');
        expect(status).to.be.equal(200);
        expect(body).to.be.deep.equal(returnedProduct);
    });
    it('testando rota get /product/:id', async function () {
        const returnedProduct = [{ id: 2, name: 'machado StormBraker' }];
        sinon.stub(connection, 'execute').resolves([returnedProduct]);
        const { status, body } = await chai.request(app).get('/products/1');
        expect(status).to.be.equal(200);
        expect(body).to.be.deep.equal(returnedProduct[0]);
    });
    it('testando rota get /product/:id com um id inválido', async function () {
        const returnedProduct = [];
        sinon.stub(connection, 'execute').resolves([returnedProduct]);
        const { status, body } = await chai.request(app).get('/products/999');
        expect(status).to.be.equal(404);
        expect(body).to.be.deep.equal({ message: 'Product not found' });
    });
});