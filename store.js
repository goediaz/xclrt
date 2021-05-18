function getProducts() {
  // eslint-disable-next-line no-undef
  return products;
}
// eslint-disable-next-line no-unused-vars
const store = {
  // eslint-disable-next-line no-undef
  products: getProducts(),
  totalCost: 0,
  currentPage: 1,
  cart: {
    // eslint-disable-next-line no-undef
    products: [{ product: products[0], quantity: 1 }]
  }
};
