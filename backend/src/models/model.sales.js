const camelize = require('camelize');
const connection = require('./connection');

const findAll = async () => {
const queryAllSales = `
SELECT s.sale_id, sp.product_id, s.date, sp.quantity 
FROM sales AS s
INNER JOIN sales_products AS sp ON sp.sale_id = s.id;
`;
const [sales] = await connection.execute(queryAllSales);
return camelize(sales);
};

const findById = async (id) => {
const querySalesById = `
  SELECT s.date, sp.product_id, sp.quantity 
  FROM sales AS s
  INNER JOIN sales_products AS sp ON sp.sale_id = s.id
  WHERE s.id = ?;
`;
  const [salesId] = await connection.execute(querySalesById, [id]);
  return camelize(salesId);
};
// arrumar
const insertSales = async (products) => {
  const salesQuery = 'INSERT INTO sales () VALUES ()';
  const salesProductsQuery = `INSERT INTO 
                        sales_products (sale_id, product_id, quantity) VALUES (?, ?, ?)`;

  const [{ insertId }] = await connection.execute(salesQuery);

  const productsInsertPromises = products.map((product) => 
    connection.execute(salesProductsQuery, [insertId, product.productId, product.quantity]));

  await Promise.all(productsInsertPromises);

  return insertId;
};

module.exports = {
  findAll,
  findById,
  insertSales,

};