import dayjs from "https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js";
import { orders, getOrder } from "../data/orders.js";
import { loadProductsFetch, getProduct } from "../data/products.js";
import { calculateCartQuantity } from "../data/cart.js";

const cartQuantityElem = document.querySelector(".js-cart-quantity");
cartQuantityElem.innerHTML = calculateCartQuantity();

const url = new URL(window.location.href);

const orderId = url.searchParams.get("orderId");
const productId = url.searchParams.get("productId");

console.log(productId);
console.log(orderId);

const order = getOrder(orderId);
console.log(order);
const orderDay = order.orderTime;

//productTracked contains the arrivinng date and quantity
let productTracked = "";
order.products.forEach((product) => {
  if (productId === product.productId) {
    productTracked = product;
  }
});

console.log(productTracked);

//productDelivery Date here
const deliveryDay = productTracked.estimatedDeliveryTime;

const readableDeliveryDay = dayjs(deliveryDay).format("dddd, MMMM D");

console.log(readableDeliveryDay);
async function renderTrackingPage() {
  await loadProductsFetch();

  //product contains the product image, and name
  const product = getProduct(productId);
  console.log(product);

  //calculateDeliveryProgress
  const orderTime = dayjs(orderDay).format("YYYY-MM-D");
  console.log(orderTime);

  const today = dayjs();
  const currentTime = today.format("YYYY-MM-D");

  const deliveryTime = dayjs(deliveryDay);

  const currentOrderTimeDiff = today.diff(orderTime, "day");
  const deliveryOrderTimeDiff = deliveryTime.diff(orderTime, "day");

  const deliveryProgress = (currentOrderTimeDiff / deliveryOrderTimeDiff) * 100;

  console.log(deliveryProgress);

  if (deliveryProgress <= 49) {
  }

  const trackingHTML = `
      <div class="js-tracking-content">
        <div class="delivery-date">
          Arriving on ${readableDeliveryDay}
        </div>

        <div class="product-info">
          ${product.name}
          Black and Gray Athletic Cotton Socks - 6 Pairs
        </div>

        <div class="product-info">
          Quantity: ${productTracked.quantity}
        </div>

        <img class="product-image" src=${product.image}>

        <div class="progress-labels-container js-progress-labels-container">
          <div class="progress-label">
            Preparing
          </div>
          <div class="progress-label current-status">
            Shipped
          </div>
          <div class="progress-label">
            Delivered
          </div>
        </div>

        <div class="progress-bar-container">
          <div class="progress-bar" style= 'width:${deliveryProgress}%'></div>
        </div>
      </div>
      `;

  document.querySelector(".js-tracking-content").innerHTML = trackingHTML;

  const parent = document.querySelector(".js-progress-labels-container");

  const preparing = parent.children[0];
  const shipped = parent.children[1];
  const delivered = parent.children[2];

  console.log(parent);
  console.log(preparing);
  console.log(shipped);
  console.log(delivered);

  if (deliveryProgress <= 49) {
    preparing.classList.add("current-status");

    shipped.classList.remove("current-status");
    delivered.classList.remove("current-status");
  } else if (deliveryProgress > 49 && deliveryProgress <= 99) {
    preparing.classList.remove("current-status");

    shipped.classList.add("current-status");

    delivered.classList.remove("current-status");
  } else if (deliveryProgress > 99) {
    preparing.classList.remove("current-status");

    shipped.classList.remove("current-status");

    delivered.classList.add("current-status");
  }
}

renderTrackingPage();

/* const currentOrderTimeDiff = today.diff(orderTime, "day");
const deliveryOrderTimeDiff = deliveryTime.diff(orderTime, "day");

console.log(typeof currentOrderTimeDiff);

console.log(deliveryOrderTimeDiff);

console.log(currentOrderTimeDiff); */
