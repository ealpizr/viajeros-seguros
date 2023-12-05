document.addEventListener("DOMContentLoaded", () => {
  const forgotPasswordForm = document.getElementById("forgot-password-form");

  forgotPasswordForm.addEventListener("submit", (e) => {
    e.preventDefault();
    forgotPassword();
  });
});

async function forgotPassword() {
  const email = document.getElementById("email").value;

  Swal.fire({
    heightAuto: false,
    allowOutsideClick: false,
    didOpen: () => {
      Swal.showLoading();
    },
  });

  const response = await fetch("/api/auth/forgot-password", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email }),
  });

  if (!response.ok) {
    return Swal.fire({
      icon: "error",
      text: "Ocurrió un error al enviar el correo electrónico, por favor intenta de nuevo",
      confirmButtonColor: "#73a942",
      heightAuto: false,
    });
  }

  Swal.fire({
    icon: "success",
    text: "Si el correo electrónico está registrado en nuestra base de datos, recibirás un correo electrónico con tu nueva contraseña",
    confirmButtonColor: "#73a942",
    heightAuto: false,
    didClose: () => {
      window.location.href = "/app/login";
    },
  });
}
