const products = [
  {
    id: 1, name: 'Goku POP', price: 5.00, code: 'GOKU'
  },
  {
    id: 2, name: 'Naruto POP', price: 20.00, code: 'NARU'
  },
  {
    id: 3, name: 'Luffy POP', price: 7.50, code: 'LUF'
  }
];

const cart = {
  products: [
  ]
};

const promotions = [
  {
    code: 'GOKU',
    name: '2x1 Goku POP Offer',
    price: 0.5,
    condition: 'fquantityEven'
  },
  {
    code: 'NARU',
    name: 'x3 Naruto POP Offer',
    price: 0.95,
    condition: 'threemore'
  }
];

exports.products = products;
exports.cart = cart;
exports.promotions = promotions;