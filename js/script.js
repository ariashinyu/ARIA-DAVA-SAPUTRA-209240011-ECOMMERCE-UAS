function addToCart(productName, productPrice) {
  const cart = JSON.parse(localStorage.getItem("cart")) || []
  cart.push({ name: productName, price: productPrice })
  localStorage.setItem("cart", JSON.stringify(cart))
  alert(`${productName} telah ditambahkan ke keranjang!`)
}

document.addEventListener("DOMContentLoaded", () => {
  // Only run loadCart if on the cart.html page
  if (document.getElementById("cart-items")) {
    loadCart()
  }
})

function loadCart() {
  const cart = JSON.parse(localStorage.getItem("cart")) || []
  const cartItemsContainer = document.getElementById("cart-items")
  const cartTotalSpan = document.getElementById("cart-total")
  const cartSummaryDiv = document.getElementById("cart-summary")
  const emptyCartMessageDiv = document.getElementById("empty-cart-message")
  let total = 0

  cartItemsContainer.innerHTML = "" // Clear existing items

  if (cart.length === 0) {
    emptyCartMessageDiv.style.display = "block"
    cartSummaryDiv.style.display = "none"
    return
  }

  emptyCartMessageDiv.style.display = "none"
  cartSummaryDiv.style.display = "block"

  cart.forEach((item, index) => {
    const listItem = document.createElement("li")
    listItem.className = "cart-item"
    listItem.innerHTML = `
            <div class="cart-item-info">
                <h3>${item.name}</h3>
                <p>Rp ${item.price.toLocaleString("id-ID")}</p>
            </div>
            <div class="cart-item-actions">
                <button onclick="removeFromCart(${index})">Hapus</button>
            </div>
        `
    cartItemsContainer.appendChild(listItem)
    total += item.price
  })

  cartTotalSpan.textContent = `Rp ${total.toLocaleString("id-ID")}`
}

function removeFromCart(index) {
  const cart = JSON.parse(localStorage.getItem("cart")) || []
  cart.splice(index, 1) // Remove item at specific index
  localStorage.setItem("cart", JSON.stringify(cart))
  loadCart() // Reload cart to show it's empty
}

function checkout() {
  alert("Terima kasih telah berbelanja di Ariastore! Fitur pembayaran belum diimplementasikan.")
  localStorage.removeItem("cart") // Clear cart after "checkout"
  loadCart() // Reload cart to show it's empty
}
