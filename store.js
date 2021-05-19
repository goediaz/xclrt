function getProducts() {
  // eslint-disable-next-line no-undef
  return products;
}

function getCart() {
  return cart;
}
// eslint-disable-next-line no-unused-vars
const store = {
  // eslint-disable-next-line no-undef
  products: getProducts(),
  totalCost: 0,
  currentPage: 1,
  cart: getCart()
};
