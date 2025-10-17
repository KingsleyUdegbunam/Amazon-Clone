import { cart, addToCart, calculateCartQuantity } from "../data/cart.js ";
import {
  products,
  loadProducts,
  loadProductsFetch,
  asyncloadProductsFetch,
} from "../data/products.js";

//render page default
async function renderPage(param) {
  await asyncloadProductsFetch(param);
  renderProductGrid();
}

const searchBar = document.querySelector(".js-search-bar");
const searchBtn = document.querySelector(".js-search-btn");

function searchItem() {
  const baseAdress = "amazon.html";
  const searchValue = searchBar.value;
  console.log(searchValue);
  if (searchValue.trim()) {
    window.location.assign(
      `${baseAdress}?search=${encodeURIComponent(searchValue)}`
    );
    searchBar.value = searchValue;
  }
}

//Search product using the search button and enter btn
searchBtn.addEventListener("click", () => {
  searchItem();
});

searchBar.addEventListener("keypress", (event) => {
  if (event.key === "Enter") {
    //searchItem();
    searchBtn.click();
  }
});

async function getSearchInput() {
  const url = new URL(window.location.href);
  const param = url.searchParams.get("search");

  return param;
}

if (window.location.search) {
  await renderPage(getSearchInput);
  renderProductGrid();
} else {
  renderPage();
}

//retaining value
const url = new URL(window.location.href);
//  const searchParam =

//renderPage Display
function renderProductGrid() {
  let productsHTML = "";

  products.forEach((product) => {
    productsHTML += `
  <div class="product-container">
        <div class="product-image-container">
          <img class="product-image" src="${product.image}">
        </div>

        <div class="product-name limit-text-to-2-lines">
         ${product.name}
        </div>

        <div class="product-rating-container">
          <img class="product-rating-stars" src= '${product.getStarsUrl()}'>
          <div class="product-rating-count link-primary">
           ${product.rating.count}
          </div>
        </div>

        <div class="product-price">
        ${product.getPrice()}
        </div>

        <div class="product-quantity-container">
          <select class='js-select' data-product-id=${product.id}>
            <option selected value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
            <option value="7">7</option>
            <option value="8">8</option>
            <option value="9">9</option>
            <option value="10">10</option>
          </select>
        </div>

        ${product.extraInfoHTML()}

        <div class="product-spacer"></div>

        <div class="added-to-cart" data-product-id=${product.id}>
          <img src="images/icons/checkmark.png">
          Added
        </div>

        <div class='js-added-to-cart-display'></div>
        <button class="add-to-cart-button button-primary js-add-to-cart-button" data-product-id = '${
          product.id
        }' >
          Add to Cart
        </button>
      </div>`;
  });
  const productsHolderElem = document.querySelector(".js-product-grid");
  if (productsHolderElem) {
    productsHolderElem.innerHTML = productsHTML;
  }

  //This element is what holds the number of product in the cart
  const cartQuantityElem = document.querySelector(".js-cart-quantity");

  if (cartQuantityElem) {
    cartQuantityElem.innerHTML = calculateCartQuantity();
  }

  //console.log(document.querySelectorAll(".added-to-cart"));
  document.querySelectorAll(".js-add-to-cart-button").forEach((button) => {
    button.addEventListener("click", () => {
      const { productId } = button.dataset;
      //const productId = button.dataset.productId;
      //console.log(button.dataset);
      const selector = document.querySelector(
        `[data-product-id='${productId}']`
      );
      let value;

      document.querySelectorAll(".js-select").forEach((selectBtn) => {
        const productIdent = selectBtn.dataset.productId;

        if (productId === productIdent) {
          value = Number(selectBtn.value);
        }
      });

      /* const value = Number(selector.value);
      console.log(selector);
      console.log(typeof value);*/

      addToCart(productId, value);

      cartQuantityElem.innerHTML = calculateCartQuantity();
    });
  });
}

//loadProducts(renderProductGrid);

/* await asyncloadProductsFetch();
renderProductGrid(); */
