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
        <a href="details?id=${businesses[i].id}" class="item-container">
          <div class="item-image-container">
            <img src="/assets/images/casa1.jpg" />

            <div class="text-img">
              <p class="text-white" >${businesses[i].description}</p>
              <p class="valoracion"><i class="fas fa-star"></i> ${ratings}</p>
            </div>
          </div>

          <div class="item-info-container">
            <h4>${businesses[i].name}</h4>
            <h4>₡${businesses[i].price}</h4>
            <p>${businesses[i].address}</p>
          </div>
        </a>
        `;

        container.insertAdjacentHTML("beforeend", el);
      }
    });
});
