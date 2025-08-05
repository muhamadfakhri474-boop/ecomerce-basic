function getCartFromStorage() {
  return JSON.parse(localStorage.getItem("cart")) || [];
}

function setCartToStorage(cart) {
  localStorage.setItem("cart", JSON.stringify(cart));
}

function updateQuantity(productId, change) {
  let cart = getCartFromStorage();
  const index = cart.findIndex(item => item.id === productId);
  if (index !== -1) {
    cart[index].quantity += change;
    if (cart[index].quantity < 1) cart[index].quantity = 1;
    setCartToStorage(cart);
    renderCart();
  }
}

function hapus(index) {
  let cart = getCartFromStorage();
  cart.splice(index, 1);
  setCartToStorage(cart);
  renderCart();
}

function renderCart() {
  const cartItemsContainer = document.getElementById('cart-items');
  const subtotalText = document.getElementById('subtotal-text');
  const taxText = document.getElementById('tax-text');
  const deliveryText = document.getElementById('delivery-text');
  const totalText = document.getElementById('total-text');
  const totalItems = document.getElementById('total-items');

  const cart = getCartFromStorage();
  cartItemsContainer.innerHTML = '';

  if (cart.length === 0) {
    cartItemsContainer.innerHTML = `<p class="text-gray-500">Your cart is empty.</p>`;
    subtotalText.textContent = "$0.00";
    taxText.textContent = "$0.00";
    deliveryText.textContent = "$0.00";
    totalText.textContent = "$0.00";
    totalItems.textContent = "0";
    return;
  }

  let subtotal = 0;
  cart.forEach((product, index) => {
    const totalPrice = product.price * product.quantity;
    subtotal += totalPrice;

    const item = document.createElement('div');
    item.className = 'bg-white p-4 rounded-lg shadow flex items-center gap-4';
    item.innerHTML = `
      <img src="${product.image}" alt="${product.title}" class="w-24 h-24 object-contain" />
      <div class="flex-1">
        <h3 class="font-semibold">${product.title}</h3>
        <p class="text-gray-600">$${product.price.toFixed(2)}</p>
        <div class="mt-2 flex items-center gap-2">
          <button onclick="updateQuantity(${product.id}, -1)" class="bg-gray-200 px-2 rounded">-</button>
          <span>${product.quantity}</span>
          <button onclick="updateQuantity(${product.id}, 1)" class="bg-gray-200 px-2 rounded">+</button>
        </div>
      </div>
      <button onclick="hapus(${index})" class="text-red-600 font-semibold hover:underline">Hapus</button>
    `;
    cartItemsContainer.appendChild(item);
  });

  const tax = subtotal * 0.1;
  const delivery = cart.length > 0 ? 15.00 : 0;
  const total = subtotal + tax + delivery;

  subtotalText.textContent = "$" + subtotal.toFixed(2);
  taxText.textContent = "$" + tax.toFixed(2);
  deliveryText.textContent = "$" + delivery.toFixed(2);
  totalText.textContent = "$" + total.toFixed(2);
  totalItems.textContent = cart.length;
}

function handleCheckoutFromCart() {
  const cart = getCartFromStorage();
  if (cart.length === 0) {
    alert("Your cart is empty. Please add products first.");
    return;
  }
  localStorage.setItem('checkout', JSON.stringify(cart));
  window.location.href = 'checkout.html';
}

document.addEventListener('DOMContentLoaded', () => {
  renderCart();
  const checkoutBtn = document.getElementById("checkout-btn");
  if (checkoutBtn) {
    checkoutBtn.addEventListener("click", handleCheckoutFromCart);
  }
});
