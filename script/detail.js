const urlParams = new URLSearchParams(window.location.search);
const productid = urlParams.get("id");

async function detailproduk(id) {
  try {
    const response = await fetch(`https://fakestoreapi.com/products/${id}`);
    const dataproduk = await response.json();

    const container = document.getElementById("detail");
    container.innerHTML = `
      <div class="max-w-6xl mx-auto px-4 py-8 grid grid-cols-1 md:grid-cols-2 gap-6 bg-white rounded-lg shadow">
        <div class="flex items-center justify-center">
          <img src="${dataproduk.image}" alt="${dataproduk.title}" class="w-full max-w-md rounded-lg shadow">
        </div>

        <div>
          <h2 class="text-2xl font-semibold mb-2">${dataproduk.title}</h2>
          <p class="text-red-600 text-xl font-bold mb-1">$${dataproduk.price}</p>
          <div class="flex items-center text-yellow-500 mb-4">
            ${"⭐".repeat(Math.floor(dataproduk.rating.rate))}<span class="text-gray-600 text-sm ml-2">(${dataproduk.rating.rate})</span>
          </div>

          <button class="bg-black text-white font-semibold py-2 px-4 w-full rounded-lg hover:bg-gray-800 mb-2" onclick="TambahKeranjang(${dataproduk.id})">Add To Cart</button>
          <button class="border-2 border-black font-semibold py-2 px-4 w-full rounded-lg hover:bg-black hover:text-white" onclick="BuyNow(${dataproduk.id})">Buy Now</button>

          <p class="mt-6 text-gray-700">${dataproduk.description}</p>

          <h3 class="mt-4 font-semibold">Spesifikasi Tambahan:</h3>
          <ul class="list-disc list-inside text-gray-700">
            <li>Kategori: ${dataproduk.category}</li>
            <li>Rating: ${dataproduk.rating.rate} dari 5</li>
            <li>Jumlah Review: ${dataproduk.rating.count}</li>
            <li>ID Produk: ${dataproduk.id}</li>
          </ul>
        </div>
      </div>
    `;
  } catch (error) {
    console.error("Gagal memuat detail produk:", error);
  }
}

detailproduk(productid);

async function TambahKeranjang(id) {
  try {
    const response = await fetch(`https://fakestoreapi.com/products/${id}`);
    const produk = await response.json();

    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    const existing = cart.find(item => item.id === id);

    if (existing) {
      existing.quantity += 1;
    } else {
      produk.quantity = 1;
      cart.push(produk);
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    alert(`Produk berhasil ditambahkan`);
  } catch (error) {
    alert("Error, Gagal memasukkan produk ke keranjang");
  }
}

async function BuyNow(id) {
  try {
    const response = await fetch(`https://fakestoreapi.com/products/${id}`);
    const produk = await response.json();
    produk.quantity = 1;
    localStorage.setItem("checkout", JSON.stringify(produk));
    window.location.href = "checkout.html";
  } catch (error) {
    alert("Gagal memproses pembelian langsung");
  }
}

// Penting: Daftarkan ke global agar tombol onclick bisa akses
window.TambahKeranjang = TambahKeranjang;
window.BuyNow = BuyNow;
