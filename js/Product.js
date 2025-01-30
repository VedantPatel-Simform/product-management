const lower = document.getElementById("lower");

const Product = {
  products: [],

  init: function (document) {
    this.document = document;
    console.log(document);
    const savedProducts = localStorage.getItem("productList");
    this.products = savedProducts ? JSON.parse(savedProducts) : [];
    this.displayProduct();
  },

  addProduct: function (product) {
    this.products.push(product);
    this.displayProduct();
    localStorage.setItem("productList", JSON.stringify(this.products));
  },

  removeProduct: function (productId) {
    this.products = this.products.filter((product) => product.id !== productId);
    this.displayProduct();
    localStorage.setItem("productList", JSON.stringify(this.products));
  },

  editProduct: function (id, property, value) {
    this.products = this.products.map((product) => {
      if (product.id === id) {
        return { ...product, [property]: value };
      }
      return product;
    });
    this.displayProduct();
    localStorage.setItem("productList", JSON.stringify(this.products));
  },

  getAllProducts: function () {
    return this.products;
  },

  clearProducts: function () {
    this.products = [];
    localStorage.clear("productList");
    this.displayProduct();
  },

  displayProduct: function () {
    let innerText = "";

    for (let i = 0; i < this.products.length; i++) {
      let product = this.products[i];
      innerText += `<div class="item">
                <div class="image">
                  <img src="${product.image}" alt="${product.name}" />
                </div>
                <div>
                  <div class="name">${product.name}</div>
                  <div class="price">${product.price}</div>
                </div>
              </div>`;
    }
    const lower = document.getElementsByClassName("list")[0];
    lower.innerHTML = innerText;
  },
};

export default Product;
