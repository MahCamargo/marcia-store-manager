const camelize = require('camelize');
const connection = require('./connection');

const findAll = async () => {
  const queryAllSales = `
  SELECT s.id AS sale_id, sp.product_id, s.date, sp.quantity 
  FROM sales AS s
  INNER JOIN sales_products AS sp ON sp.sale_id = s.id; 
  `;
  const [sales] = await connection.execute(queryAllSales);
  const camelizedSales = camelize(sales); 
  return camelizedSales;
};

const findById = async (id) => {
  const querySalesById = `
    SELECT s.date, sp.product_id, sp.quantity 
    FROM sales AS s
    INNER JOIN sales_products AS sp ON sp.sale_id = s.id
    WHERE s.id = ?;
  `;
  const [salesId] = await connection.execute(querySalesById, [id]);
  const camelizedSalesId = camelize(salesId); 
  return camelizedSalesId;
};

const insertSales = async (products) => {
  try {
    // Inserir uma nova venda na tabela "sales"
    const salesQuery = 'INSERT INTO sales (date) VALUES (NOW())'; 
    const [{ insertId }] = await connection.execute(salesQuery);
   
    const salesProductsQuery = `
      INSERT INTO sales_products (
        sale_id, product_id, quantity) 
        VALUES (?, ?, ?)
    `;
    const productsInsertPromises = products.map((product) => 
      connection.execute(salesProductsQuery, [insertId, product.productId, product.quantity]));
    await Promise.all(productsInsertPromises);
    return insertId;
  } catch (error) {
   console.log(error); 
  }
};

module.exports = {
  findAll,
  findById,
  insertSales,
};