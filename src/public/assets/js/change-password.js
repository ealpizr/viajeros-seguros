document.addEventListener("DOMContentLoaded", () => {
  const changePasswordForm = document.getElementById("change-password-form");

  changePasswordForm.addEventListener("submit", (e) => {
    e.preventDefault();
    changePassword();
  });
});

async function changePassword() {
  const oldPassword = document.getElementById("oldPassword").value;
  const password = document.getElementById("newPassword").value;
  const passwordConfirm = document.getElementById("passwordConfirmation").value;

  if (password !== passwordConfirm) {
    return Swal.fire({
      icon: "error",
      text: "Las contraseñas no coinciden",
      confirmButtonColor: "#73a942",
      heightAuto: false,
    });
  }

  Swal.fire({
    heightAuto: false,
    allowOutsideClick: false,
    didOpen: () => {
      Swal.showLoading();
    },
  });

  const response = await fetch("/api/auth/reset-password", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ oldPassword, password }),
  });

  if (response.status === 401) {
    return Swal.fire({
      icon: "error",
      text: "La contraseña actual es incorrecta",
      confirmButtonColor: "#73a942",
      heightAuto: false,
    });
  }

  if (response.status === 400) {
    const ERRORS = {
      "password.string.min":
        "La nueva contraseña debe tener al menos 8 caracteres",
      "password.string.pattern.base":
        "La contraseña debe tener al menos una letra, un número y un caracter especial",
    };

    const { code } = await response.json();
    return Swal.fire({
      icon: "error",
      text: ERRORS[code],
      confirmButtonColor: "#73a942",
      heightAuto: false,
    });
  }

  if (response.status !== 200) {
    return Swal.fire({
      icon: "error",
      text: "Ocurrió un error al cambiar la contraseña, por favor intenta de nuevo",
      confirmButtonColor: "#73a942",
      heightAuto: false,
    });
  }

  Swal.fire({
    icon: "success",
    text: "La contraseña se cambió exitosamente",
    confirmButtonColor: "#73a942",
    heightAuto: false,
    didClose: () => {
      window.location.href = "/app/me/profile";
    },
  });
}
