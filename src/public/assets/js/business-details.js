document.addEventListener("DOMContentLoaded", () => {
  const urlParams = new URLSearchParams(window.location.search);
  const id = urlParams.get("id");

  fetch(`/api/businesses/${id}`)
    .then((response) => response.json())
    .then((business) => {
      document.getElementById("business-name").innerText = business.name;
    });
});
