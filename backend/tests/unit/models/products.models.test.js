const { expect } = require('chai');
const sinon = require('sinon');
const { allData, oneData,
} = require('../mocks/products.mocks');
const connection = require('../../../src/models/connection');
const { productsModel } = require('../../../src/models');

describe('Testa as funcionalidades da camada model para rota de produtos', function () {
  it('Testa se todos os dados são retornados do Banco de dados', async function () {
    sinon.stub(connection, 'execute').resolves([allData]);

    const products = await productsModel.getAll();

    expect(products).to.be.deep.equal(allData);
    expect(products).to.have.length.above(1);
  });

  it('Testa se apenas um único produto é retornado do Banco de dados', async function () {
    sinon.stub(connection, 'execute').resolves([[oneData]]);

    const product = await productsModel.findById(1);

    expect(product).to.be.deep.equal(oneData);
  });

  it('Testa se a busca por um produto pelo nome tem o retorno esperado', async function () {
    sinon.stub(connection, 'execute').resolves([[oneData]]);

    const product = await productsModel.productExists('Martelo de Thor');

    expect(product).to.be.equal(true);

    sinon.restore();

    sinon.stub(connection, 'execute').resolves([[]]);

    const product2 = await productsModel.productExists('Capa de invisibilidade');
    expect(product2).to.be.equal(false);
  });
  
  it('Testa se ao inserir o novo produto o retorno é o id esperado', async function () {
    sinon.stub(connection, 'execute').resolves([{ insertId: 4 }]);

    const productId = await productsModel.insert('Capa da invisibildade');

    expect(productId).to.be.equal(4);
  });

  afterEach(function () {
    sinon.restore();
  });
});