import Product from "./Product.js";
import { imageToBase64, generateUniqueId } from "./utility.js";

const form = document.getElementById("productForm");

Product.init(document);

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

  console.log(Product.getAllProducts());
  form.reset();
};

const clearProducts = document.getElementById("clear-all");

clearProducts.onclick = () => {
  console.log(Product.products[0].image);
  Product.clearProducts();
};
