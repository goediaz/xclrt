const storeModule = require('./store');
const productsModule = require('./products');

function getPriceOrDiscount(product, qty = 1) {
  const promo = productsModule.promotions.find((promotion) => promotion.code === product.code);
  let value = 0;
  if (promo) {
    switch (promo.code) {
      case 'GOKU':
        if (qty % 2 === 0) {
          value = (product.price * qty) * promo.price;
        } else {
          value = qty === 1
            ? (product.price * qty)
            : ((product.price * (qty + 1)) / 2);
        }
        break;
      case 'NARU':
        if (qty > 2) {
          value = product.price * qty * promo.price;
        } else {
          value = product.price * qty;
        }
        break;
      }
  } else {
    value = product.price * qty;
  }
  return value;
}

function removeFromShoppingCart(productId, qty) {
  const cartProducts = storeModule.store.cart.products.filter((item) => item.product.id !== productId);
  const productToSubstract = storeModule.store.products.find((product) => product.id === productId);

  if (qty > 0) {
    const item = {
      product: productToSubstract,
      quantity: qty,
      totalPrice: getPriceOrDiscount(productToSubstract, qty)
    };
    const updatedCartProducts = [...cartProducts, item];
    storeModule.store.cart = { products: updatedCartProducts };
  } else {
    storeModule.store.cart = { products: cartProducts };
  }
}

function addToShoppingCart(productId, qty) {
  const existingCartProduct = storeModule.store.cart.products.find(({ product }) => product.id === productId);
  const productToAdd = storeModule.store.products.find((product) => product.id === productId);

  if (!existingCartProduct) {
    storeModule.store.cart.products = [
      ...storeModule.store.cart.products,
      { product: productToAdd, quantity: qty, totalPrice: getPriceOrDiscount(productToAdd, qty) }
    ];
  } else {
    let newCartProducts = storeModule.store.cart.products.filter((item) => item.product.id !== productId);
    const item = {
      product: productToAdd,
      quantity: qty,
      totalPrice: getPriceOrDiscount(productToAdd, qty)
    };
    newCartProducts = [...newCartProducts, item];
    storeModule.store.cart = { products: newCartProducts };
  }
}

function getOverallCost() {
  let totalCost = 0;
  for (let i = 0; i < storeModule.store.cart.products.length; i += 1) {
    totalCost += storeModule.store.cart.products[i].totalPrice;
  }
  return totalCost;
}

function getCostWithNoDiscount() {
  let totalCost = 0;
  for (let i = 0; i < storeModule.store.cart.products.length; i += 1) {
    totalCost += storeModule.store.cart.products[i].product.price * storeModule.store.cart.products[i].quantity;
  }
  return totalCost;
}

exports.getPriceOrDiscount = getPriceOrDiscount;
exports.removeFromShoppingCart = removeFromShoppingCart;
exports.addToShoppingCart = addToShoppingCart;
exports.getOverallCost = getOverallCost;
exports.getCostWithNoDiscount = getCostWithNoDiscount;