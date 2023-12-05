document.addEventListener("DOMContentLoaded", async function () {
  const cartContainer = document.getElementById("cart-container");
  const shoppingCart = JSON.parse(localStorage.getItem("shoppingCart") || "[]");

  let sum = 0;

  for (let i = 0; i < shoppingCart.length; i++) {
    const item = shoppingCart[i];
    const business = await fetchBusiness(item.id);

    sum += business.price;

    const row = `
      <div class="item-1">
        <p class="title-item">${business.name}</p>
        <p class="price-item">${formatPrice(business.price)}</p>
        <p class="date-item">${new Date(item.date).toLocaleDateString(
          "es-CR"
        )}</p>
        <button onclick="removeFromCart(${i});" class="button-item">Eliminar de mi carrito</button>
      </div>
      `;

    cartContainer.innerHTML += row;
  }

  document.getElementById("total").innerText = formatPrice(sum);
});

function formatPrice(price) {
  return price.toLocaleString("es-CR", {
    style: "currency",
    currency: "CRC",
  });
}

function removeFromCart(index) {
  const shoppingCart = JSON.parse(localStorage.getItem("shoppingCart") || "[]");
  shoppingCart.splice(index, 1);
  localStorage.setItem("shoppingCart", JSON.stringify(shoppingCart));
  window.location.reload();
}

async function fetchBusiness(id) {
  const response = await fetch(`/api/businesses/${id}`);
  const data = await response.json();
  return {
    name: data.name,
    price: data.price,
  };
}
