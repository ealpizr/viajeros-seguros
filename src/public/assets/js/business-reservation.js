document.addEventListener("DOMContentLoaded", async function () {
  await listBusinesses();

  document
    .getElementById("select")
    .addEventListener("change", async function (e) {
      await listReservations(e.target.value);
    });
});

async function listBusinesses() {
  const response = await fetch("/api/me/businesses");
  if (!response.ok) {
    alert("Hubo un problema al cargar los negocios");
    console.error(response);
    return;
  }

  const businesses = await response.json();

  document.getElementById("select").innerHTML += businesses
    .map(
      (business) => `<option value="${business.id}">${business.name}</option>`
    )
    .join("");
}

async function listReservations(id) {
  const response = await fetch(`/api/businesses/${id}/reservations`);
  if (!response.ok) {
    alert("Hubo un problema al cargar las reservas");
    console.error(response);
    return;
  }

  const reservations = await response.json();

  const table = document.getElementById("business-bookings");
  reservations.forEach((r) => {
    const element = `
      <tr>
        <td>${r.user}</td>
        <td>${r.date}</td>
      </tr>
    `;

    table.insertAdjacentHTML("beforeend", element);
  });
}
