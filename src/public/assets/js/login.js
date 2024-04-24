document.addEventListener("DOMContentLoaded", () => {
  const registerForm = document.getElementById("register-form");
  const loginForm = document.getElementById("login-form");
  const wrapper = document.querySelector(".wrapper");
  const loginLink = document.querySelector(".login-link");
  const registerLink = document.querySelector(".register-link");

  registerForm.addEventListener("submit", (e) => {
    e.preventDefault();
    signup();
  });

  loginForm.addEventListener("submit", (e) => {
    e.preventDefault();
    login();
  });

  registerLink.addEventListener("click", () => {
    wrapper.classList.add("active");
  });

  loginLink.addEventListener("click", () => {
    wrapper.classList.remove("active");
  });
});

async function login() {
  const email = document.getElementById("email-login").value;
  const password = document.getElementById("password-login").value;

  Swal.fire({
    heightAuto: false,
    allowOutsideClick: false,
    didOpen: () => {
      Swal.showLoading();
    },
  });

  const response = await fetch("/api/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: email,
      password: password,
    }),
  });

  if (response.status === 200) {
    const body = await response.json();

    localStorage.setItem("role", body.role);
    window.location.href = "/app";
  } else {
    Swal.fire({
      icon: "error",
      text: "Correo o contraseña incorrectos",
      confirmButtonColor: "#73a942",
    });
  }
}

async function signup() {
  const firstName = document.getElementById("name").value;
  const firstLastName = document.getElementById("firstLastName").value;
  const secondLastName = document.getElementById("secondLastName").value;
  const dateOfBirth = document.getElementById("dateOfBirth").value;
  const email = document.getElementById("email-register").value;
  const password = document.getElementById("password-register").value;
  const identification = document.getElementById("identification").value;
  const phoneNumber = document.getElementById("phoneNumber").value;
  const photo = document.getElementById("profile-picture").files[0];

  const formData = new FormData();
  formData.append("firstName", firstName);
  formData.append("firstLastName", firstLastName);
  formData.append("secondLastName", secondLastName);
  formData.append("dateOfBirth", dateOfBirth);
  formData.append("email", email);
  formData.append("password", password);
  formData.append("identification", identification);
  formData.append("phoneNumber", phoneNumber);
  formData.append("photo", photo);

  const response = await fetch("/api/auth/signup", {
    method: "POST",
    body: formData,
  });

  const data = await response.json();
  if (response.status === 201) {
    Swal.fire({
      icon: "success",
      html: "Usuario creado exitosamente<br/>Por favor inicia sesión",
      confirmButtonColor: "#73a942",
      didClose: () => {
        const wrapper = document.querySelector(".wrapper");
        wrapper.classList.remove("active");
      },
    });
  } else {
    const ERRORS = {
      "firstName.string.min": "El nombre debe tener al menos 3 caracteres",
      "firstName.string.max": "El nombre debe tener menos de 30 caracteres",
      "firstName.string.pattern.base": "El nombre solo puede contener letras",
      "firstName.string.empty": "El nombre es requerido",
      "firstName.any.required": "El nombre es requerido",

      "firstLastName.string.min":
        "El primer apellido debe tener al menos 3 caracteres",
      "firstLastName.string.max":
        "El primer apellido debe tener menos de 30 caracteres",
      "firstLastName.string.pattern.base":
        "El primer apellido solo puede contener letras",
      "firstLastName.string.empty": "El primer apellido es requerido",
      "firstLastName.any.required": "El primer apellido es requerido",

      "secondLastName.string.min":
        "El segundo apellido debe tener al menos 3 caracteres",
      "secondLastName.string.max":
        "El segundo apellido debe tener menos de 30 caracteres",
      "secondLastName.string.pattern.base":
        "El segundo apellido solo puede contener letras",
      "secondLastName.string.empty": "El segundo apellido es requerido",
      "secondLastName.any.required": "El segundo apellido es requerido",

      "dateOfBirth.date.base": "La fecha de nacimiento debe ser válida",
      "dateOfBirth.date.less": "La fecha de nacimiento debe ser válida",
      "dateOfBirth.any.required": "La fecha de nacimiento es requerida",

      "email.string.email": "El correo debe ser válido",
      "email.string.empty": "El correo es requerido",
      "email.any.required": "El correo es requerido",

      "password.string.min": "La contraseña debe tener al menos 8 caracteres",
      "password.string.pattern.base":
        "La contraseña debe tener al menos una letra, un número y un caracter especial",
      "password.string.empty": "La contraseña es requerida",
      "password.any.required": "La contraseña es requerida",

      "identification.string.min":
        "La identificación debe tener al menos 9 caracteres",
      "identification.string.max":
        "La identificación debe tener menos de 12 caracteres",
      "identification.string.pattern.base":
        "La identificación solo puede contener números",
      "identification.string.empty": "La identificación es requerida",
      "identification.any.required": "La identificación es requerida",

      "homeAddress.string.min":
        "La dirección debe tener al menos 10 caracteres",
      "homeAddress.string.empty": "La dirección es requerida",
      "homeAddress.any.required": "La dirección es requerida",

      "phoneNumber.string.min":
        "El número de teléfono debe tener al menos 8 caracteres",
      "phoneNumber.string.max":
        "El número de teléfono debe tener menos de 12 caracteres",
      "phoneNumber.string.pattern.base":
        "El número de teléfono solo puede contener números",
      "phoneNumber.string.empty": "El número de teléfono es requerido",
      "phoneNumber.any.required": "El número de teléfono es requerido",

      "photo.any.required": "La foto de perfil es requerida",
    };

    Swal.fire({
      icon: "warning",
      text: ERRORS[data.code],
      confirmButtonColor: "#73a942",
    });
  }
}
