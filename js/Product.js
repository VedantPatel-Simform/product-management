const lower = document.getElementById("lower");

const Product = {
  products: [],

  init: function (document) {
    this.document = document;
    const savedProducts = localStorage.getItem("productList");
    this.products = savedProducts ? JSON.parse(savedProducts) : [];
  },

  getUpdatedDocument: function () {
    return this.document;
  },

  addProduct: function (product) {
    this.products.push(product);
    this.displayProduct();
    localStorage.setItem("productList", JSON.stringify(this.products));
  },

  removeProduct: function (productId) {
    this.products = this.products.filter((product) => product.id !== productId);
    // this.displayProduct();
    localStorage.setItem("productList", JSON.stringify(this.products));
  },

  editProduct: function (id, property, value) {
    this.products = this.products.map((product) => {
      if (product.id === id) {
        return { ...product, [property]: value };
      }
      return product;
    });
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

  getProduct: function (id) {
    return this.products.find((prod) => prod.id == id);
  },

  displayProduct: function () {
    let innerText = "";
    for (let i = 0; i < this.products.length; i++) {
      let product = this.products[i];
      innerText += `<div class="item">
                <div class="image">
                <a href="view.html?id=${product.id}">
                  <img src="${product.image}" alt="${product.name}" />
                   </a>
                </div>
                <div>
                  <div class="name">${product.name}</div>
                  <div class="price">${product.price}</div>
                </div>
                <div>
                  <button class="delete-btn" data-id="${product.id}">Delete</button>
                  <button class="edit-btn">
                  <a href="edit.html?id=${product.id}">Edit</a>
                  </button>
                </div>
              </div>`;
    }
    const lower = document.getElementsByClassName("list")[0];
    lower.innerHTML = innerText;

    //add delete button feature
    const deleteBtns = document.querySelectorAll(".delete-btn");
    deleteBtns.forEach((btn, i) => {
      const id = btn.getAttribute("data-id");
      btn.addEventListener("click", (e) => {
        this.removeProduct(id);
        this.displayProduct();
      });
    });
  },
};

export default Product;
