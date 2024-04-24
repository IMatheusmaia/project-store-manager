const resolvesStatusCode = (message) => {
  if (message === '"name" is required') return 400;

  if (message === '"name" length must be at least 5 characters long') return 422;

  return 500;
};

module.exports = { resolvesStatusCode };