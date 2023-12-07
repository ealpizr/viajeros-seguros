const id = new URLSearchParams(window.location.search).get("id");

const BOOKED_DATES = JSON.parse(localStorage.getItem("shoppingCart") || "[]")
  .filter((i) => i.id === id)
  .map((i) => i.date);

document.addEventListener("DOMContentLoaded", () => {
  const calendar = new VanillaCalendar("#calendar", {
    actions: {
      getDays(day, date, HTMLElement, HTMLButtonElement) {
        if (BOOKED_DATES.includes(date)) {
          HTMLButtonElement.style.backgroundColor = "#FFD60A";
          HTMLButtonElement.style.color = "#fff";
        }
      },
      clickDay(event, dates) {
        document.getElementById("add-to-cart").disabled = !dates.length;
        document.getElementById("add-to-cart").innerText = dates.length
          ? "Agregar al carrito"
          : "Seleccione una fecha";
      },
    },
    settings: {
      lang: "es-CR",
      range: {
        min: new Date().toISOString().split("T")[0],
        disabled: BOOKED_DATES,
      },
      visibility: {
        weekend: false,
        today: false,
        disabled: true,
      },
    },
  });
  calendar.init();

  document.getElementById("booking-form").addEventListener("submit", (e) => {
    e.preventDefault();
    addToCart(calendar);
  });

  fetch(`/api/businesses/${id}`)
    .then((response) => response.json())
    .then((business) => {
      BOOKED_DATES.push(...business.bookedDates);
      calendar.update();

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

      document.getElementById("pictures").innerHTML = business.images
        .map(
          (i) => `<div><img src="/uploads/${i}" alt="${business.name}"></div>`
        )
        .join("");

      if (business.reviews.length === 0) {
        document.getElementById("reviews-container").innerHTML += `
            <div class="profile-review">
              <p class="text-1-review">
                No hay reseñas
              </p>
            </div>
            `;
      }

      document.getElementById("reviews-container").innerHTML +=
        business.reviews.map(
          (r) => `
          <div class="profile-review">
            <p class="text-1-review">
              ${r.comment} (${r.rating} estrellas)<br />
              <span class="review-info">${r.user} (${new Date(
            r.date
          ).toLocaleDateString("es-CR")})</span>
            </p>
          </div>
          `
        );

      document.getElementById(
        "owner-picture"
      ).src = `/uploads/${business.ownerPicture}`;

      document.getElementById("owner-name").innerText = business.ownerName;
    });
});

async function addToCart(calendar) {
  const date = calendar.selectedDates[0];

  const shoppingCart = JSON.parse(localStorage.getItem("shoppingCart")) || [];
  shoppingCart.push({
    id: id,
    date: date,
  });

  localStorage.setItem("shoppingCart", JSON.stringify(shoppingCart));
  BOOKED_DATES.push(date);

  Swal.fire({
    icon: "success",
    text: `La reserva para ${new Date(
      `${date}T00:00:00-06:00`
    ).toLocaleDateString("es-CR")} se ha agregado al carrito con éxito`,
    didClose: () => {
      calendar.selectedDates = [];
      document.getElementById("add-to-cart").disabled = true;
      document.getElementById("add-to-cart").innerText = "Seleccione una fecha";
      calendar.update();
    },
  });
}
