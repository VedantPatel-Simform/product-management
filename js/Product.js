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

  displayProduct: function (prod = this.products) {
    console.log("prod = ", prod);
    let innerText = "";
    for (let i = 0; i < prod.length; i++) {
      let product = prod[i];
      innerText += `<div class="item">
                <div class="image">
                  <img src="${product.image}" alt="${product.name}" />
                </div>
                <div class="details">
                  <div class="name">${product.name}</div>
                  <div class="price"><span>&#8377</span>${product.price}</div>
                </div>
                <div>
                  <button class="view-btn">
                    <a href="view.html?id=${product.id}">View</a>
                  </button>
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

  sortProductsById: function () {
    return this.products.sort((a, b) => a.id.localeCompare(b.id));
  },

  sortProductsByName: function () {
    return this.products.sort((a, b) => a.name.localeCompare(b.name));
  },

  sortProductsByPrice: function () {
    return this.products.sort((a, b) => a.price - b.price);
  },
};

export default Product;
