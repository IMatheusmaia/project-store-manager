const { expect } = require('chai');
const sinon = require('sinon');
const { updateProductValidate } = require('../../../src/middlewares/productsValidate');
const validateNewProduct = require('../../../src/validations/validations');

describe('Testa o funcionamento dos middlewares de validação de produtos', function () {
  it('Testa os casos de erro na atualização de um produto', async function () {
    const error1 = { status: 'INVALID_VALUE', message: '"name" is required' };
    const error2 = { status: 'INVALID_VALUE', message: '"name" length must be at least 5 characters long' };

    sinon.stub(validateNewProduct, 'validateNewProduct').resolves(error1);

    const req1 = { body: { } };
    const res1 = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };
    const next1 = sinon.stub();

    await updateProductValidate(req1, res1, next1);

    expect(res1.status).to.have.been.calledWith(400);
    expect(res1.json).to.have.been.calledWith({ message: '"name" is required' });

    sinon.restore();

    sinon.stub(validateNewProduct, 'validateNewProduct').resolves(error2);

    const req2 = { body: { name: 'out' } };
    const res2 = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };
    const next2 = sinon.stub();

    await updateProductValidate(req2, res2, next2);

    expect(res2.status).to.have.been.calledWith(422);
    expect(res2.json).to.have.been.calledWith({ message: '"name" length must be at least 5 characters long' });
  });

  afterEach(function () {
    sinon.restore();
  });
});