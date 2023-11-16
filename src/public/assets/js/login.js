const wrapper = document.querySelector(".wrapper");
const loginLink = document.querySelector(".login-link");
const registerLink = document.querySelector(".register-link");
const Popup = document.querySelector("btnLogin-popup");
const iconClose = document.querySelector("icon-close");

registerLink.addEventListener("click", () => {
  wrapper.classList.add("active");
});

loginLink.addEventListener("click", () => {
  wrapper.classList.remove("active");
});

Popup.addEventListener("click", () => {
  wrapper.classList.add("active-popup");
});
iconClose.addEventListener("click", () => {
  wrapper.classList.remove("active-popup");
});

function login() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  fetch("/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: email,
      password: password,
    }),
  }).then((res) => {
    if (res.status === 200) {
      // Las credenciales estan bien
      window.location = "/app";
    } else {
      // Las credenciales estan mal
      document.getElementById("password").value = "";
      alert("Credenciales incorrectas");
    }
  });
}
