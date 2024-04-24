const { productsModel } = require('../models');
const { validateNewProduct } = require('../validations/validations');

const getAll = async () => {
  const products = await productsModel.getAll();

  if (!products) {
    return { status: 'NOT_FOUND', data: { message: 'Products not found' } };
  }

  return { status: 'SUCCESSFUL', data: products };
};

const findById = async (id) => {
  const product = await productsModel.findById(id);

  if (!product) {
    return { status: 'NOT_FOUND', data: { message: 'Product not found' } };
  }

  return { status: 'SUCCESSFUL', data: product };
};

const insert = async (body) => {
  const error = validateNewProduct(body);

  if (error) {
    const { status, message } = error;

    return { status, data: { message } }; 
  }
  const { name } = body;

  if (await productsModel.productExists(name)) {
    return { status: 'CONFLICT', data: { message: 'Product already exists' } };
  }

  const newProductId = await productsModel.insert(name);

  const newProduct = await productsModel.findById(newProductId);

  return { status: 'CREATED', data: newProduct };
};

const update = async (id, name) => {
  await productsModel.update(id, name);
  const updatedProduct = await productsModel.findById(id);

  if (updatedProduct) {
    return { status: 'SUCCESSFUL', data: updatedProduct };
  }
};

const remove = async (id) => {
  await productsModel.remove(id);

  const product = await findById(id);
  if (product.status === 'NOT_FOUND') {
    return { status: 'SUCCESSFUL', data: {} };
  }
};

module.exports = {
  getAll,
  findById,
  insert,
  update,
  remove,
};