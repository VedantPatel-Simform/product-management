import Product from "./Product.js";
import { imageToBase64, generateUniqueId } from "./utility.js";
Product.init(document);
Product.displayProduct();
const form = document.getElementById("productForm");

form.onsubmit = async (event) => {
  event.preventDefault();
  const formData = new FormData(form);

  // Access specific form values
  const productName = formData.get("productName");
  const productDescription = formData.get("productDescription");
  const productImage = formData.get("productImage");
  const productPrice = parseFloat(formData.get("productPrice"));
  const imageBase64 = await imageToBase64(productImage);

  Product.addProduct({
    id: generateUniqueId(),
    name: productName,
    image: imageBase64,
    desc: productDescription,
    price: productPrice,
  });

  form.reset();
};

const clearProducts = document.getElementById("clear-all");

clearProducts.onclick = () => {
  Product.clearProducts();
};

const radios = document.querySelectorAll('input[name="sort"]');

radios.forEach((radio) => {
  radio.addEventListener("change", () => {
    const sortBy = document.querySelector('input[name="sort"]:checked').value;
    switch (sortBy) {
      case "id":
        Product.displayProduct(Product.sortProductsById());
        break;
      case "price":
        Product.displayProduct(Product.sortProductsByPrice());
        break;
      case "name":
        Product.displayProduct(Product.sortProductsByName());
        break;
    }
  });
});

const searchField = document.getElementById("searchField");
const searchBtn = document.getElementById("searchBtn");
let flag = 1;
searchBtn.onclick = () => {
  if (searchField.value) {
    if (flag) {
      const id = searchField.value;
      const product = Product.getProduct(id);
      console.log(product);
      if (product) {
        Product.displayProduct([product]);
      } else {
        Product.displayProduct([]);
      }
      flag = 0;
      searchBtn.textContent = "Return";
    } else {
      flag = 1;
      Product.displayProduct();
      searchBtn.textContent = "Search";
      searchField.value = "";
    }
  }
};

searchField.oninput = () => {
  flag = 1;
  searchBtn.textContent = "Search";
};
