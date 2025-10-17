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
               ${matchingItem.getPrice()}
              </div>
              <div class="product-quantity js-product-quantity-${
                matchingItem.id
              }">
              
                <span>
                  Quantity: 
                  <input class='js-quantity-input quantity-input quantity-input-${
                    product.id
                  }' type='text' data-product-id=${product.id}> 
                  <span class="quantity-label js-quantity-label js-item-quantity-${
                    product.id
                  }" data-product-id='${matchingItem.id}'>${
          cartItem.quantity
        }</span>
                </span>
                 
                <span class="update-quantity-link link-primary js-update-quantity" data-product-id='${
                  product.id
                }'>
                  Update
                </span>
                <span class="delete-quantity-link js-delete-quantity-link link-primary" data-product-id='${
                  matchingItem.id
                }'>
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
  totalQuantity();

  document.querySelectorAll(".js-update-quamntity").forEach((updateBtn) => {
    updateBtn.addEventListener("click", () => {
      console.log(updateBtn);
    });
  });

  document.querySelectorAll(".js-delete-quantity-link").forEach((button) => {
    button.addEventListener("click", () => {
      const productId = button.dataset.productId;

      removeItemFromCart(productId);

      renderPaymentSummary();
      renderOrderSummary();
    });
  });

  const updadteToggles = {};

  document.querySelectorAll(".js-update-quantity").forEach((button) => {
    button.addEventListener("click", () => {
      const { productId } = button.dataset;

      //toggle the curernt state(true/false)
      updadteToggles[productId] = !updadteToggles[productId];

      const updateField = document.querySelector(
        `.quantity-input-${productId}`
      );

      const currentQuantityElem = document.querySelector(
        `.js-item-quantity-${productId}`
      );

      const currentQuantityValue = document.querySelector(
        `.js-item-quantity-${productId}`
      ).textContent;

      if (updadteToggles[productId]) {
        updateField.classList.add("quantity-input-active");
        currentQuantityElem.classList.add("toggle-off-quantity-label");

        console.log(currentQuantityValue);
        updateField.value = currentQuantityValue;

        console.log(currentQuantityValue);
      } else {
        const value = updateField.value;
        currentQuantityElem.textContent = value;

        updateField.classList.remove("quantity-input-active");
        currentQuantityElem.classList.remove("toggle-off-quantity-label");
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
