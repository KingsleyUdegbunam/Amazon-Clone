export let cart;

loadCartFromStorage();

export function checkProductQuantity(productId) {
  let productQuantity = 0;
  cart.forEach((product) => {
    if (product.productId === productId) {
      productQuantity = product.quantity;
    }
  });

  return productQuantity;
}

export function findProduct(productId) {
  let matchingItem;
  cart.forEach((item) => {
    if (item.productId === productId) {
      matchingItem = item;
    }
  });

  return matchingItem;
}
export function updateProductQuantity(productId, value) {
  const product = findProduct(productId);

  const newQuantity = Number(value);

  if (newQuantity < 0) {
    alert("item can not be less than 0");
  } else if ((newQuantity > 0) & (newQuantity <= 100)) {
    product.quantity = newQuantity;
  } else if (newQuantity > 100) {
    alert("Item's quantity cannot be greater than 100");
  } else if (newQuantity === 0) {
    removeItemFromCart(productId);
  } else {
    alert("Quantity must be a number.");
  }

  saveToStorage();
}

export function loadCartFromStorage() {
  cart =
    JSON.parse(localStorage.getItem("cart")) ||
    [
      /* {
      productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
      quantity: 2,
      deliveryOptionId: "1",
    },
    {
      productId: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
      quantity: 1,
      deliveryOptionId: "2",
    }, */
    ];
}
export function saveToStorage() {
  localStorage.setItem("cart", JSON.stringify(cart));
}

export function addToCart(productId, quantity) {
  let matchingItem;

  cart.forEach((cartItem) => {
    if (productId === cartItem.productId) {
      matchingItem = cartItem;
    }
  });

  if (matchingItem) {
    matchingItem.quantity += quantity;
  } else {
    const product = {
      productId,
      quantity: quantity,
      deliveryOptionId: "1",
    };
    cart.push(product);
  }

  saveToStorage();
}

export function removeItemFromCart(productId) {
  const newCart = [];

  cart.forEach((cartItem) => {
    if (cartItem.productId !== productId) {
      newCart.push(cartItem);
    }
  });

  cart = newCart;
  saveToStorage();
}

export function calculateCartQuantity() {
  //Accumulator to hold the total number of quantity in cart.

  let cartQuantity = 0;

  cart.forEach((cartItem) => {
    cartQuantity += cartItem.quantity;
  });

  return cartQuantity;
}

export function updateDeliveryOptionId(productId, deliveryOptionId) {
  let matchingItem = "";

  cart.forEach((cartItem) => {
    if (productId === cartItem.productId) {
      matchingItem = cartItem;
    }
  });

  matchingItem.deliveryOptionId = deliveryOptionId;
  saveToStorage();
}

export async function loadCartFetch() {
  const response = await fetch("https://supersimplebackend.dev/cart");
  const cart = await response.text();
  console.log("This is", cart);
}

export function loadCart(fun) {
  const xhr = new XMLHttpRequest();

  xhr.addEventListener("load", () => {
    console.log(xhr.response);
    fun();
  });

  xhr.open("GET", "https://supersimplebackend.dev/cart");
  xhr.send();
}
