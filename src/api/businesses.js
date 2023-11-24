import mongoose from "mongoose";
import Business from "../schemas/business.js";

// Despues lo vamos a sacar de la sesion del usuario
const userId = "655638cc9e4fb7afc0eb39dc";

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
          // agregar campos adicionales
        });
      });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "Error al listar los negocios" });
  }
}

export async function createNewBusiness(req, res) {
  try {
    const { name, address, categoriesIds, description, images } = req.body;

    const business = new Business({
      _id: new mongoose.Types.ObjectId(),
      name,
      ownerId: userId,
      address,
      categoriesIds,
      description,
      images,
      isApproved: false,
    });

    await business.save();

    res.status(201).json(business);
  } catch (error) {
    console.error(error);

    res.status(500).json({ error: "Error al crear un nuevo negocio" });
  }
}
