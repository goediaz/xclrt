const productsElements = require('./products');

function getProducts() {
  return productsElements.products;
}
function getPromotions() {
  return productsElements.promotions;
}
function getCart() {
  return productsElements.cart;
}

const store = {
  products: getProducts(),
  totalCost: 0,
  currentPage: 1,
  cart: getCart(),
  promotions: getPromotions()
};

exports.store = store;