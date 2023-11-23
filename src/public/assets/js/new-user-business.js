const CATEGORIES = [
  {
    _id: 1,
    name: "Hospedaje",
  },
  {
    _id: 2,
    name: "Transporte",
  },
  {
    _id: 3,
    name: "Alimentación",
  },
  {
    _id: 4,
    name: "Entretenimiento",
  },
];

function convertBase64(file) {
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);

    fileReader.onload = function () {
      resolve(fileReader.result);
    };

    fileReader.onerror = function (error) {
      reject(error);
    };
  });
}

function getValue(id) {
  const val = document.getElementById(id).value;
  if (!val) {
    throw new Error(`Required field ${id} missing`);
  }
  return val;
}

document.getElementById("category").innerHTML += CATEGORIES.map(function (
  category
) {
  return `<option value="${category._id}">${category.name}</option>`;
});

document.getElementById("submit").addEventListener("click", async function (e) {
  e.preventDefault();
  try {
    const name = getValue("name");
    const address = getValue("address");
    const categoriesIds = ["65563b1e9e4fb7afc0eb39e0"];
    const phone = getValue("phone");
    const description = getValue("description");
    const images = [];

    const business = {
      name,
      address,
      categoriesIds,
      phone,
      description,
      images,
    };
    await fetch("/api/businesses", {
      method: "POST",
      headers: {
        "Content-Type":"application/json"
      },
      body: JSON.stringify(business)

    })
    alert("El negocio se creo correctamente");
    window.location = "/app";
  } catch (e) {
    alert("Debe llenar todos los campos");
  }
});
