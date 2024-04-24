document.addEventListener("DOMContentLoaded", () => {
  fetch("/api/me")
    .then((response) => response.json())
    .then((user) => {
      document.getElementById("fullName").innerText = user.fullName;
      document.getElementById("identification").innerText = user.identification;
      document.getElementById("profilePhoto").src = `/uploads/${user.photo}`;

      document.getElementById(
        "dateOfBirth"
      ).innerHTML += ` <span class="block">${user.dateOfBirth}</span>`;

      document.getElementById(
        "phoneNumber"
      ).innerHTML += ` <span class="block">${user.phone}</span>`;

      document.getElementById(
        "email"
      ).innerHTML += ` <span class="block">${user.email}</span>`;
    });
});
