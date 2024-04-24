const { expect } = require('chai');
const sinon = require('sinon');
const { allSales, saleIdResponse, saleReq,
} = require('../mocks/sales.mock');
const { salesServices } = require('../../../src/services');
const connection = require('../../../src/models/connection');
const { salesModel } = require('../../../src/models');

describe('Testa as funcionalidades da camada service para rota de sales', function () {
  it('Testa o objeto de retorno para listagem de todos os sales', async function () {
    const resToAllSales = {
      status: 'SUCCESSFUL',
      data: allSales,
    };

    sinon.stub(connection, 'execute')
      .resolves([allSales]);

    const sales = await salesServices.getAll();

    expect(sales).to.be.deep.equal(resToAllSales);
  });
  it('Testa o objeto de retorno para listagem de todos os sales em caso de falha', async function () {
    const resToAllSalesError = { status: 'NOT_FOUND', data: { message: 'Sales not found' } };

    sinon.stub(connection, 'execute')
      .resolves([]);

    const sales = await salesServices.getAll();

    expect(sales).to.be.deep.equal(resToAllSalesError);
  });
  it('Testa o objeto de retorno para um sales buscado por id', async function () {
    const resToOneSale = {
      status: 'SUCCESSFUL',
      data: saleIdResponse,
    };

    sinon.stub(connection, 'execute')
      .resolves([saleIdResponse]);

    const sales = await salesServices.findById(2);

    expect(sales).to.be.deep.equal(resToOneSale);
  });
  it('Testa o objeto de retorno para um sales buscado por id em caso de falha', async function () {
    const resToOneSaleError = {
      status: 'NOT_FOUND',
      data: { message: 'Sale not found' },
    };

    sinon.stub(connection, 'execute')
      .resolves([]);

    const sales = await salesServices.findById(2);

    expect(sales).to.be.deep.equal(resToOneSaleError);
  });
  it('Testa o objeto de retorno para um sale criado com sucesso', async function () {
    const insertSaleReturn = { status: 'CREATED', data: { id: 4, itemsSold: saleReq } };

    sinon.stub(salesModel, 'saleId')
      .resolves(4);
    sinon.stub(connection, 'execute').resolves();
    sinon.stub(salesModel, 'insert').resolves();

    const sales = await salesServices.insert(saleReq);

    expect(sales).to.be.deep.equal(insertSaleReturn);
  });

  afterEach(function () {
    sinon.restore();
  });
});