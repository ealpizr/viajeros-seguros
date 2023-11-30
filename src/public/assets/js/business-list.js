document.addEventListener("DOMContentLoaded", function () {
  console.log("test");
  fetch("/api/admin/businesses")
    .then((respuesta) => {
      respuesta.json().then((businesses) => {
        const table = document.getElementById("business-table");

        for (let i = 0; i < businesses.length; i++) {
          const element = `
            <tr>
              <td> <img class="user" src="/assets/images/business.png" /> ${
                businesses[i].name
              }
              </td>
              <td>${businesses[i].owner}</td>
              <td>${businesses[i].categories}</td>
              <td>${businesses[i].rating || "Sin calificaciones"}</td>
            </tr>
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
