document.addEventListener("DOMContentLoaded", () => {
  const calendar = new VanillaCalendar("#calendar");
  calendar.init();

  const urlParams = new URLSearchParams(window.location.search);
  const id = urlParams.get("id");

  fetch(`/api/businesses/${id}`)
    .then((response) => response.json())
    .then((business) => {
      console.log(business);
      document.getElementById("business-name").innerText = business.name;
      document.getElementById("business-description").innerText =
        business.description;
      document.getElementById("business-address").innerText = business.address;
      document.getElementById("business-price").innerText += business.price;
      document.getElementById("business-rating").innerText = business.rating;
      document.getElementById("stars").innerHTML =
        '<span class="icon"><ion-icon name="star"></ion-icon></span>'.repeat(
          Math.floor(business.rating)
        );
    });
});
