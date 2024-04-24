const connection = require('./connection');

const getAll = async () => {
  const [products] = await connection.execute('SELECT * FROM products');
  
  return products;
};

const findById = async (id) => {
  const [[product]] = await connection.execute(
    'SELECT * FROM products WHERE id = ?', 
    [id],
  );
  return product;
};

const productExists = async (name) => {
  const [product] = await connection.execute(
    'SELECT * FROM products WHERE name = ?',
    [name],
  );

  return product.length > 0;
};

const insert = async (name) => {
  const [{ insertId }] = await connection.execute(
    `INSERT INTO products (name)
      VALUE (?)`,
    [name],
  );

  return insertId;
};

const update = async (id, name) => connection.execute(
  'UPDATE products SET name = ? WHERE id = ?',
  [name, id],
);

const remove = async (id) => connection.execute(
  'DELETE FROM products WHERE id = ?',
  [id],
);

module.exports = {
  getAll,
  findById,
  productExists,
  insert,
  update,
  remove,
};