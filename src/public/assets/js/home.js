function formatPrice(price) {
  return price.toLocaleString("es-CR", {
    style: "currency",
    currency: "CRC",
  });
}

document.addEventListener("DOMContentLoaded", () => {
  fetch("/api/businesses")
    .then((res) => res.json())
    .then((businesses) => {
      const container = document.getElementById("businesses-container");

      for (let i = 0; i < businesses.length; i++) {
        let ratings = "Sin valoraciones";
        if (businesses[i].rating != null) {
          ratings = businesses[i].rating;
        }

        const el = `
        <div class="business-card">
        <div class="businesses-image-container">
          <img src="/assets/images/casa1.jpg" />
        </div>
        <div class="business-info-container">
          <div class="flex items-center justify-between">
            <div>
              <p class="business-title">${businesses[i].name}</p>
              <p class="business-location">${businesses[i].address}</p>
            </div>
            <div>
              <p class="business-price text-right">${formatPrice(
                businesses[i].price
              )}</p>
              <p class="business-rating text-right">${ratings}</p>
            </div>
          </div>
          <p class="business-description">
          ${businesses[i].description}
          </p>
          <a href="details?id=${
            businesses[i].id
          }" class="business-details-button"
            >Ver más detalles</a
          >
        </div>
      </div>
        `;

        container.insertAdjacentHTML("beforeend", el);
      }
    });
});
