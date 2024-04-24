const { insertNewSales } = require('../validations/schemas');
const { resolvesStatusCode } = require('../utils/sales');

const insertSaleValidate = async (req, res, next) => {
  const { body } = req;

  const erros = body.map((product) => {
    const { error } = insertNewSales.validate(product);
    if (error) return error.message;
    return false;
  });
  const erroMessage = erros.find((error) => error !== false);

  if (erros.some((error) => error !== false)) {
    const statusCode = resolvesStatusCode(erroMessage);
    return res
      .status(statusCode)
      .json({ message: erroMessage });
  }

  next();
};

module.exports = {
  insertSaleValidate,
};