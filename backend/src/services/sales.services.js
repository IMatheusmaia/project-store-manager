const { salesModel } = require('../models');

const getAll = async () => {
  const sales = await salesModel.getAll();

  if (!sales) {
    return { status: 'NOT_FOUND', data: { message: 'Sales not found' } };
  }

  return { status: 'SUCCESSFUL', data: sales };
};

const findById = async (id) => {
  const sale = await salesModel.findById(id);

  if (!sale || sale.length === 0) {
    return { status: 'NOT_FOUND', data: { message: 'Sale not found' } };
  }

  return { status: 'SUCCESSFUL', data: sale };
};

const insert = async (sales) => {
  const saleId = await salesModel.saleId();

  await Promise.all(await sales.map((item) => salesModel.insert(item, saleId)));

  return { status: 'CREATED', data: { id: saleId, itemsSold: sales } };
};

module.exports = {
  getAll,
  findById,
  insert,
};