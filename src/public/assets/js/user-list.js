document.addEventListener("DOMContentLoaded", function () {
  fetch("/users/list")
    .then((respuesta) => {
      respuesta.json().then((users) => {
        const table = document.getElementById("users-table");

        for (let i = 0; i < users.length; i++) {
          const element = `
          <tr>
            <td>
              <img class="user" src="/assets/images/user.png" /> ${users[i].fullName}
            </td>
            <td>${users[i].identification}</td>
            <td>${users[i].email}</td>
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
