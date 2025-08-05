document.addEventListener("DOMContentLoaded", () => {
  const searchInput = document.getElementById("searchInput");

  // Tangkap event ketika tombol Enter ditekan
  searchInput.addEventListener("keydown", async (event) => {
    if (event.key === "Enter") {
      const keyword = searchInput.value.trim().toLowerCase();
      if (keyword.length === 0) return;

      try {
        const response = await fetch("https://fakestoreapi.com/products");
        const products = await response.json();

        const filtered = products.filter(product =>
          product.title.toLowerCase().includes(keyword)
        );

        displayProducts(filtered);
      } catch (error) {
        console.error("Gagal mengambil data:", error);
      }
    }
  });
});

// Fungsi menampilkan produk hasil pencarian ke #produk-terlaris
function displayProducts(products) {
  const container = document.getElementById("produk-terlaris");
  container.innerHTML = ""; // Kosongkan dulu

  if (products.length === 0) {
    container.innerHTML = "<p class='text-center col-span-4'>Produk tidak ditemukan.</p>";
    return;
  }

  products.forEach(product => {
    const div = document.createElement("div");
    div.className = "bg-white rounded shadow p-4";

    div.innerHTML = `
      <img src="${product.image}" alt="${product.title}" class="w-full h-40 object-contain mb-2" />
      <h3 class="font-semibold text-sm mb-1">${product.title}</h3>
      <p class="text-gray-700 mb-2 text-sm">Rp ${product.price.toLocaleString()}</p>
      <a href="detail.html?id=${product.id}">
        <button class="bg-blue-500 text-white px-4 py-1 rounded text-sm w-full">Lihat Detail</button>
      </a>
    `;

    container.appendChild(div);
  });
}
