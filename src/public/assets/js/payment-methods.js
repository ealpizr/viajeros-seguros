

function togglePaymentForm() {
    const paymentMethodsContainer = document.getElementById('paymentMethodsContainer');
    const newPaymentFormContainer = document.getElementById('newPaymentForm');
    const titlePaymentMethods = document.getElementById('h1-methods');
    const addPaymentButton = document.querySelector('.add-payment');

    if (newPaymentFormContainer.style.display === 'none') {
        paymentMethodsContainer.innerHTML = '';

        const form = document.createElement('form');
        form.innerHTML = `
        <label for="newPaymentType">Tipo de Método de Pago:</label>
        <select id="newPaymentType" name="newPaymentType">
        <option value="credit-card">Tarjeta de Crédito</option>
        <option value="debit-card">Tarjeta de Débito</option>
        <option value="paypal">PayPal</option>
        </select>

        <div id="additionalFields"></div>

        <button type="button" onclick="submitNewPayment()">Guardar</button>
        `;

        form.addEventListener('change', updateAdditionalFields);

        newPaymentFormContainer.appendChild(form);
        updateAdditionalFields();
        newPaymentFormContainer.style.display = 'block';

        addPaymentButton.innerText = 'Regresar a mis métodos';
        titlePaymentMethods.innerText = 'Agregar Método de Pago';
    } else {
        newPaymentFormContainer.style.display = 'none';
        titlePaymentMethods.innerText = 'Mis Métodos de Pago';
        addPaymentButton.innerText = 'Agregar Nuevo Método de Pago';
        returnToMyMethods();
    }
}

function updateAdditionalFields() {
    const newPaymentType = document.getElementById('newPaymentType').value;
    const additionalFieldsContainer = document.getElementById('additionalFields');
    additionalFieldsContainer.innerHTML = '';

    if (newPaymentType === 'credit-card' || newPaymentType === 'debit-card') {
        additionalFieldsContainer.innerHTML = `
        <label for="newPaymentCardNumber">Número de Tarjeta:</label>
        <input type="text" id="newPaymentCardNumber" name="newPaymentCardNumber" required />

        <label for="newPaymentName">Nombre:</label>
        <input type="text" id="newPaymentName" name="newPaymentName" required />

        <label for="newPaymentExpiration">Vencimiento:</label>
        <input type="text" id="newPaymentExpiration" name="newPaymentExpiration" placeholder="MM/YY" required />

        <label for="newPaymentCVV">CVV:</label>
        <input type="text" id="newPaymentCVV" name="newPaymentCVV" required />
        `;
    }
    else {
        additionalFieldsContainer.innerHTML = `
        <label for="newPaymentEmail">Correo:</label>
        <input type="text" id="newPaymentEmail" name="newPaymentEmail" required />
        `;
    }
}

function submitNewPayment() {
    alert('Nuevo método de pago guardado');

    document.getElementById('newPaymentForm').style.display = 'none';
    returnToMyMethods();
    document.querySelector('.add-payment').innerText = 'Agregar Nuevo Método de Pago';
}

function returnToMyMethods() {
    window.location.reload();
}
