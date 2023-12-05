import mongoose from "mongoose";
import Business from "../schemas/business.js";
import newBusiness from "../validation/new-business.js";

function calculateRatingAverage(reviews) {
  // [5, 4, 3, 5, ...]
  const ratings = reviews.map((review) => {
    return review.rating;
  });

  let sum = 0;
  for (let i = 0; i < ratings.length; i++) {
    sum += ratings[i];
  }

  const average = sum / ratings.length;

  return average;
}

export async function listBusinesses(req, res) {
  try {
    Business.find({ isApproved: true })
      .exec()
      .then(function (businesses) {
        res.json(
          businesses.map((b) => {
            return {
              id: b._id,
              name: b.name,
              price: b.price,
              address: b.address,
              description: b.description,
              rating: calculateRatingAverage(b.reviews),
            };
          })
        );
      });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "Error al listar los negocios" });
  }
}

export async function businessDetails(req, res) {
  try {
    const { id } = req.params;

    Business.findById(id)
      .exec()
      .then(function (business) {
        res.json({
          name: business.name,
          description: business.description,
          address: business.address,
          price: business.price,
          rating: calculateRatingAverage(business.reviews),
          // agregar campos adicionales
        });
      });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "Error al listar los negocios" });
  }
}

export async function createNewBusiness(req, res) {
  const { error, value: data } = newBusiness.validate(req.body);
  if (error) {
    return res.status(400).json({
      statusCode: 400,
      error: "Bad request",
      message: error.message,
      code: `${error.details[0].path}.${error.details[0].type}`,
    });
  }

  const business = new Business({
    _id: new mongoose.Types.ObjectId(),
    name: data.name,
    owner: req.session.user.id,
    address: data.address,
    category: data.categoryId,
    description: data.description,
    images: req.files.map((file) => file.filename),
    phoneNumber: data.phone,
    price: data.price,
    isApproved: false,
  });

  await business.save();

  res.status(201).json({
    code: 201,
    message: "Business created successfully",
    businessId: business._id,
  });
}
