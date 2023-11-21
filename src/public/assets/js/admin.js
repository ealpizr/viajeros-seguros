document.addEventListener("DOMContentLoaded", function () {
  fetch("/api/businesses")
    .then((respuesta) => {
      respuesta.json().then((businesses) => {
        const totalBusinesses = businesses.length;
        document.getElementById("businesses-count").innerText = totalBusinesses;
      });
    })
    .catch((error) => {
      alert("Hubo un problema al cargar los negocios");
      console.error(error);
    });

  fetch("/api/users")
    .then((respuesta) => {
      respuesta.json().then((users) => {
        const totalUsers = users.length;
        document.getElementById("user-count").innerText = totalUsers;
      });
    })
    .catch((error) => {
      alert("Hubo un problema al cargar los usuarios");
      console.error(error);
    });
});
