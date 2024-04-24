const { expect } = require('chai');
const sinon = require('sinon');
const { allData, oneData,
} = require('../mocks/products.mocks');
const connection = require('../../../src/models/connection');
const { productsServices } = require('../../../src/services');
const validateNewProduct = require('../../../src/validations/validations');
const { productsModel } = require('../../../src/models');

describe('Testa as funcionalidades da camada service para rota de produtos', function () {
  it('Testa o objeto de retorno para listagem de todos os produtos', async function () {
    const resToAllProducts = {
      status: 'SUCCESSFUL',
      data: allData,
    };

    sinon.stub(connection, 'execute').resolves([allData]);

    const products = await productsServices.getAll();

    expect(products).to.be.deep.equal(resToAllProducts);
    expect(products).to.be.an('object');
  });

  it('Testa o objeto de retorno para listagem de todos os produtos em caso de falha', async function () {
    const resToAllProductsError = { status: 'NOT_FOUND', data: { message: 'Products not found' } };

    sinon.stub(connection, 'execute').resolves([]);

    const products = await productsServices.getAll();

    expect(products).to.be.deep.equal(resToAllProductsError);
    expect(products).to.be.an('object');
  });

  it('Testa o objeto de retorno para um produto buscado por id', async function () {
    const resToAllProducts = {
      status: 'SUCCESSFUL',
      data: oneData,
    };

    sinon.stub(connection, 'execute').resolves([[oneData]]);

    const products = await productsServices.findById(1);

    expect(products).to.be.deep.equal(resToAllProducts);
    expect(products).to.be.an('object');
  });

  it('Testa o objeto de retorno para um produto buscado por id no caso de erro', async function () {
    const resToAllProducts = {
      status: 'NOT_FOUND',
      data: { message: 'Product not found' },
    };

    sinon.stub(connection, 'execute').resolves([[]]);

    const products = await productsServices.findById(1);

    expect(products).to.be.deep.equal(resToAllProducts);
    expect(products).to.be.an('object');
    expect(products.data).to.be.property('message');
  });

  it('Testa o objeto de retorno para um produto inserido com sucesso', async function () {
    const insertProductReturn = { status: 'CREATED', data: { id: 4, name: 'Capa da invisibilidade' } };

    sinon.stub(validateNewProduct, 'validateNewProduct').resolves(false);
    sinon.stub(productsModel, 'productExists').resolves(false);
    sinon.stub(productsModel, 'insert').resolves(4);
    sinon.stub(connection, 'execute').resolves([[{ id: 4, name: 'Capa da invisibilidade' }]]);

    const newProduct = await productsServices.insert({ name: 'Capa da invisibilidade' });
    
    expect(newProduct).to.be.deep.equal(insertProductReturn);
  });

  it('Testa a validação do nome do produto inserio', async function () {
    const insertProductReturn = { status: 'INVALID_VALUE', data: { message: '"name" length must be at least 5 characters long' } };

    sinon.stub(validateNewProduct, 'validateNewProduct').resolves(true);

    const newProduct = await productsServices.insert({ name: 'Cap' });

    expect(newProduct).to.be.deep.equal(insertProductReturn);
  });

  it('Testa a validação do nome caso o usuário não insira nenhum nome', async function () {
    const insertProductReturn = { status: 'INVALID_VALUE', data: { message: '"name" is required' } };

    sinon.stub(validateNewProduct, 'validateNewProduct').resolves(true);

    const newProduct = await productsServices.insert({ });

    expect(newProduct).to.be.deep.equal(insertProductReturn);
  });
  
  it('Testa a validação do nome do produto inserio, se já existe', async function () {
    const insertProductReturn = { status: 'CONFLICT', data: { message: 'Product already exists' } };

    sinon.stub(validateNewProduct, 'validateNewProduct').resolves(false);
    sinon.stub(productsModel, 'productExists').resolves(true);

    const newProduct = await productsServices.insert({ name: 'Adamantium' });

    expect(newProduct).to.be.deep.equal(insertProductReturn);
    expect(newProduct).to.be.an('object');
    expect(newProduct.data).to.be.property('message');
    expect(newProduct.data).to.be.deep.equal({ message: 'Product already exists' });
    expect(newProduct.status).to.be.equal('CONFLICT');
    expect(newProduct).to.be.an('object');
    expect(newProduct.data).to.be.property('message');
  });

  afterEach(function () {
    sinon.restore();
  });
});