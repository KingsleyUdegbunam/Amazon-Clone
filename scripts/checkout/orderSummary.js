import {
  cart,
  removeItemFromCart,
  calculateCartQuantity,
  updateDeliveryOptionId,
} from "../../data/cart.js";
import { products } from "../../data/products.js";
import { formatCurrency } from "../utils/money.js";
import dayjs from "https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js";
import {
  deliveryOptions,
  getDeliveryOption,
  calculateDeliveryDate,
} from "../../data/deliveryOptions.js";
import { renderPaymentSummary } from "./paymentSummary.js";

export function renderOrderSummary() {
  const productSummaryContainer = document.querySelector(".js-order-summary");
  let cartSummaryHTML = "";

  cart.forEach((cartItem) => {
    let matchingItem;

    products.forEach((product) => {
      if (cartItem.productId === product.id) {
        matchingItem = product;

        const deliveryOptionId = cartItem.deliveryOptionId;
        const deliveryOption = getDeliveryOption(deliveryOptionId);

        const dateString = calculateDeliveryDate(deliveryOption);
        const html = `
      <div class="cart-item-container js-cart-item-container js-cart-item-container-${
        product.id
      }">
          <div class="delivery-date js-delivery-date-${product.id}">
            Delivery date: ${dateString}
          </div>

          <div class="cart-item-details-grid">
            <img class="product-image" src="${matchingItem.image}">

            <div class="cart-item-details">
              <div class="product-name">
                ${matchingItem.name}
              </div>
              <div class="product-price">
               $${formatCurrency(matchingItem.priceCents)}
              </div>
              <div class="product-quantity js-product-quantity-${
                matchingItem.id
              }">
                <span>
                  Quantity: <span class="quantity-label">${
                    cartItem.quantity
                  }</span>
                </span>
                <span class="update-quantity-link link-primary">
                  Update
                </span>
                <span class="delete-quantity-link js-delete-quantity-link link-primary js-delete-quantity-link-${
                  matchingItem.id
                }" data-product-id = '${matchingItem.id}'>
                  Delete
                </span>
              </div>
            </div>

            <div class="delivery-options">
              <div class="delivery-options-title">
                Choose a delivery option:
              </div>
              ${renderDeliveryOption(matchingItem, cartItem)}
            </div>
          </div>
        </div>
      `;

        cartSummaryHTML += html;
      }

      function renderDeliveryOption(matchingItem, cartItem) {
        let html = "";

        deliveryOptions.forEach((deliveryOption) => {
          const dateString = calculateDeliveryDate(deliveryOption);

          const isChecked =
            deliveryOption.id === cartItem.deliveryOptionId ? "checked" : "";

          const priceString =
            deliveryOption.priceCents === 0
              ? "FREE"
              : `$${formatCurrency(deliveryOption.priceCents)} -`;

          html += `
          <div class="delivery-option js-delivery-option" data-product-id='${matchingItem.id}' data-delivery-option-id='${deliveryOption.id}'>
                <input type="radio" ${isChecked} class="delivery-option-input js-delivery-option-input" name="delivery-option-${matchingItem.id}" >
                <div>
                  <div class="delivery-option-date">
                    ${dateString}
                  </div>
                  <div class="delivery-option-price">
                    ${priceString} Shipping
                  </div>
                </div>
              </div>

          `;
        });

        return html;
      }
    });
  });

  productSummaryContainer.innerHTML = cartSummaryHTML;

  const quantityViewElem = document.querySelector(".js-cart-item-num");

  function totalQuantity() {
    quantityViewElem.innerHTML = `${calculateCartQuantity()} Items`;
  }

  //LOOK INTO MOVING THIS FUNCTION TO ITS OWN FILE
  //totalQuantity();

  document.querySelectorAll(".js-delete-quantity-link").forEach((button) => {
    button.addEventListener("click", () => {
      const productId = button.dataset.productId;

      removeItemFromCart(productId);
      //totalQuantity();

      renderPaymentSummary();
      renderOrderSummary();
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

  document.querySelectorAll(".js-delivery-option").forEach((element) => {
    element.addEventListener("click", () => {
      const { deliveryOptionId, productId } = element.dataset;

      /*  console.log(deliveryOptionId);
      console.log(productId); */
      updateDeliveryOptionId(productId, deliveryOptionId);
      renderOrderSummary();

      renderPaymentSummary();
    });
  });
}
