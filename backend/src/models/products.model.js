const camelize = require('camelize');
const connection = require('./connection');

const findAll = async () => {
  const [products] = await connection.execute('SELECT * FROM products');
  return camelize(products);
};

 const findById = async (id) => {
 const [[product]] = await connection.execute('SELECT * FROM products WHERE id = ?', [id]);
 return camelize(product);
};

const insertProduct = async (productName) => {
  const [result] = await connection.execute(
    'INSERT INTO products (name) VALUES (?)',
    [productName],
  );
  const { insertId } = result;
  return insertId;
};
// corrigido
const updateProduct = async (id, name) => {
  const query = 'UPDATE products SET name = ? WHERE id = ?';
  await connection.execute(query, [name, id]);
  const updatedProduct = {
    id,
    name,
  };
  return updatedProduct;
};
module.exports = {
  findAll,
  findById,
  updateProduct,
  insertProduct,

};