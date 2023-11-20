document.addEventListener("DOMContentLoaded", function () {
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
