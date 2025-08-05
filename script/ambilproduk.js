fetch('https://fakestoreapi.com/products')
  .then(res => res.json())
  .then(data => {
    const container = document.getElementById('produk-terlaris');
    data.forEach(product => {
      container.innerHTML += `
        <div class="bg-white p-4 rounded-lg shadow-lg transform transition-transform duration-300 ease-in-out hover:scale-105">
          <img src="${product.image}" alt="${product.title}" class="w-full h-40 object-contain mb-2" />
          <h4 class="font-semibold text-md truncate mx-auto">${product.title}</h4>

          <div class="flex justify-between items-center mt-2 text-sm">
            <p class="text-gray-600">$${product.price}</p>
            <p class="text-yellow-600">⭐ ${product.rating.rate} (${product.rating.count})</p>
          </div>
          <button
          </button>
        </div>
        
      `;
    });
  });

async function TambahKeranjang(id) {
  try {
    const response = await fetch(`https://fakestoreapi.com/products/${id}`)
    const produk = await response.json();

    let cart = JSON.parse(localStorage.getItem('cart')) || [];

  const existing = cart.find(item => item.id === id);
    if (existing) {
      existing.quantity += 1;
    } else {
      produk.quantity = 1;
      cart.push(produk);
    }

  localStorage.setItem('cart', JSON.stringify(cart));

  alert(`Produkberhasil ditambahkan`)
}
  catch (error) {
    alert('Error, Gagal memasukkan produk ke keranjang')
  }
}

