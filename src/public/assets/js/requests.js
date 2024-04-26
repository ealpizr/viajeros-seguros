async function approveOrDeny(id, action) {
  const displayInfAction = action === "approve" ? "aprobar" : "rechazar";
  const displayAction = action === "approve" ? "aprobado" : "rechazado";

  const response = await fetch(`/api/admin/businesses/${id}/${action}`, {
    method: "POST",
  });

  if (!response.ok) {
    return Swal.fire({
      icon: "error",
      text: `Hubo un problema al ${displayInfAction} el negocio`,
      confirmButtonColor: "#73a942",
    });
  }

  Swal.fire({
    icon: "success",
    text: `Negocio ${displayAction}`,
    confirmButtonColor: "#73a942",
    didClose: () => {
      window.location.reload();
    },
  });
}

document.addEventListener("DOMContentLoaded", function () {
  fetch("/api/admin/unapproved-businesses")
    .then((respuesta) => {
      respuesta.json().then((businesses) => {
        const table = document.getElementById("requests");

        for (let i = 0; i < businesses.length; i++) {
          const element = `
                    <div class="request ">
                    <div class="slider-item">
                        <img src="/uploads/${businesses[i].image}" alt="Imagen del negocio">
                    </div>
                    <h2>Nombre del Negocio: ${businesses[i].name} </h2>
                    <p>Dirección: ${businesses[i].address}</p>
                    <p>Categoría: ${businesses[i].category}</p>
                    <p>Teléfono: ${businesses[i].phone}</p>
                    <p>Precio: ${businesses[i].price}</p>
                    <p>Descripción: ${businesses[i].description}</p>
                    <div class="buttons">
                        <button onclick="approveOrDeny('${businesses[i].id}', 'approve')" class="approve">Aceptar</button>
                        <button onclick="approveOrDeny('${businesses[i].id}', 'deny')"class="decline">Rechazar</button>
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
