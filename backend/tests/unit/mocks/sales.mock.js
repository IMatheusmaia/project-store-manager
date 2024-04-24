const allSales = [
  {
    saleId: 1,
    date: '2024-03-03T04:00:37.000Z',
    productId: 1,
    quantity: 5,
  },
  {
    saleId: 1,
    date: '2024-03-03T04:00:37.000Z',
    productId: 2,
    quantity: 10,
  },
  {
    saleId: 2,
    date: '2024-03-03T04:00:37.000Z',
    productId: 3,
    quantity: 15,
  },
];

const saleIdResponse = [
  {
    date: '2024-03-03T21:30:34.000Z',
    productId: 3,
    quantity: 15,
  },
];

const saleReq = [
  {
    productId: 1,
    quantity: 1,
  },
  {
    productId: 2,
    quantity: 5,
  },
];

module.exports = { allSales, saleIdResponse, saleReq };