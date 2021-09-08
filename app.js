const pizzaElement = document.querySelector(".pizzas");
const cartItemsElement = document.querySelector(".show-cart-items");
const totalElement = document.querySelector(".total-items");
const checkoutElement = document.querySelector(".checkout");

const inputTotal = document.getElementById("inputTotal");
const form_el = document.getElementById("submitForm");

function renderPizaItems() {
  pizzaItems.forEach((item) => {
    pizzaElement.innerHTML += `
    <div class="pizza ${item.class}">
          <h2>${item.name}</h2>

          <img
            src="${item.image}"
            width="200"
          />
          <h3>R ${item.price}</h3>

          <div class="description">
          ${item.description}
          </div>
          <div class="btn-container">
            <center>
              <button class="btn" onclick="addToCart(${item.id})">Buy</button>
            </center>
          </div>
        </div>
    `;
  });
}

renderPizaItems();

let cart = [];
var total = 0;

function addToCart(id) {
  if (cart.some((cartItem) => cartItem.id === id)) {
    editUnits("add", id);
  } else {
    const cartItem = pizzaItems.find((item) => item.id == id);
    cart.push({ ...cartItem, units: 1 });
  }
  cartUpdate();
}

function cartUpdate() {
  if (cart.length > 0) {
    document.getElementById("checkout").style.display = "block";
  } else {
    document.getElementById("checkout").style.display = "none";
  }
  showCartItemsList();
  subTotal();
}

function checkout(total) {
  console.log(inputTotal.value, total);

  if (inputTotal.value == total + ".00" || inputTotal.value == total) {
    successMessage();
  } else {
    errorMessage();
  }
}

function successMessage() {
  document.getElementById("successMessage").style.display = "block";
  setTimeout(function () {
    document.getElementById("successMessage").style.display = "none";
  }, 3000);

  setTimeout(function () {
    cart = [];
    let total = 0;
    cartUpdate();
  }, 4000);
}

function errorMessage() {
  document.getElementById("errorMessage").style.display = "block";
  setTimeout(function () {
    document.getElementById("errorMessage").style.display = "none";
  }, 3000);
}

function subTotal() {
  let total = 0;

  cart.forEach((cartItem) => {
    total += cartItem.price * cartItem.units;
  });

  totalElement.innerHTML = `
  <div class="total-label">Total</div>
  <div class="total-price">R ${total}.00
  </div>`;

  form_el.addEventListener("submit", function (evt) {
    evt.preventDefault();
    checkout(total);
  });
}

function showCartItemsList() {
  cartItemsElement.innerHTML = "";
  cart.forEach((cartItem) => {
    cartItemsElement.innerHTML += `<div class="cart-items">
    <div class="inner-display item-width">${cartItem.size}</div>
    <div class="inner-display">
      <button class="button-incr" onclick="editUnits('add',${cartItem.id})">+</button>
    </div>
    <div class="inner-display">${cartItem.units}</div>
    <div class="inner-display">
      <button class="button-dcr" onclick="editUnits('minus',${cartItem.id})">-</button>
    </div>
    <div class="inner-display">R ${cartItem.price}</div>
    <button class="inner-display remove-item" onclick="removeFromCart(${cartItem.id})">Remove</button>
  </div>`;
  });
}

function removeFromCart(id) {
  cart = cart.filter((cartItem) => cartItem.id != id);
  cartUpdate();
}

function editUnits(type, id) {
  cart = cart.map((cartItem) => {
    let units = cartItem.units;

    if (cartItem.id === id) {
      if (type === "minus" && units > 1) {
        units = units - 1;
      } else if (type === "add") {
        units = units + 1;
      }
    }
    return {
      ...cartItem,
      units,
    };
  });

  cartUpdate();
}
