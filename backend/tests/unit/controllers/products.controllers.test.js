const chai = require('chai');
const { expect } = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const { allData, oneData,
} = require('../mocks/products.mocks');
const { productsController } = require('../../../src/controllers');
const { productsServices } = require('../../../src/services');
const validateNewProduct = require('../../../src/validations/validations');

chai.use(sinonChai);

describe('Testa as funcionalidades da camada controller para rota de produtos', function () {
  it('testa a resposta do controller para listagem de todos os produtos', async function () {
    const serviceProductReturn = { status: 'SUCCESSFUL', data: allData };

    sinon.stub(productsServices, 'getAll').resolves(serviceProductReturn);

    const req = {};
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };

    await productsController.getAllProducts(req, res);

    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith(allData);
  });
  it('testa a resposta do controller para listagem de todos os produtos em caso de erro', async function () {
    const serviceProductReturnError = { status: 'NOT_FOUND', data: { message: 'Products not found' } };

    sinon.stub(productsServices, 'getAll').resolves(serviceProductReturnError);

    const req = {};
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };

    await productsController.getAllProducts(req, res);

    expect(res.status).to.have.been.calledWith(500);
    expect(res.json).to.have.been.calledWith({ message: 'Products not found' });
  });
  it('testa a resposta do controller para listagem de um produto pelo id', async function () {
    const serviceProductReturn = { status: 'SUCCESSFUL', data: oneData };
    
    sinon.stub(productsServices, 'findById')
      .resolves(serviceProductReturn);

    const req = { params: 1 };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };

    await productsController.findProductById(req, res);

    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith(oneData);
  });
  it('testa a resposta do controller para listagem de um produto pelo id no caso de erro', async function () {
    const serviceProductReturnError = { status: 'NOT_FOUND', data: { message: 'Product not found' } };
    
    sinon.stub(productsServices, 'findById')
      .resolves(serviceProductReturnError);

    const req = { params: 1 };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };

    await productsController.findProductById(req, res);

    expect(res.status).to.have.been.calledWith(404);
    expect(res.json).to.have.been.calledWith({ message: 'Product not found' });
  });
  it('testa a resposta do controller para um novo produto cadastrado', async function () {
    const newProduct = { id: 4, name: 'Capa da invisbilidade' };
    const serviceProductReturn = { status: 'CREATED', data: newProduct };

    sinon.stub(productsServices, 'insert')
      .resolves(serviceProductReturn);

    const req = { body: newProduct };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };

    await productsController.insertNewProduct(req, res);

    expect(res.status).to.have.been.calledWith(201);
    expect(res.json).to.have.been.calledWith(newProduct);
  });
  it('resta resposta do controller para um novo produto cadastrado em caso de erro', async function () {
    const newProduct = { id: 4, name: 'Capa da invisbilidade' };
    const newProduct2 = { id: 5, name: '' };
    const newProduct3 = { id: 6, name: 'Espad' };

    const serviceProductReturnError = { status: 'CONFLICT', data: { message: 'Product already exists' } };
    const serviceProductReturnError2 = { status: 'INVALID_VALUE', data: { message: '"name" is required' } };
    const serviceProductReturnError3 = { status: 'INVALID_VALUE', data: { message: '"name" length must be at least 5 characters long' } };

    sinon.stub(productsServices, 'insert')
      .resolves(serviceProductReturnError);

    const req = { body: newProduct };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };

    await productsController.insertNewProduct(req, res);

    expect(res.status).to.have.been.calledWith(500);
    expect(res.json).to.have.been.calledWith({ message: 'Product already exists' });

    sinon.restore();
    
    sinon.stub(validateNewProduct, 'validateNewProduct').resolves(true);
    sinon.stub(productsServices, 'insert').resolves(serviceProductReturnError2);

    const req2 = { body: newProduct2 };
    const res2 = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };
    await productsController.insertNewProduct(req2, res2);
    
    expect(res2.status).to.have.been.calledWith(400);
    expect(res2.json).to.have.been.calledWith({ message: '"name" is required' });

    sinon.restore();
    
    sinon.stub(validateNewProduct, 'validateNewProduct').resolves(true);
    sinon.stub(productsServices, 'insert').resolves(serviceProductReturnError3);

    const req3 = { body: newProduct3 };
    const res3 = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };
    await productsController.insertNewProduct(req3, res3);
    
    expect(res3.status).to.have.been.calledWith(422);
    expect(res3.json).to.have.been.calledWith({ message: '"name" length must be at least 5 characters long' });
  });
  it('testa a resposta do controller para um produto atualizado em caso de sucesso', async function () {
    sinon.stub(productsServices, 'update').resolves({ status: 'SUCCESSFUL', data: { id: 2, name: 'Espada de São Jorge' } });

    const req = { params: { id: 2 }, body: { name: 'Espada de São Jorge' } };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };

    await productsController.updateProduct(req, res);

    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith({ id: 2, name: 'Espada de São Jorge' });
  });
  it('testa a resposta do controller para um produto atualizado em caso de erro', async function () {
    sinon.stub(productsServices, 'update').resolves({ status: 'NOT_FOUND', data: { message: 'Product not exists' } });

    const req = { params: { id: 7 }, body: { name: 'Mãe de Milhares' } };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };

    await productsController.updateProduct(req, res);

    expect(res.status).to.have.been.calledWith(500);
    expect(res.json).to.have.been.calledWith({ message: 'Product not exists' });
  });
  it('testa a resposta do controller para um produto deletado em caso de sucesso', async function () {
    sinon.stub(productsServices, 'remove').resolves({ status: 'SUCCESSFUL', data: { } });

    const req = { params: { id: 2 } };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };

    await productsController.deleteProduct(req, res);

    expect(res.status).to.have.been.calledWith(204);
    expect(res.json).to.have.been.calledWith({ });
  });
  it('testa a resposta do controller para um produto deletado em caso de erro', async function () {
    sinon.stub(productsServices, 'remove').resolves({ status: 'NOT_FOUND', data: { } });

    const req = { params: { id: 2 } };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };

    await productsController.deleteProduct(req, res);

    expect(res.status).to.have.been.calledWith(500);
    expect(res.json).to.have.been.calledWith({ });
  });
  afterEach(function () {
    sinon.restore();
  });
});