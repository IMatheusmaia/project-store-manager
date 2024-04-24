const camelize = require('camelize');
const connection = require('./connection');

const getAll = async () => {
  const [sales] = await connection.execute(
    `SELECT sp.sale_id, sa.date, sp.product_id, sp.quantity
    FROM sales_products AS sp
    JOIN sales AS sa 
    ON sp.sale_id = sa.id`,
  );
  
  return camelize(sales);
};

const findById = async (id) => {
  const [sale] = await connection.execute(
    `SELECT sa.date, sp.product_id, sp.quantity
    FROM sales_products AS sp
    JOIN sales AS sa 
    ON sp.sale_id = sa.id
    WHERE sp.sale_id = ?`, 
    [id],
  );
  return camelize(sale);
};

const saleId = async () => {
  const [{ insertId }] = await connection.execute(
    `INSERT INTO sales (date)
      VALUE (NOW())`,
  );

  return insertId;
};

const insert = async (product, id) => {
  await connection.execute(`
  INSERT INTO sales_products(sale_id, product_id, quantity)
  VALUES (?, ?, ?)`, [id, product.productId, product.quantity]);
};

module.exports = {
  getAll,
  findById,
  saleId,
  insert,
};