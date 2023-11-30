function approve(id) {
    alert("Aprobar: " + id)
}
function deny(id) {
    alert("Rechazar: " + id)
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
                        <button class="arrow prev">&#10094;</button>
                        <img src="/assets/images/jacuzzi-new.jpg" alt="Imagen del negocio">
                        <button class="arrow next">&#10095;</button>
                    </div>
                    <h2>Nombre del Negocio: ${businesses[i].name} </h2>
                    <p>Dirección: ${businesses[i].address}</p>
                    <p>Categoría: ${businesses[i].categories.join(", ")}</p>
                    <p>Teléfono: ${businesses[i].phone}</p>
                    <p>Precio: ${businesses[i].price}</p>
                    <p>Descripción: ${businesses[i].description}</p>
                    <div class="buttons">
                        <button onclick="approve('${businesses[i].id}')" class="approve">Aceptar</button>
                        <button onclick="deny('${businesses[i].id}')"class="decline">Rechazar</button>
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



