const produkContainer = document.getElementById("produk-container");
const subtotalEl = document.getElementById("subtotal");
const totalEl = document.getElementById("total");

function formatRupiah(angka) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
  }).format(angka);
}

// Ambil ID produk dari localStorage
const checkoutId = localStorage.getItem("checkoutId");

async function loadCheckout() {
  if (!checkoutId) {
    produkContainer.innerHTML = `<p class="text-red-500">Tidak ada produk yang dipilih untuk checkout.</p>`;
    subtotalEl.textContent = "Rp. 0";
    totalEl.textContent = "Rp. 0";
    return;
  }

  try {
    const res = await fetch(`https://fakestoreapi.com/products/${checkoutId}`);
    const produk = await res.json();
    produk.quantity = 1;

    const harga = produk.price * produk.quantity;

    produkContainer.innerHTML = `
      <div class="flex gap-4 items-center border p-4 rounded-lg shadow">
        <img src="${produk.image}" alt="${produk.title}" class="w-24 h-24 object-contain border rounded" />
        <div class="flex-1">
          <h4 class="font-semibold text-lg">${produk.title}</h4>
          <p class="text-sm text-gray-600">${formatRupiah(produk.price)} x ${produk.quantity}</p>
        </div>
        <div class="font-semibold text-right">${formatRupiah(harga)}</div>
      </div>
    `;

    subtotalEl.textContent = formatRupiah(harga);
    const pajak = 300000;
    const ongkir = 250000;
    totalEl.textContent = formatRupiah(harga + pajak + ongkir);
  } catch (error) {
    produkContainer.innerHTML = `<p class="text-red-500">Gagal memuat data produk checkout.</p>`;
    subtotalEl.textContent = "Rp. 0";
    totalEl.textContent = "Rp. 0";
  }
}

loadCheckout();
