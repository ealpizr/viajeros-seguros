document.addEventListener("DOMContentLoaded", async function () {
  const CATEGORIES = await fetchCategories();

  document.getElementById("category").innerHTML += CATEGORIES.map(
    (category) => `<option value="${category._id}">${category.name}</option>`
  ).join("");
});

document.getElementById("form").addEventListener("submit", async function (e) {
  e.preventDefault();
  createBusiness();
});

async function fetchCategories() {
  const response = await fetch("/api/categories");

  if (response.status !== 200) {
    Swal.fire({
      icon: "error",
      text: "Hubo un problema al obtener las categorías",
      confirmButtonColor: "#73a942",
      didClose: () => {
        window.location.href = "/app/me/businesses";
      },
    });
  }

  const categories = await response.json();
  return categories;
}

async function createBusiness() {
  const name = document.getElementById("name").value;
  const address = document.getElementById("address").value;
  const categoryId = document.getElementById("category").value;
  const phone = document.getElementById("phone").value;
  const price = document.getElementById("price").value;
  const description = document.getElementById("description").value;
  const images = document.getElementById("images").files;

  const formData = new FormData();
  formData.append("name", name);
  formData.append("address", address);
  formData.append("categoryId", categoryId);
  formData.append("phone", phone);
  formData.append("price", price);
  formData.append("description", description);
  for (let i = 0; i < images.length; i++) {
    formData.append("images[]", images[i]);
  }

  const response = await fetch("/api/businesses", {
    method: "POST",
    body: formData,
  });

  if (response.status === 400) {
    const ERRORS = {
      "name.string.empty": "El nombre es requerido",
      "name.string.min": "El nombre debe tener al menos 8 caracteres",
      "address.string.empty": "La dirección es requerida",
      "address.string.min": "La dirección debe tener al menos 8 caracteres",
      "categoryId.string.empty": "La categoría es requerida",
      "phone.string.empty": "El teléfono es requerido",
      "phone.string.pattern.base": "El teléfono debe contener solo números",
      "phone.string.min": "El teléfono debe tener al menos 8 caracteres",
      "phone.string.max": "El teléfono debe tener menos de 12 caracteres",
      "price.number.base": "El precio debe ser un número",
      "price.number.min": "El precio debe ser mayor o igual a 1",
      "description.string.empty": "La descripción es requerida",
      "description.string.min":
        "La descripción debe tener al menos 10 caracteres",
    };
    const { code } = await response.json();
    return Swal.fire({
      icon: "warning",
      text: ERRORS[code],
    });
  }

  if (response.status !== 201) {
    return Swal.fire({
      icon: "error",
      text: "Hubo un problema al crear el negocio",
      confirmButtonColor: "#73a942",
    });
  }

  Swal.fire({
    icon: "success",
    text: "Negocio creado con éxito",
    confirmButtonColor: "#73a942",
    didClose: () => {
      window.location.href = "/app/me/businesses";
    },
  });
}
