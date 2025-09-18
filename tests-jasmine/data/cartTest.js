import { addToCart, cart, loadCartFromStorage } from "../../data/cart.js";

describe("Test suite: addToCart", () => {
  it("add an existing product to the cart", () => {
    spyOn(localStorage, "getItem").and.callFake(() => {
      return JSON.stringify([
        {
          productId: "c2a82c5e-aff4-435f-9975-517cfaba2ece",
          quantity: 1,
          deliveryOptionId: "1",
        },
      ]);
    });
    loadCartFromStorage();
    spyOn(localStorage, "setItem");
    addToCart("c2a82c5e-aff4-435f-9975-517cfaba2ece");

    console.log(cart);

    expect(cart[0].quantity).toEqual(2);
    expect(cart.length).toEqual(1);
    expect(cart).toEqual([
      {
        productId: "c2a82c5e-aff4-435f-9975-517cfaba2ece",
        quantity: 2,
        deliveryOptionId: "1",
      },
    ]);
  });

  it("adds a new product to the cart", () => {
    spyOn(localStorage, "getItem").and.callFake(() => {
      return JSON.stringify([]);
    });
    loadCartFromStorage();

    spyOn(localStorage, "setItem");

    addToCart("aad29d11-ea98-41ee-9285-b916638cac4a");
    expect(cart.length).toEqual(1);
    expect(localStorage.setItem).toHaveBeenCalledTimes(1);
    expect(localStorage.setItem).toHaveBeenCalledWith(
      "cart",
      JSON.stringify([
        {
          productId: "aad29d11-ea98-41ee-9285-b916638cac4a",
          quantity: 1,
          deliveryOptionId: "1",
        },
      ])
    );
    expect(cart[0].productId).toEqual("aad29d11-ea98-41ee-9285-b916638cac4a");
    expect(cart[0].quantity).toEqual(1);
    expect(cart[0].deliveryOptionId).toEqual("1");
  });
});
