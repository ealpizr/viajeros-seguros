const businessesContainer = document.getElementById("businesses-container");

document.addEventListener("DOMContentLoaded", () => {
  fetch("/api/me/businesses")
    .then((response) => response.json())
    .then((businesses) => {
      // Mostrar info de negocios
      businessesContainer.innerHTML = "";

      if (businesses.length === 0) {
        const noBusinessesMessage =
          '<h1 class="center-text">No tienes negocios para administrar</h1>';
        businessesContainer.innerHTML = noBusinessesMessage;
      } else {
        businesses.forEach((business) => {
          const el = createBusinessCardElement(business);
          businessesContainer.insertAdjacentHTML("beforeend", el);
        });
      }
    })
    .catch((error) => {
      console.error("Error al obtener la información de negocios:", error);
      alert("Hubo un problema al cargar la información de negocios");
    });
});

function getRatingStars(rating) {
  const icons = {
    full: '<img src="/assets/icons/star-filled-icon.svg" />',
    half: '<img src="/assets/icons/star-half-filled-icon.svg" />',
    empty: '<img src="/assets/icons/star-icon.svg" />',
  };

  const fullStars = Math.floor(rating);
  const halfStar = rating % 1 === 0.5;
  const emptyStars = 5 - fullStars - halfStar;

  return `${icons.full.repeat(fullStars)}${
    halfStar ? icons.half : ""
  }${icons.empty.repeat(emptyStars)}`;
}

function createBusinessCardElement(business) {
  const imagesHtml =
    business.images && Array.isArray(business.images)
      ? business.images
          .map(
            (img) =>
              `<div class="business-image"><img src="/uploads/${img}" /></div>`
          )
          .join("")
      : "<p>No hay imágenes disponibles</p>";

  const reviewsHtml =
    business.reviews && Array.isArray(business.reviews)
      ? business.reviews
          .map(
            (review) => `<div class="review">
            <div class="review-image">
              <img src="${review.photo}" />
            </div>
            <div>
              <p>${review.name}</p>
              <p class="text-secondary">${review.comment}</p>
            </div>
          </div>`
          )
          .join("")
      : "<p>No hay reseñas disponibles</p>";

  return `<div class="business-card">
    <div class="business-card-section">
      <div class="business-card-title-container">
        <h2>${business.name}</h2>
      </div>
      <p class="text-secondary">${business.description}</p>
      <p class="text-secondary">${business.address}</p>
    </div>
    <div class="business-card-section">
      <h3>Imágenes</h3>
      <div class="business-images-container">${imagesHtml}</div>
    </div>
    <div class="business-card-section">
      <h3>Feedback de reseñas</h3>
      <div class="rating-container">
        <p class="text-bold">${business.rating || 0}</p>
        <div class="rating-stars-container">${getRatingStars(
          business.rating || 0
        )}</div>
        <p class="text-secondary">${business.numReviews || 0} reseñas</p>
      </div>
      <div class="reviews-container">${reviewsHtml}</div>
    </div>`;
}
