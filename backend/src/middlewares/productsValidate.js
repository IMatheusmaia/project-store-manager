const { validateNewProduct } = require('../validations/validations');
const { resolvesStatusCode } = require('../utils/products');

const updateProductValidate = async (req, res, next) => {
  const { body } = req;

  const error = validateNewProduct(body);

  if (error) {
    const statusNumber = resolvesStatusCode(error.message);
    return res.status(statusNumber).json({ message: error.message });
  }

  next();
};

module.exports = {
  updateProductValidate,
};