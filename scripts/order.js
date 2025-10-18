import { orders } from "../data/orders.js";
import { formatCurrency } from "../scripts/utils/money.js";
import { getProduct, loadProductsFetch } from "../data/products.js";
import { checkProductQuantity, calculateCartQuantity } from "../data/cart.js";
import dayjs from "https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js";
import { addToCart } from "../data/cart.js";

//console.log(orders);
function resetCart() {}

async function renderOrderPage() {
  // localStorage.removeItem("cart");
  await loadProductsFetch();

  const orderPlaceHolder = document.querySelector(".js-orders-container");
  let orderHTML = "";

  document.querySelector(".js-cart-quantity").innerHTML =
    calculateCartQuantity();

  orders.forEach((order) => {
    let orderedProducts = "";
    console.log(order);

    function orderDay() {}
    const orderedDay = dayjs(order.orderTime).format("MMMM D");

    //const getProduct(order.id);
    order.products.forEach((product) => {
      const productId = product.productId;

      //handledProduct gives us access the product properties like image and name
      const handledProduct = getProduct(productId);

      const quant = product.quantity;

      const deliveryDay = product.estimatedDeliveryTime;
      const readableDeliveryDay = dayjs(deliveryDay).format("MMMM D");

      const html = `
      
          
            <div class="product-image-container">
              <img src=${handledProduct.image}>
            </div>

            <div class="product-details">
              <div class="product-name">
                ${handledProduct.name}
              </div>
              <div class="product-delivery-date">
                Arriving on: ${readableDeliveryDay}
              </div>
              <div class="product-quantity">
                Quantity: ${quant}
              </div>
              <button class="buy-again-button button-primary js-buy-again-btn" data-product-id = ${productId}>
                <img class="buy-again-icon" src="images/icons/buy-again.png">
                <span class="buy-again-message">Buy it again</span>
              </button>
            </div>

            <div class="product-actions">
              <a href="tracking.html?orderId=${order.id}&productId=${product.productId}">
                <button class="track-package-button button-secondary js-tracking-btn">
                  Track package
                </button>
              </a>
            </div>
         
      `;

      orderedProducts += html;

      //console.log(handledProduct);
      // console.log(quant);
    });
    const html = `
    <div class="order-container">

          <div class="order-header">
            <div class="order-header-left-section">
              <div class="order-date">
                <div class="order-header-label">Order Placed:</div>
                <div>${orderedDay}</div>
              </div>
              <div class="order-total">
                <div class="order-header-label">Total:</div>
                <div>${formatCurrency(order.totalCostCents)}</div>
              </div>
            </div>

            <div class="order-header-right-section">
              <div class="order-header-label">Order ID:</div>
              <div>${order.id}</div>
            </div>
          </div>
          <div class="order-details-grid">
          ${orderedProducts}
         </div>
        </div>
    `;

    orderHTML += html;
  });

  //console.log(orderHTML);
  orderPlaceHolder.innerHTML = orderHTML;

  //console.log(new Date().toISOString());
}

renderOrderPage(resetCart).then(() => {
  document.querySelectorAll(".js-buy-again-btn").forEach((button) => {
    button.addEventListener("click", () => {
      const productId = button.dataset.productId;

      addToCart(productId);

      document.querySelector(".js-cart-quantity").innerHTML =
        calculateCartQuantity();

      //const product = getProduct(productId);
    });
  });

  document.querySelectorAll(".js-tracking-btn").forEach((trackBtn) => {
    trackBtn.addEventListener("click", () => {
      /* console.log("hello");

      const url = new URL(window.location.href);
      console.log(url); */
    });
  });
});
