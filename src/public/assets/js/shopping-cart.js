document.addEventListener("DOMContentLoaded", async function () {
  const paymentMethodsSelect = document.getElementById("payment-methods");

  paymentMethodsSelect.innerHTML += await getPaymentMethods();
  paymentMethodsSelect.innerHTML += `<option value="ADD_NEW_PAYMENT_METHOD">Agregar nuevo</option>`;

  paymentMethodsSelect.addEventListener("change", function (e) {
    document.getElementById("pay-btn").disabled =
      !e.target.value ||
      JSON.parse(localStorage.getItem("shoppingCart") || "[]").length === 0;

    if (e.target.value === "ADD_NEW_PAYMENT_METHOD") {
      window.location.href = "/app/me/payment-methods";
    }
  });

  const cartContainer = document.getElementById("cart-container");
  const shoppingCart = JSON.parse(localStorage.getItem("shoppingCart") || "[]");

  if (shoppingCart.length === 0) {
    return (cartContainer.innerHTML = `
      <div class="item-1">
        <p class="title-item w-100">No hay nada en tu carrito</p>
      </div>
    `);
  }

  let sum = 0;
  for (let i = 0; i < shoppingCart.length; i++) {
    const item = shoppingCart[i];
    const business = await fetchBusiness(item.id);

    sum += business.price;

    const row = `
      <div class="item-1">
        <p class="title-item">${business.name}</p>
        <p class="price-item">${formatPrice(business.price)}</p>
        <p class="date-item">${new Date(
          `${item.date}T00:00:00-06:00`
        ).toLocaleDateString("es-CR")}</p>
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

async function getPaymentMethods() {
  const response = await fetch("/api/payment-methods");
  const data = await response.json();
  return data.map(
    (pm) => `<option value="${pm._id}">${pm.type} (${pm.details})</option>`
  );
}

async function pay() {
  Swal.showLoading();

  const paymentMethodId = document.getElementById("payment-methods").value;
  const shoppingCart = JSON.parse(localStorage.getItem("shoppingCart") || "[]");

  const reservations = shoppingCart.map((item) => {
    return {
      businessId: item.id,
      day: item.date,
    };
  });

  const response = await fetch("/api/me/book-reservations", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      paymentMethodId,
      reservations,
    }),
  });

  if (response.status !== 200) {
    return Swal.fire({
      icon: "error",
      html: "Ocurrió un error al procesar el pago. <br />Por favor intentá de nuevo.",
    });
  }

  localStorage.setItem("shoppingCart", "[]");
  window.location.href = "/app/confirmation";
}
