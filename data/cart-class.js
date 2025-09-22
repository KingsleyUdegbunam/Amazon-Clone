class Cart {
  cartItems;
  #localStorageKey;

  constructor(localStorageKey) {
    this.#localStorageKey = localStorageKey;

    this.#loadCartFromStorage();
  }

  #loadCartFromStorage() {
    this.cartItems = JSON.parse(
      localStorage.getItem(this.#localStorageKey)
    ) || [
      {
        productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
        quantity: 2,
        deliveryOptionId: "1",
      },
      {
        productId: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
        quantity: 1,
        deliveryOptionId: "2",
      },
    ];
  }

  saveToStorage() {
    localStorage.setItem(this.#localStorageKey, JSON.stringify(this.cartItems));
  }

  addToCart(productId) {
    let matchingItem;

    this.cartItems.forEach((cartItem) => {
      if (productId === cartItem.productId) {
        matchingItem = cartItem;
      }
    });

    if (matchingItem) {
      matchingItem.quantity++;
    } else {
      const product = {
        productId,
        quantity: 1,
        deliveryOptionId: "1",
      };
      this.cartItems.push(product);
    }

    this.saveToStorage();
  }

  removeItemFromCart(productId) {
    const newCart = [];

    this.cartItems.forEach((cartItem) => {
      if (cartItem.productId !== productId) {
        newCart.push(cartItem);
      }
    });

    this.cartItems = newCart;
    this.saveToStorage();
  }

  updateDeliveryOptionId(productId, deliveryOptionId) {
    let matchingItem = "";

    this.cartItems.forEach((cartItem) => {
      if (productId === cartItem.productId) {
        matchingItem = cartItem;
      }
    });

    matchingItem.deliveryOptionId = deliveryOptionId;
    this.saveToStorage();
  }

  calculateCartQuantity() {
    //Accumulator to hold the total number of quantity in cart.

    let cartQuantity = 0;

    this.cartItems.forEach((cartItem) => {
      cartQuantity += cartItem.quantity;
    });

    return cartQuantity;
  }
}

const cart = new Cart("cart-oop");
const businessCart = new Cart("cart-business");

/* cart.localStorageKey = "cart-oop";
businessCart.localStorageKey = "cart-business";

cart.loadCartFromStorage();
businessCart.loadCartFromStorage(); */

console.log(cart);
console.log(businessCart);

//console.log(businessCart instanceof Cart);
