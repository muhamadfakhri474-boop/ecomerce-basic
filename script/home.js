fetch('https://fakestoreapi.com/products')
  .then(res => res.json())
  .then(data => {
    const container = document.getElementById('produk-terlaris');
    data.forEach(product => {
      container.innerHTML += `
        <div class="bg-white p-4 rounded-lg shadow-lg transform transition-transform duration-300 ease-in-out hover:scale-105">
          <a href="detail.html?id=${product.id}">
            <img src="${product.image}" alt="${product.title}" class="w-full h-40 object-contain mb-2" />
            <h4 class="font-semibold text-md truncate text-center">${product.title}</h4>
          </a>

          <div class="flex justify-between items-center mt-2 text-sm">
            <p class="text-gray-600">$${product.price}</p>
            <p class="text-yellow-600">⭐ ${product.rating.rate} (${product.rating.count})</p>
          </div>

          <button
            onclick="TambahKeranjang(${product.id})"
            class="mt-3 w-full bg-white border-2 border-black py-1 px-4 rounded-lg font-semibold hover:bg-black hover:text-white transition">
            Add To Cart
          </button>
        </div>
      `;
    });
  });
