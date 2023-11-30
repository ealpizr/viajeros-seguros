document.addEventListener("DOMContentLoaded", function () {
    fetch("/api/reservations")
        .then((respuesta) => {
            respuesta.json().then((businesses) => {
                const table = document.getElementById("user-bookings");

                for (let i = 0; i < business.length; i++) {
                    const element = `
                    <div class="gallery" id="user-bookings">
                    <div class="content">
                    <img class="reservation-thumbnail" src="/assets/images/hotel.jpg" /><h3> Nombre: ${businesses[i].name} </h3>
                    <p>Descripción: ${businesses[i].description}</p>
                    <p class="black">Fechas:${businesses[i].days} </p>
                    <p>20-10-23</p>
                    <p class="black">hasta:</p>
                    <p>26-10-23</p>
                    <p class="black">Precio: ${businesses[i].totalPrice}</p>
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
