document.addEventListener("DOMContentLoaded", function () {
    fetch("/api/businesses")
        .then((respuesta) => {
            respuesta.json().then((businesses) => {
                
                const totalBusinesses = businesses.length;
                document.getElementById("user-count").innerText = totalBusinesses;
            });
        })
        .catch((error) => {
            alert("Hubo un problema al cargar los negocios");
            console.error(error);
        });
});