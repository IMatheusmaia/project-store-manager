const express = require('express');

const { salesController } = require('../controllers');
const { productNotFound } = require('../middlewares');
const { insertSaleValidate } = require('../middlewares/salesValidate');

const router = express.Router();

router.get('/', salesController.getAllSales);

router.post(
  '/',
  insertSaleValidate,
  productNotFound,
  salesController.insertNewSale,
);

router.get('/:id', salesController.getSaleById);

module.exports = router;