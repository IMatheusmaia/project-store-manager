const productsModel = require('../models/products.model');

const productExists = async (productId) => {
  const product = await productsModel.findById(productId);
  return !product ? 'NOT_FOUND' : 'EXISTS';
};

const productNotFound = async (req, res, next) => {
  const { body } = req;
  const notFoundList = await body.map((sales) => {
    const { productId } = sales;
    return productExists(productId);
  });

  const result = await Promise.all(notFoundList);
  const status = result.some((message) => message === 'NOT_FOUND');
  
  if (status) {
    return res.status(404).json({ message: 'Product not found' });
  }

  next();
};

const productNotFoundById = async (req, res, next) => {
  const { id } = req.params;
  const notFoundProduct = await productExists(id);
  
  if (notFoundProduct === 'NOT_FOUND') {
    return res.status(404).json({ message: 'Product not found' });
  }

  if (notFoundProduct === 'EXISTS') {
    next();
  }
};
module.exports = {
  productNotFound,
  productNotFoundById,
};