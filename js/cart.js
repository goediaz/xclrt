const shoppingCartModule = require('./shopping-cart');
const storeModule = require('./store');

/* eslint-disable no-undef */
function countTotalItems() {
  let total = 0;
  for (let i = 0; i < storeModule.store.cart.products.length; i += 1) {
    total += storeModule.store.cart.products[i].quantity;
  }
  return total;
}

const createDomElment = (nodeName, nodeContent, nodeClass, nodeAttr, attrValue) => {
  const newNode = document.createElement(nodeName);
  newNode.innerText += nodeContent;

  if (nodeClass) {
    newNode.classList.add(nodeClass);
  }

  if (nodeAttr) {
    newNode.setAttribute(nodeAttr, attrValue);
  }

  return newNode;
};

function updateShoppingCartView() {
  const node = document.getElementById('cart_overview');
  const totalItems = countTotalItems();
  const overallCost = shoppingCartModule.getOverallCost();
  const totalCostNoDiscount = shoppingCartModule.getCostWithNoDiscount();
  node.innerHTML = `${totalItems} Items <strong class="products__total-qty">${totalCostNoDiscount} €<strong>`;
  const costNode = document.getElementById('total-cost');
  costNode.innerHTML = `TOTAL COST <strong class="cart__total-cost">${overallCost} €<strong>`;
  const cartContainer = document.getElementById('cart_products');

  cartContainer.innerHTML = '';
  if (storeModule.store.cart.products.length > 0) {
    storeModule.store.cart.products.forEach((item) => {
      const moneySaved = (item.product.price * item.quantity - item.totalPrice);
      if (moneySaved !== 0) {
        const promo = storeModule.store.promotions.find(({ code }) => code === item.product.code);
        const subcontent = `<ul class='cart__products-overview-list'><li>${promo.name}</li>  <li>${moneySaved} € </li></ul>`;
        const itemNode = createDomElment('li', '', 'cart__products-item', '');
        itemNode.innerHTML = subcontent;
        cartContainer.append(itemNode);
      }
    });
  }
}

const handleSubstract = (id, qty, price) => {
  const input = document.getElementById(`input-${id}`);
  const newQty = +qty > 0 ? qty - 1 : qty;
  input.value = newQty;
  const refElement = document.getElementById(`total-price-${id}`);
  refElement.innerText = +input.value * +price;
  shoppingCartModule.removeFromShoppingCart(id, newQty);
  updateShoppingCartView();
};

const handleAdd = (id, qty, price) => {
  const input = document.getElementById(`input-${id}`);
  const newQty = +qty + 1;
  input.value = newQty;
  const refElement = document.getElementById(`total-price-${id}`);
  refElement.innerText = +input.value * +price;
  shoppingCartModule.addToShoppingCart(id, newQty);
  updateShoppingCartView();
};

// FIXME
// This is a way long mehtod, due the quantity of html elements, would be good to see if I can
// reduce the quantity of lines.
function drawProductsTable(nodeContainer) {
  storeModule.store.products.forEach((product) => {
    const mainNode = createDomElment('li', '', 'products__item', 'id', `item-${product.id}`);
    const figure = createDomElment('figure', '', 'products__item-image-container', '', '');
    const imageNode = createDomElment('img', '', 'products__item-image', 'src', `./public/images/${product.id}.jpg`);
    const innertCaption = createDomElment('strong', `Product Code ${product.code}`, '', '', '');
    const caption = createDomElment('span', `${product.name}`, 'products__item-name', '', '');
    const counter = createDomElment('div', '', 'products__item-counter', '', '');
    const buttonPlus = createDomElment('button', '+', 'products__item-add', 'id', `button-${product.id}-plus`);

    const inputQty = createDomElment('input', '', 'products__item-quantity', 'id', `input-${product.id}`);
    inputQty.value = 0;
    inputQty.setAttribute('disabled', true);
    const buttonSubs = createDomElment('button', '-', 'products__item-remove', 'id', `button-${product.id}-subs`);

    const productPrice = createDomElment('div', product.price, 'products__item-price', '', '');
    const productTotal = createDomElment('div', `${inputQty.value * product.price} €`, 'products__item-price', 'id', `total-price-${product.id}`);

    counter.appendChild(buttonSubs);

    buttonSubs.onclick = () => handleSubstract(product.id, inputQty.value, product.price);
    buttonPlus.onclick = () => handleAdd(product.id, inputQty.value, product.price);
    counter.appendChild(inputQty);
    counter.appendChild(buttonPlus);
    caption.appendChild(innertCaption);
    figure.appendChild(imageNode);
    figure.appendChild(caption);
    mainNode.appendChild(figure);
    mainNode.appendChild(counter);
    mainNode.appendChild(productPrice);
    mainNode.appendChild(productTotal);
    const principalNode = document.getElementById(nodeContainer);
    principalNode.appendChild(mainNode);
    updateShoppingCartView();
  });
}

exports.drawProductsTable = drawProductsTable;