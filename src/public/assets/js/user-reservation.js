function formatPrice(price) {
  return price.toLocaleString("es-CR", {
    style: "currency",
    currency: "CRC",
  });
}

document.addEventListener("DOMContentLoaded", function () {
  fetch("/api/me/reservations")
    .then((respuesta) => {
      respuesta.json().then((businesses) => {
        const table = document.getElementById("user-bookings");

        for (let i = 0; i < businesses.length; i++) {
          const element = `
          <div class="gallery" id="user-bookings">
          <div class="content">
            <img class="reservation-thumbnail" src="/assets/images/hotel.jpg" />
            <h3>Nombre: ${businesses[i].businessId.name}</h3>
            <p>Descripción: ${businesses[i].businessId.description}</p>
            <p class="black">Fechas:</p>
        
            ${businesses[i].days
              .map((d) => new Date(d).toLocaleDateString("es-CR"))
              .map((d) => `<p>${d}</p>`)
              .join("")}
        
            <p class="black">Cantidad de días: ${businesses[i].numberOfDays}</p>
        
            <p class="black">Precio por día: ${formatPrice(
              businesses[i].dailyPrice
            )}</p>
        
            <p class="black">Precio Total: ${formatPrice(
              businesses[i].totalPrice
            )}</p>
          </div>
        </div>        
        `;

          table.insertAdjacentHTML("beforeend", element);
        }
      });
    })
    .catch((error) => {
      alert("Hubo un problema al cargar los usuarios");
      console.error(error);
    });
});
