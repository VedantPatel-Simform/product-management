import Product from "./Product.js";
import { imageToBase64 } from "./utility.js";
Product.init(document);

// Get id from the URL
const url = window.location.href;
const urlParams = new URLSearchParams(new URL(url).search);
const id = urlParams.get("id");

const editProd = Product.getProduct(id);

const productForm = document.getElementById("productForm");
const productName = document.getElementById("productName");
const productImage = document.getElementById("productImage");
const previewImage = document.getElementById("previewImage");
const productPrice = document.getElementById("productPrice");
const productDescription = document.getElementById("productDescription");

productName.value = editProd.name;
productPrice.value = editProd.price;
productDescription.value = editProd.desc;
previewImage.src = editProd.image;

let base64url;
productImage.addEventListener("change", async (event) => {
  const formData = new FormData(productForm);
  const image = formData.get("productImage");
  if (image.name) {
    base64url = await imageToBase64(image);
  } else {
    base64url = editProd.image;
  }
  previewImage.src = base64url;
});

productForm.onsubmit = async (event) => {
  event.preventDefault();
  const formData = new FormData(productForm);
  const name = formData.get("productName");
  const price = formData.get("productPrice");
  const desc = formData.get("productDescription");
  const image = formData.get("productImage");
  if (image.name) {
    base64url = await imageToBase64(image);
  } else {
    base64url = editProd.image;
  }

  Product.editProduct(id, "name", name);
  Product.editProduct(id, "price", price);
  Product.editProduct(id, "desc", desc);
  Product.editProduct(id, "image", base64url);
  location.replace("index.html");
};
