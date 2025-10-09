import { renderOrderSummary } from "./checkout/orderSummary.js";
import { renderPaymentSummary } from "./checkout/paymentSummary.js";
import { loadCart, loadCartFetch } from "../data/cart.js";
import { loadProductsFetch } from "../data/products.js";
//import "../data/backend/backend-practice.js";

async function loadPage() {
  try {
    //throw "error oo!";
    await loadProductsFetch();
    const value = await new Promise((resolve, reject) => {
      //throw "errortt";
      loadCart(() => {
        // reject("error reject");
        resolve("value3");
      });
    });

    console.log(value);
  } catch (error) {
    console.log("Unexpected error. Try again later.");
    console.log(error);
  }
  renderOrderSummary();
  renderPaymentSummary();
}

//loadPage();

async function loadPageAsync() {
  await Promise.all([loadProductsFetch(), loadCartFetch()]);
  renderOrderSummary();
  renderPaymentSummary();
}

loadPageAsync();

/* Promise.all([
  loadProductsFetch(),
  new Promise((resolve) => {
    loadCart(() => {
      resolve();
    });
  }),
]).then(() => {
  renderOrderSummary();
  renderPaymentSummary();
}); */

/* new Promise((resolve) => {
  loadProducts(() => {
    resolve();
  });
})
  .then(() => {
    return new Promise((resolve) => {
      loadCart(() => {
        resolve();
      });
    });
  })
  .then(() => {
    renderOrderSummary();
    renderPaymentSummary();
  }); */

/* loadProducts(() => {
  loadCart(() => {
    renderOrderSummary();
    renderPaymentSummary();
  });
}); */
