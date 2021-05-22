function getProducts() {
  return products;
}
function getPromotions() {
  return promotions;
}
function getCart() {
  return cart;
}

const store = {
  products: getProducts(),
  totalCost: 0,
  currentPage: 1,
  cart: getCart(),
  promotions: getPromotions()
};
