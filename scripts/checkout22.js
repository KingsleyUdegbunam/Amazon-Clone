import {
  cart,
  removeItemFromCart,
  calculateCartQuantity,
} from "../data/cart.js";
import { products } from "../data/products.js";
import { formatCurrency } from "./utils/money.js";
import dayjs from "https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js";

const productSummaryContainer = document.querySelector(".js-order-summary");

function renderCheckout() {
  let cartSummaryHTML = "";

  function setDate(days) {
    const today = dayjs();

    const set = today.add(days, "day");
    return set.format("dddd, MMMM D");
  }

  cart.forEach((cartItem) => {
    let matchingitem;
    products.forEach((product) => {
      if (cartItem.productId === product.id) {
        matchingitem = product;

        const html = `
      <div class="cart-item-container js-cart-item-container-${product.id}">
          <div class="delivery-date js-delivery-date-${matchingitem.id}">
            Delivery date: ${setDate(7)}
          </div>

          <div class="cart-item-details-grid">
            <img class="product-image" src="${matchingitem.image}">

            <div class="cart-item-details">
              <div class="product-name">
                ${matchingitem.name}
              </div>
              <div class="product-price">
               $${formatCurrency(matchingitem.priceCents)}
              </div>
              <div class="product-quantity">
                <span>
                  Quantity: <span class="quantity-label js-quantity-label-${
                    matchingitem.id
                  }">${cartItem.quantity}</span>
                </span>
                <span class="update-quantity-link link-primary js-update-quantity" data-product-id = '${
                  matchingitem.id
                }'>
                  Update
                </span>
                <span class="delete-quantity-link js-delete-quantity-link link-primary" data-product-id = '${
                  matchingitem.id
                }'>
                  Delete
                </span>
              </div>
            </div>

            <div class="delivery-options">
              <div class="delivery-options-title">
                Choose a delivery option:
              </div>
              <div class="delivery-option">
                <input type="radio" checked data-product-id='${
                  matchingitem.id
                }' class="delivery-option-input js-delivery-option-input" data-shipping-id='free-${
          matchingitem.id
        }' name="delivery-option-${matchingitem.id}">
                <div>
                  <div class="delivery-option-date delivery-option-date-free-${
                    matchingitem.id
                  }" >
                    ${setDate(7)}
                  </div>
                  <div class="delivery-option-price">
                    FREE Shipping
                  </div>
                </div>
              </div>

              <div class="delivery-option">
                <input type="radio" class="delivery-option-input js-delivery-option-input" data-product-id='${
                  matchingitem.id
                }'data-shipping-id='mid-${
          matchingitem.id
        }' name="delivery-option-${matchingitem.id}">
                <div>
                  <div class="delivery-option-date delivery-option-date-mid-${
                    matchingitem.id
                  }">
                    ${setDate(3)}
                  </div>
                  <div class="delivery-option-price">
                    $4.99 - Shipping
                  </div>
                </div>
              </div>

              <div class="delivery-option">
                <input type="radio" class="delivery-option-input js-delivery-option-input" data-product-id='${
                  matchingitem.id
                }' data-shipping-id='high-${
          matchingitem.id
        }' name="delivery-option-${product.id}">
                <div>
                  <div class="delivery-option-date delivery-option-date-high-${
                    matchingitem.id
                  }">
                    ${setDate(1)}
                  </div>
                  <div class="delivery-option-price">
                    $9.99 - Shipping
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      `;

        cartSummaryHTML += html;
      }
    });
  });

  productSummaryContainer.innerHTML = cartSummaryHTML;
}

renderCheckout();

const quantityViewElem = document.querySelector(".js-cart-item-num");

function totalQuantity() {
  quantityViewElem.innerHTML = `${calculateCartQuantity()} Items`;
}

totalQuantity();

document.querySelectorAll(".js-delete-quantity-link").forEach((button) => {
  button.addEventListener("click", () => {
    const productId = button.dataset.productId;

    removeItemFromCart(productId);
    totalQuantity();

    document.querySelector(`.js-cart-item-container-${productId}`).remove();
  });
});

document.querySelectorAll(".js-update-quantity").forEach((button) => {
  const { productId } = button.dataset;
  let updateToggle;

  function updateItemQuantity() {
    const inputSpace = document.querySelector(
      `.js-update-quantity-input-${productId}`
    );

    const newValue = Number(inputSpace.value);

    if (newValue === 0) {
      removeItemFromCart(productId);
      document.querySelector(`.js-cart-item-container-${productId}`).remove();
      totalQuantity();
      console.log("hey");
    } else if (newValue < 0 || newValue > 100) {
      alert("Error. Cart quantity must be between 0 and 1000");
    } else {
      document.querySelector(
        `.js-quantity-label-${productId}`
      ).innerHTML = `${newValue}`;

      button.innerHTML = "Update";

      updateToggle = false;

      cart.forEach((cartItem) => {
        if (cartItem.productId === productId) {
          cartItem.quantity = newValue;

          localStorage.setItem("cart", JSON.stringify(cart));
          console.log("Updated item quantity");
          console.log(cartItem.quantity);
          totalQuantity();
        }
      });
    }
  }

  button.addEventListener("click", () => {
    if (!updateToggle) {
      const value = Number(
        document.querySelector(`.js-quantity-label-${productId}`).textContent
      );
      console.log(value);
      console.log(typeof value);

      document.querySelector(
        `.js-quantity-label-${productId}`
      ).innerHTML = `<input type = 'number' value='${value}' class='update-quantity-input js-update-quantity-input-${productId}'>`;

      button.innerHTML = "Save";

      updateToggle = true;
      const inputSpace = document.querySelector(
        `.js-update-quantity-input-${productId}`
      );

      if (inputSpace) {
        inputSpace.addEventListener("keydown", (event) => {
          if (event.key === "Enter") {
            updateItemQuantity();
            console.log("hey");
          }
        });
      }
    } else {
      updateItemQuantity();
    }
  });
});

document.querySelectorAll(".delivery-option-input").forEach((radioBtn) => {
  const { shippingId } = radioBtn.dataset;
  const { productId } = radioBtn.dataset;

  radioBtn.addEventListener("click", () => {
    console.log(shippingId);
    console.log(productId);

    const selectedDelivery = document.querySelector(
      `.js-delivery-date-${productId}`
    );

    const deliveryDate = document.querySelector(
      `.delivery-option-date-${shippingId}`
    );

    console.log(deliveryDate.innerHTML);
    selectedDelivery.innerHTML = `Delivery date: ${deliveryDate.innerHTML}`;
  });
});
