const Joi = require('joi');

const insertNewProduct = Joi.object({
  name: Joi.string().min(5).required(),
});

const insertNewSales = Joi.object({
  productId: Joi.number().required(),
  quantity: Joi.number().required().min(1),
});

module.exports = {
  insertNewProduct,
  insertNewSales,
};