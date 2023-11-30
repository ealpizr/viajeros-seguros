document.addEventListener("DOMContentLoaded", function () {
  const name = document.getElementById("name").value;
  const address = document.getElementById("address").value;
  const category = document.getElementById("category").value;
  const phone = document.getElementById("phone").value;
  const description = document.getElementById("description").value;
  const photos = document.getElementById("photos").value;

  console.log("test");
  fetch("/api/businesses", {
    method: "POST",
    body: JSON.stringify({
      name: name,
      address: address,
      categories: ["65563b1e9e4fb7afc0eb39e0"],
      description: description,
      images: [],
    }),
  })
    .then((respuesta) => {
      if (respuesta.ok) {
        alert("Negocio creado exitosamente");

        newBusinessForm.reset();
      } else {
        alert("Hubo un problema al crear el negocio");
      }
    })
    .catch((error) => {
      console.error("Error en la solicitud:", error);
    });
});
