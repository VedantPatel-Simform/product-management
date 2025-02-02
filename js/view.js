import Product from "./Product.js";
Product.init(document);

// Get id from the URL
const url = window.location.href;
const urlParams = new URLSearchParams(new URL(url).search);
const id = urlParams.get("id");

const productName = document.getElementById("productName");
const productImage = document.getElementById("productImage");
const productPrice = document.getElementById("price");
const productDescription = document.getElementById("description");
const editBtn = document.getElementById("edit");
const deleteBtn = document.getElementById("delete");

const productId = document.getElementById("productId");

const Prod = Product.getProduct(id);

productName.textContent = Prod.name;
productImage.src = Prod.image;
productPrice.innerHTML = "<span>&#8377</span>  " + Prod.price;
productDescription.textContent = Prod.desc;
productId.textContent = "#" + Prod.id;
editBtn.href = `edit.html?id=${id}`;

deleteBtn.onclick = () => {
  Product.removeProduct(id);
  location.replace("index.html");
};
