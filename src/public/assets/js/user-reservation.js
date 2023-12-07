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
            <p class="black">Fecha:<br/>${new Date(
              businesses[i].day
            ).toLocaleDateString("es-CR")}</p>
        
            <p class="black">Precio: ${formatPrice(businesses[i].totalPaid)}</p>

            <button class="rate-btn" onclick="rate('${
              businesses[i].businessId._id
            }')">Calificar</button>
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

async function rate(businessId) {
  Swal.fire({
    html: `
    <input id="swal-input1" style="min-width: 250px;" class="swal2-input" placeholder="Calificación" type="number" min="1" max="5">
    <input id="swal-input2" class="swal2-input" placeholder="Comentario" type="text">
    `,
    preConfirm: async () => {
      Swal.showLoading();

      const rating = parseInt(document.getElementById("swal-input1").value);
      const comment = document.getElementById("swal-input2").value;

      const response = await fetch(`/api/businesses/${businessId}/rate`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ rating, comment }),
      });

      if (response.status !== 201) {
        return Swal.fire({
          icon: "error",
          html: "Hubo un error al calificar el negocio<br/> Intente de nuevo",
        });
      }

      Swal.fire({
        icon: "success",
        html: "El negocio ha sido calificado con éxito",
      });
    },
  });
}
