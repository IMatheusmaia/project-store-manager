const express = require('express');

const { productsController } = require('../controllers');
const { productNotFoundById } = require('../middlewares');
const { updateProductValidate } = require('../middlewares/productsValidate');

const router = express.Router();

router.get('/', productsController.getAllProducts);

router.post('/', productsController.insertNewProduct);

router.get('/:id', productsController.findProductById);

router.put(
  '/:id', 
  updateProductValidate,
  productNotFoundById,
  productsController.updateProduct,
);

router.delete(
  '/:id',
  productNotFoundById,
  productsController.deleteProduct,
);

module.exports = router;