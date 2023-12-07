document.addEventListener("DOMContentLoaded", async () => {
  const response = await fetch("/api/payment-methods");
  if (response.status !== 200) {
    return Swal.fire({
      icon: "error",
      html: "Ocurrió un error al cargar tus métodos de pago<br />Inténtalo de nuevo",
      didClose: () => (window.location.href = "/app/me"),
    });
  }

  const paymentMethods = await response.json();
  const paymentMethodsContainer = document.getElementById(
    "paymentMethodsContainer"
  );

  if (paymentMethods.length === 0) {
    paymentMethodsContainer.innerHTML = `
    <div class="payment-method">
      <p class="bold">No tienes métodos de pago registrados</p>
    </div>
    `;
  }

  paymentMethods.forEach((paymentMethod) => {
    paymentMethodsContainer.innerHTML += `
        <div class="payment-method" data-type="credit-card">
          <label>
            <img
              src="${
                paymentMethod.type === "Tarjeta"
                  ? "/assets/images/credit-card.png"
                  : "/assets/images/paypal.png"
              }"
              alt="${paymentMethod.type}"
            />
            <span class="bold">${paymentMethod.type}</span>
          </label>
         
          <div class="payment-details">
          ${paymentMethod.details}
          </div>
          <button class="delete-payment" onclick="deletePaymentMethod('${
            paymentMethod._id
          }')">
            Eliminar
            </button>
        </div>
        `;
  });
});

function togglePaymentForm() {
  const paymentMethodsContainer = document.getElementById(
    "paymentMethodsContainer"
  );
  const newPaymentFormContainer = document.getElementById("newPaymentForm");
  const titlePaymentMethods = document.getElementById("h1-methods");
  const addPaymentButton = document.querySelector(".add-payment");

  if (newPaymentFormContainer.style.display === "none") {
    paymentMethodsContainer.innerHTML = "";

    const form = document.createElement("form");
    form.innerHTML = `
        <label for="newPaymentType">Tipo de Método de Pago:</label>
        <select id="newPaymentType" name="newPaymentType">
        <option value="Tarjeta">Tarjeta</option>
        <option value="Paypal">PayPal</option>
        </select>

        <div id="additionalFields"></div>

        <button type="button" onclick="submitNewPayment()">Guardar</button>
        `;

    newPaymentFormContainer.appendChild(form);

    document
      .getElementById("newPaymentType")
      .addEventListener("change", updateAdditionalFields);
    updateAdditionalFields();

    newPaymentFormContainer.style.display = "block";

    addPaymentButton.innerText = "Regresar a mis métodos";
    titlePaymentMethods.innerText = "Agregar Método de Pago";
  } else {
    newPaymentFormContainer.style.display = "none";
    titlePaymentMethods.innerText = "Mis Métodos de Pago";
    addPaymentButton.innerText = "Agregar Nuevo Método de Pago";
    returnToMyMethods();
  }
}

function updateAdditionalFields() {
  const newPaymentType = document.getElementById("newPaymentType").value;
  const additionalFieldsContainer = document.getElementById("additionalFields");
  additionalFieldsContainer.innerHTML = "";

  if (newPaymentType === "Tarjeta") {
    additionalFieldsContainer.innerHTML = `
        <label for="newPaymentCardNumber">Número de Tarjeta:</label>
        <input type="text" id="newPaymentCardNumber" name="newPaymentCardNumber" required />
        `;
  } else {
    additionalFieldsContainer.innerHTML = `
        <label for="newPaymentEmail">Correo:</label>
        <input type="text" id="newPaymentEmail" name="newPaymentEmail" required />
        `;
  }
}

async function submitNewPayment() {
  Swal.showLoading();

  const paymentType = document.getElementById("newPaymentType").value;

  const response = await fetch("/api/payment-methods", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      type: paymentType,
      details:
        paymentType === "Tarjeta"
          ? "**** **** **** " +
            document
              .getElementById("newPaymentCardNumber")
              .value.slice(
                document.getElementById("newPaymentCardNumber").value.length - 4
              )
          : document.getElementById("newPaymentEmail").value,
    }),
  });

  if (response.status !== 201) {
    return Swal.fire({
      icon: "error",
      html: "Ocurrió un error al agregar el método de pago<br />Inténtalo de nuevo",
    });
  }

  Swal.fire({
    icon: "success",
    html: "Método de pago agregado exitosamente",
    didClose() {
      window.location.reload();
    },
  });
}

function returnToMyMethods() {
  window.location.reload();
}

async function deletePaymentMethod(paymentMethodId) {
  const response = await fetch(`/api/payment-methods/${paymentMethodId}`, {
    method: "DELETE",
  });

  if (response.status !== 200) {
    return Swal.fire({
      icon: "error",
      html: "Ocurrió un error al eliminar el método de pago<br />Inténtalo de nuevo",
    });
  }

  Swal.fire({
    icon: "success",
    html: "Método de pago eliminado exitosamente",
    didClose() {
      window.location.reload();
    },
  });
}
