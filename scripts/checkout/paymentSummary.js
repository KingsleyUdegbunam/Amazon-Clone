import { cart, calculateCartQuantity } from "../../data/cart.js";
import { getDeliveryOption } from "../../data/deliveryOptions.js";
import { formatCurrency } from "../utils/money.js";
import { getProduct } from "../../data/products.js";

export function renderPaymentSummary() {
  let ItemTotalPriceCents = 0;
  let shippingTotalCents = 0;
  let itemNumber = 0;

  cart.forEach((cartItem) => {
    const productId = cartItem.productId;
    const deliveryOptionId = cartItem.deliveryOptionId;

    //the functions below gets the product and deliveryOption that matches with our product ID and deliveryOption ID.
    const matchingProduct = getProduct(productId);
    const deliveryOption = getDeliveryOption(deliveryOptionId);

    //console.log(deliveryOption);
    //console.log(matchingProduct);

    ItemTotalPriceCents += matchingProduct.priceCents * cartItem.quantity;

    shippingTotalCents += deliveryOption.priceCents;
  });

  const totalBeforeTaxCents = ItemTotalPriceCents + shippingTotalCents;
  const taxedTotalCents = totalBeforeTaxCents * 0.1;
  const orderTotalCents = totalBeforeTaxCents + taxedTotalCents;

  const paymentSummaryHTML = `
<div class="payment-summary-title">
          Order Summary
        </div>

        <div class="payment-summary-row">
          <div>Items (${calculateCartQuantity()}):</div>
          <div class="payment-summary-money">
            $${formatCurrency(ItemTotalPriceCents)}
          </div>
        </div>



        <div class="payment-summary-row">
          <div>Shipping &amp; handling:</div>
          <div class="payment-summary-money">
            $${formatCurrency(shippingTotalCents)}
          </div>
        </div>

        <div class="payment-summary-row subtotal-row">
          <div>Total before tax:</div>
          <div class="payment-summary-money">
            $${formatCurrency(totalBeforeTaxCents)}
          </div>
        </div>

        <div class="payment-summary-row">
          <div>Estimated tax (10%):</div>
          <div class="payment-summary-money">
            $${formatCurrency(taxedTotalCents)}
          </div>
        </div>

        <div class="payment-summary-row total-row">
          <div>Order total:</div>
          <div class="payment-summary-money">
            $${formatCurrency(orderTotalCents)}
          </div>
        </div>

        <button class="place-order-button button-primary">
          Place your order
        </button>

`;

  document.querySelector(".js-payment-summary").innerHTML = paymentSummaryHTML;
}
