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
      .populate({
        path: "owner",
        select: "firstName lastName profilePicture",
      })
      .populate({
        path: "reservations",
        select: "day",
      })
      .populate({
        path: "reviews.userId",
        select: "firstName lastName",
      })
      .exec()
      .then(function (business) {
        res.json({
          name: business.name,
          description: business.description,
          address: business.address,
          price: business.price,
          rating: calculateRatingAverage(business.reviews),
          images: business.images,
          ownerPicture: business.owner.profilePicture,
          reviews: business.reviews.map((r) => {
            return {
              rating: r.rating,
              comment: r.comment,
              date: r.date,
              user: `${r.userId.firstName} ${r.userId.lastName}`,
            };
          }),
          ownerName: `${business.owner.firstName} ${business.owner.lastName}`,
          bookedDates: business.reservations.map(
            (r) => r.day.toISOString().split("T")[0]
          ),
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

export async function rateBusiness(req, res) {
  const { rating, comment } = req.body;

  if (!rating || !comment) {
    return res.status(400).json({ error: "Required fields missing" });
  }

  const business = await Business.findById(req.params.id).exec();

  if (!business) {
    return res.status(404).json({ error: "Business not found" });
  }

  business.reviews.push({
    _id: new mongoose.Types.ObjectId(),
    userId: req.session.user.id,
    rating,
    comment,
    date: new Date(),
  });

  await business.save();

  res.status(201).json({ message: "Review created successfully" });
}
