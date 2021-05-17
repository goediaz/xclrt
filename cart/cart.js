// eslint-disable-next-line no-undef

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

// FIXME
// This is a way long mehtod, due the quantity of html elements, would be good to see if I can
// reduce the quantity of lines.
function drawProductsTable(products, nodeContainer) {
  products.forEach((product) => {
    const mainNode = createDomElment('li', '', 'products__item', 'id', `item-${product.id}`);
    const figure = createDomElment('figure', '', 'products__item-image-container', '', '');
    const imageNode = createDomElment('img', '', 'products__item-image', 'src', `./public/images/${product.id}.jpg`);
    const innertCaption = createDomElment('strong', `Product Code ${product.code}`, '', '', '');
    const caption = createDomElment('span', `${product.name}`, 'products__item-name', '', '');
    const counter = createDomElment('div', '', 'products__item-counter', '', '');
    const buttonPlus = createDomElment('button', '+', 'products__item-add', 'id', `button-${product.id}-plus`);
    const inputQty = createDomElment('input', '', 'products__item-quantity', 'id', `button-${product.id}-plus`);
    const buttonSubs = createDomElment('button', '-', 'products__item-remove', 'id', `button-${product.id}-subs`);
    const productPrice = createDomElment('div', product?.price, 'products__item-price', '', '');
    const productTotal = createDomElment('div', '0 $', 'products__item-price', 'id', `total-price-${product.id}`);

    counter.appendChild(buttonSubs);
    inputQty.value = 0;
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
  });
}

// eslint-disable-next-line no-undef
drawProductsTable(products, 'product-list-container');
