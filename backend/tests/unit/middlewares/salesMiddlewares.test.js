const { expect } = require('chai');
const sinon = require('sinon');
const { insertSaleValidate } = require('../../../src/middlewares/salesValidate');
const insertNewSales = require('../../../src/validations/schemas');

describe('Testa o funcionamento dos middlewares de validação de produtos', function () {
  it('Testa os casos de erro na atualização de um produto', async function () {
    const error1 = '"productId" is required';
    const error2 = '"quantity" is required';
    const error3 = '"quantity" must be greater than or equal to 1';

    sinon.stub(insertNewSales, 'insertNewSales').resolves([error1]);

    const req1 = { body: [{ quantity: 1 }] };
    const res1 = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };
    const next1 = sinon.stub();

    await insertSaleValidate(req1, res1, next1);

    expect(res1.status).to.have.been.calledWith(400);
    expect(res1.json).to.have.been.calledWith({ message: error1 });

    sinon.restore();

    sinon.stub(insertNewSales, 'insertNewSales').resolves([error2]);

    const req2 = { body: [{ productId: 1 }] };
    const res2 = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };
    const next2 = sinon.stub();

    await insertSaleValidate(req2, res2, next2);

    expect(res2.status).to.have.been.calledWith(400);
    expect(res2.json).to.have.been.calledWith({ message: error2 });

    sinon.restore();

    sinon.stub(insertNewSales, 'insertNewSales').resolves([error3]);

    const req3 = { body: [{ productId: 1, quantity: 0 }] };
    const res3 = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };
    const next3 = sinon.stub();

    await insertSaleValidate(req3, res3, next3);

    expect(res3.status).to.have.been.calledWith(422);
    expect(res3.json).to.have.been.calledWith({ message: error3 });
  });

  afterEach(function () {
    sinon.restore();
  });
});