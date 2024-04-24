const { insertNewProduct } = require('./schemas');

const validateNewProduct = (body) => {
  const { error } = insertNewProduct.validate(body);

  if (error) return { status: 'INVALID_VALUE', message: error.message };
};

module.exports = {
  validateNewProduct,
};