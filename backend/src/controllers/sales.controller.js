const { salesServices } = require('../services');

const getAllSales = async (_req, res) => {
  const { status, data } = await salesServices.getAll();
  return res.status(status === 'SUCCESSFUL' ? 200 : 404).json(data);
};

const getSaleById = async (req, res) => {
  const { id } = req.params;
  const { status, data } = await salesServices.findById(id);
  return res.status(status === 'SUCCESSFUL' ? 200 : 404).json(data);
};

const insertNewSale = async (req, res) => {
  const sales = req.body;
  const { status, data } = await salesServices.insert(sales);

  res.status(status === 'CREATED' ? 201 : 500).json(data);
};

module.exports = {
  getAllSales,
  getSaleById,
  insertNewSale,
};