const validateQuantity = (req, res, next) => {
  const saleItems = req.body;

  const hasMissingQuantity = saleItems.some((item) => !item.quantity);
  const hasInvalidQuantity = saleItems.some((item) => item.quantity <= 0);

  if (hasMissingQuantity) {
    return res.status(400).json({ message: '"quantity" is required' });
  }
  if (hasInvalidQuantity) {
    return res.status(422).json({ message: '"quantity" must be greater than or equal to 1' });
  }

  next();
};

const validateProductExistence = async (req, res, next) => {
  const saleItems = req.body;
  const productIds = saleItems.map((item) => item.productId);
  const existingProducts = await productsModel(productIds);
  const nonExistingProduct = saleItems.find((item) => !existingProducts.includes(item.productId));
  
  if (nonExistingProduct) {
    return res.status(404).json({ message: 'Product not found' });
  }

  next();
};

module.exports = {
  validateQuantity,
  validateProductExistence,
};

// codigo corrigido com a ajuda externa