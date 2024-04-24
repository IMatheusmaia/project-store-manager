const chai = require('chai');
const { expect } = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const { allSales, saleIdResponse, saleReq } = require('../mocks/sales.mock');
const { salesServices } = require('../../../src/services');
const { salesController } = require('../../../src/controllers');
const { salesModel } = require('../../../src/models');

chai.use(sinonChai);

describe('Testa as funcionalidades da camada controller para rota de sales', function () {
  it('testa a resposta do controller para listagem de todos os sales', async function () {
    const serviceSaleReturn = { status: 'SUCCESSFUL', data: allSales };

    sinon.stub(salesServices, 'getAll').resolves(serviceSaleReturn);

    const req = {};
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };

    await salesController.getAllSales(req, res);

    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith(allSales);
  });

  it('testa a resposta do controller para listagem de todos os sales no caso de erro', async function () {
    const serviceSaleReturnError = { status: 'NOT_FOUND', data: { message: 'Sales not found' } };

    sinon.stub(salesServices, 'getAll').resolves(serviceSaleReturnError);

    const req = {};
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };

    await salesController.getAllSales(req, res);

    expect(res.status).to.have.been.calledWith(404);
    expect(res.json).to.have.been.calledWith({ message: 'Sales not found' });
  });

  it('testa a resposta do controller para listagem de um sale pelo id', async function () {
    const serviceSaleIdReturn = { status: 'SUCCESSFUL', data: saleIdResponse };

    sinon.stub(salesServices, 'findById').resolves(serviceSaleIdReturn);

    const req = { params: 2 };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };

    await salesController.getSaleById(req, res);

    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.calledWith(saleIdResponse);
  });

  it('testa a resposta do controller para listagem de um sale pelo id no caso de erro', async function () {
    const serviceSaleIdReturnError = { status: 'NOT_FOUND', data: { message: 'Sale not found' } };

    sinon.stub(salesServices, 'findById').resolves(serviceSaleIdReturnError);

    const req = { params: 2 };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };

    await salesController.getSaleById(req, res);

    expect(res.status).to.have.been.calledWith(404);
    expect(res.json).to.have.calledWith({ message: 'Sale not found' });
  });

  it('testa a resposta do controller para o cadastramento de novas vendas no caso de sucesso', async function () {
    sinon.stub(salesModel, 'insert').resolves();
    sinon.stub(salesModel, 'saleId').resolves(4);
    sinon.stub(salesServices, 'insert').resolves({ status: 'CREATED', data: { id: 4, itemsSold: saleReq } });

    const req = { body: saleReq };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };

    await salesController.insertNewSale(req, res);

    expect(res.status).to.have.been.calledWith(201);
    expect(res.json).to.have.been.calledWith({ id: 4, itemsSold: saleReq });
  });

  it('testa a resposta do controller para o cadastramento de novas vendas no caso de erro', async function () {
    sinon.stub(salesModel, 'insert').resolves();
    sinon.stub(salesModel, 'saleId').resolves(4);
    sinon.stub(salesServices, 'insert').resolves({ status: 'NOT_FOUND', data: { message: 'Product not exists' } });

    const req = { body: saleReq };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };

    await salesController.insertNewSale(req, res);

    expect(res.status).to.have.been.calledWith(500);
    expect(res.json).to.have.been.calledWith({ message: 'Product not exists' });
  });

  afterEach(function () {
    sinon.restore();
  });
});