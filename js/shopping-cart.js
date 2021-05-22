function getPriceOrDiscount(product, qty = 1) {
  const promo = promotions.find((promotion) => promotion.code === product.code);
  let value = 0;
  switch (promo?.code) {
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
    default:
      value = product.price * qty;
  }
  return value;
}

function removeFromShoppingCart(productId, qty) {
  const cartProducts = store.cart.products.filter((item) => item.product.id !== productId);
  const productToSubstract = store.products.find((product) => product.id === productId);

  if (qty > 0) {
    const item = {
      product: productToSubstract,
      quantity: qty,
      totalPrice: getPriceOrDiscount(productToSubstract, qty)
    };
    const updatedCartProducts = [...cartProducts, item];
    store.cart = { products: updatedCartProducts };
  } else {
    store.cart = { products: cartProducts };
  }
}

function addToShoppingCart(productId, qty) {
  const existingCartProduct = store.cart.products.find(({ product }) => product.id === productId);
  const productToAdd = store.products.find((product) => product.id === productId);

  if (!existingCartProduct) {
    store.cart.products = [
      ...store.cart.products,
      { product: productToAdd, quantity: qty, totalPrice: getPriceOrDiscount(productToAdd, qty) }
    ];
  } else {
    let newCartProducts = store.cart.products.filter((item) => item.product.id !== productId);
    const item = {
      product: productToAdd,
      quantity: qty,
      totalPrice: getPriceOrDiscount(productToAdd, qty)
    };
    newCartProducts = [...newCartProducts, item];
    store.cart = { products: newCartProducts };
  }
}

function getOverallCost() {
  let totalCost = 0;
  for (let i = 0; i < store.cart.products.length; i += 1) {
    totalCost += store.cart.products[i].totalPrice;
  }
  return totalCost;
}

function getCostWithNoDiscount() {
  let totalCost = 0;
  for (let i = 0; i < store.cart.products.length; i += 1) {
    totalCost += store.cart.products[i].product.price * store.cart.products[i].quantity;
  }
  return totalCost;
}