const { productsServices } = require('../services');
const { resolvesStatusCode } = require('../utils/products');

const getAllProducts = async (_req, res) => {
  const { status, data } = await productsServices.getAll();

  return res.status(status === 'SUCCESSFUL' ? 200 : 500).json(data);
};

const findProductById = async (req, res) => {
  const { id } = req.params;
  const { status, data } = await productsServices.findById(id);

  return res.status(status === 'SUCCESSFUL' ? 200 : 404).json(data);
};

const insertNewProduct = async (req, res) => {
  const { status, data } = await productsServices.insert(req.body);
  
  return res.status(status === 'CREATED' ? 201 : resolvesStatusCode(data.message)).json(data);
};

const updateProduct = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  const { status, data } = await productsServices.update(id, name);

  res.status(status === 'SUCCESSFUL' ? 200 : 500).json(data);
};

const deleteProduct = async (req, res) => {
  const { id } = req.params;
  const { status, data } = await productsServices.remove(id);

  res.status(status === 'SUCCESSFUL' ? 204 : 500).json(data);
};

module.exports = {
  getAllProducts,
  findProductById,
  insertNewProduct,
  updateProduct,
  deleteProduct,
};