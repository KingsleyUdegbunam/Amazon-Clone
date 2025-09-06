let productsHTML = "";

products.forEach((product) => {
  productsHTML += `
  <div class="product-container">
        <div class="product-image-container">
          <img class="product-image" src="${product.image}">
        </div>

        <div class="product-name limit-text-to-2-lines">
         ${product.name}
        </div>

        <div class="product-rating-container">
          <img class="product-rating-stars" src="images/ratings/rating-${
            product.rating.stars * 10
          }.png">
          <div class="product-rating-count link-primary">
           ${product.rating.count}
          </div>
        </div>

        <div class="product-price">
          ${(product.priceCents / 100).toFixed(2)}
        </div>

        <div class="product-quantity-container">
          <select>
            <option selected value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
            <option value="7">7</option>
            <option value="8">8</option>
            <option value="9">9</option>
            <option value="10">10</option>
          </select>
        </div>

        <div class="product-spacer"></div>

        <div class="added-to-cart">
          <img src="images/icons/checkmark.png">
          Added
        </div>

        <div class='js-added-to-cart-display'></div>
        <button class="add-to-cart-button button-primary js-add-to-cart-button" data-product-id = '${
          product.id
        }' >
          Add to Cart
        </button>
      </div>`;
});
const productsHolderElem = document.querySelector(".js-product-grid");
productsHolderElem.innerHTML = productsHTML;

document.querySelectorAll(".js-add-to-cart-button").forEach((button) => {
  button.addEventListener("click", () => {
    const productId = button.dataset.productId;

    let matchingItem;

    cart.forEach((product) => {
      if (productId === product.productId) {
        matchingItem = product;
      }
    });

    if (matchingItem) {
      matchingItem.quantity++;
    } else {
      const product = {
        productId,
        quantity: 1,
      };

      cart.push(product);
    }

    //Accumulator to hold the total number of quantity in cart.
    let cartQuantity = 0;
    const cartQuantityElem = document.querySelector(".js-cart-quantity");

    cart.forEach((item) => {
      cartQuantity += item.quantity;
    });

    cartQuantityElem.innerHTML = cartQuantity;
  });
});
