const { modelProducts } = require('../models');

const validateQuantity = (req, res, next) => {
  const saleItems = req.body;

  const hasMissingQuantity = saleItems.some((item) => item.quantity === undefined);
  const hasInvalidQuantity = saleItems.some((item) => item.quantity <= 0);
  const hasMissngProductId = saleItems.some((item) => !item.productId);
  if (hasMissngProductId) {
    return res.status(400).json({ message: '"productId" is required' });
}
  if (hasMissingQuantity) {
    return res.status(400).json({ message: '"quantity" is required' });
  }
  if (hasInvalidQuantity) {
    return res.status(422).json({ message: '"quantity" must be greater than or equal to 1' });
  }

  next();
};

const validateProductExistence = async (req, res, next) => {
  const products = Array.isArray(req.body) ? req.body : [{ productId: req.params.id }];
  const responses = await Promise.all(products.map(async (item) => {
    const product = await modelProducts.findById(item.productId);
    return !product ? null : product;
  }));
  if ((responses).some((item) => item === null)) {
    return res.status(404).json({ message: 'Product not found' });
  }
  next();
};

module.exports = {
  validateQuantity,
  validateProductExistence,
};

// codigo corrigido com a ajuda externa