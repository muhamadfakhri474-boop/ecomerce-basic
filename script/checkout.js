function formatRupiah(number) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(number);
}

document.addEventListener("DOMContentLoaded", () => {
  const cartItems = JSON.parse(localStorage.getItem("checkout"));

  if (!cartItems || cartItems.length === 0) {
    document.getElementById("produk-summary").innerHTML =
      "<p class='text-red-600'>Tidak ada produk untuk checkout.</p>";
    return;
  }

  const summaryContainer = document.getElementById("produk-summary");
  let subtotal = 0;

  summaryContainer.innerHTML = `<h2 class="font-semibold mb-2">Ringkasan Produk</h2>`;

  cartItems.forEach((product) => {
    const quantity = product.quantity || 1;
    const totalPrice = product.price * quantity;
    subtotal += totalPrice;

    summaryContainer.innerHTML += `
      <div class="flex items-center space-x-4 mb-4">
        <img src="${product.image}" alt="${product.title}" class="w-24 h-24 object-contain border rounded" />
        <div class="flex-1">
          <div class="flex justify-between items-center">
            <h3 class="font-semibold">${product.title}</h3>
            <p class="font-semibold">${formatRupiah(product.price)}</p>
          </div>
          <p class="text-gray-600 mt-1">${formatRupiah(product.price)} x ${quantity}</p>
        </div>
      </div>
    `;
  });

  const tax = 300000;
  const delivery = 250000;
  const total = subtotal + tax + delivery;

  summaryContainer.innerHTML += `
    <div class="mt-4 bg-gray-100 p-4 rounded">
      <h3 class="font-semibold mb-2">Ringkasan Pembayaran</h3>
      <div class="flex justify-between"><span>Subtotal</span><span>${formatRupiah(subtotal)}</span></div>
      <div class="flex justify-between"><span>Pajak</span><span>${formatRupiah(tax)}</span></div>
      <div class="flex justify-between"><span>Ongkir</span><span>${formatRupiah(delivery)}</span></div>
      <hr class="my-2" />
      <div class="flex justify-between font-bold text-lg"><span>Total</span><span>${formatRupiah(total)}</span></div>
      <button class="mt-4 w-full bg-black text-white py-2 rounded hover:bg-gray-800">Bayar Sekarang</button>
    </div>
  `;
});
