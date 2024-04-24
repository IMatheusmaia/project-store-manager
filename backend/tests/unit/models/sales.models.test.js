const { expect } = require('chai');
const sinon = require('sinon');
const { allSales, saleIdResponse } = require('../mocks/sales.mock');
const connection = require('../../../src/models/connection');
const { salesModel } = require('../../../src/models');

describe('Testa as funcionalidades da camada model para rota de sales', function () {
  it('Testa se todos os dados são retornados do Banco de dados', async function () {
    sinon.stub(connection, 'execute').resolves([allSales]);

    const sales = await salesModel.getAll();

    expect(sales).to.be.deep.equal(allSales);
    expect(sales).to.have.length.above(1);
    expect(sales[0]).to.have.property('saleId');
    expect(sales[0]).to.have.property('date');
  });

  it('Testa se apenas um única venda é retornado do Banco de dados', async function () {
    sinon.stub(connection, 'execute').resolves([saleIdResponse]);

    const sales = await salesModel.findById(2);

    expect(sales).to.be.deep.equal(saleIdResponse);
    expect(sales).to.have.length.lessThan(2);
  });

  afterEach(function () {
    sinon.restore();
  });
});