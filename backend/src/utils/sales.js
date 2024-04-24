const resolvesStatusCode = (message) => {
  if (message === '"productId" is required') return 400;
  if (message === '"quantity" is required') return 400;
  if (message === '"quantity" must be greater than or equal to 1') return 422;
};

module.exports = { resolvesStatusCode };