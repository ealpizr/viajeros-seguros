const TEST_BUSINESSES = [
  {
    _id: "1",
    name: "Test Business 1",
    description: "Test Business 1 Description",
    address: "Test Business 1 Address",
    images: [
      "https://via.placeholder.com/500x300",
      "https://via.placeholder.com/500x300",
      "https://via.placeholder.com/500x300",
    ],
    reviews: [
      {
        name: "Test User 1",
        photo: "https://via.placeholder.com/150",
        rating: 5,
        comment: "Test User 1 Comment",
      },
      {
        name: "Test User 2",
        photo: "https://via.placeholder.com/150",
        rating: 4,
        comment: "Test User 2 Comment",
      },
    ],
    rating: 4.5,
    numReviews: 2,
  },
  {
    _id: "2",
    name: "Test Business 2",
    description: "Test Business 2 Description",
    address: "Test Business 2 Address",
    images: [
      "https://via.placeholder.com/500x300",
      "https://via.placeholder.com/500x300",
      "https://via.placeholder.com/500x300",
    ],
    reviews: [
      {
        name: "Test User 1",
        photo: "https://via.placeholder.com/150",
        rating: 2,
        comment: "Test User 1 Comment",
      },
      {
        name: "Test User 2",
        photo: "https://via.placeholder.com/150",
        rating: 2,
        comment: "Test User 2 Comment",
      },
      {
        name: "Test User 2",
        photo: "https://via.placeholder.com/150",
        rating: 2,
        comment: "Test User 2 Comment",
      },
    ],
    rating: 1.5,
    numReviews: 3,
  },
];

function getRatingStars(rating) {
  const icons = {
    full: '<img src="/assets/star-filled-icon.svg" />',
    half: '<img src="/assets/star-half-filled-icon.svg" />',
    empty: '<img src="/assets/star-icon.svg" />',
  };

  const fullStars = Math.floor(rating);
  const halfStar = rating % 1 === 0.5;
  const emptyStars = 5 - fullStars - halfStar;

  return `${icons.full.repeat(fullStars)}${
    halfStar ? icons.half : ""
  }${icons.empty.repeat(emptyStars)}`;
}

const businessesContainer = document.getElementById("businesses-container");
for (let i = 0; i < TEST_BUSINESSES.length; ++i) {
  const b = TEST_BUSINESSES[i];

  const el = `<div class="business-card">
    <div class="business-card-section">
      <h2>${b.name}</h2>
      <p>${b.description}</p>
      <p>${b.address}</p>
    </div>
    <div class="business-card-section">
      <h3>Imágenes</h3>
      <div class="business-images-container">
        ${b.images
          .map(
            (img) => `<div class="business-image"><img src="${img}" /></div>`
          )
          .join("")}
      </div>
    </div>
    <div class="business-card-section">
      <h3>Feedback de reseñas</h3>
      <div class="rating-container">
        <p>${b.rating}</p>
        <div class="rating-stars-container">${getRatingStars(b.rating)}</div>
        <p>${b.numReviews} reseñas</p>
      </div>
      <div class="reviews-container">
        ${b.reviews
          .map(
            (r) => `<div class="review">
          <div class="review-image">
            <img src="${r.photo}" />
          </div>
          <div>
            <p>${r.name}</p>
            <p>${r.comment}</p>
          </div>
          </div>`
          )
          .join("")}
      </div>
    </div>`;

  businessesContainer.innerHTML += el;
}
