import { orders } from "../data/orders.js";
import { formatCurrency } from "../scripts/utils/money.js";
import { getProduct, loadProductsFetch } from "../data/products.js";
import { checkProductQuantity } from "../data/cart.js";
import dayjs from "https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js";

console.log(orders);
async function renderOrderPage() {
  await loadProductsFetch();

  const orderPlaceHolder = document.querySelector(".js-orders-container");
  //console.log(orderPlaceHolder.innerHTML);
  let orderHTML = "";

  orders.forEach((order) => {
    let orderedProducts = "";

    const orderedDay = dayjs(order.orderTime).format("MMMM D");

    //const getProduct(order.id);
    order.products.forEach((product) => {
      const productId = product.productId;

      //handledProduct gives us access the product properties like image and name
      const handledProduct = getProduct(productId);

      const quant = checkProductQuantity(productId);

      const deliveryDay = product.estimatedDeliveryTime;
      const readableDeliveryDay = dayjs(deliveryDay).format("MMMM D");
      console.log(readableDeliveryDay);

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
              <button class="buy-again-button button-primary">
                <img class="buy-again-icon" src="images/icons/buy-again.png">
                <span class="buy-again-message">Buy it again</span>
              </button>
            </div>

            <div class="product-actions">
              <a href="tracking.html?orderId=123&productId=456">
                <button class="track-package-button button-secondary">
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

  console.log(new Date().toISOString());
}

renderOrderPage();
