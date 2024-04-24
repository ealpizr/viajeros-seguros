import mongoose from "mongoose";
import db from "../db/connection.js";
import Business from "../schemas/business.js";
import newBusiness from "../validation/new-business.js";

function calculateRatingAverage(reviews) {
  if (reviews.length === 0) {
    return 0;
  }

  const ratings = reviews.map((review) => {
    return review.calificacion;
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
    const negocios = await db.query(
      `SELECT ID, Nombre, Descripcion, Direccion, CostoPorDia FROM Negocios WHERE Aprobado = 1 AND Activo = 1`
    );

    for (let i = 0; i < negocios.length; i++) {
      const imagenes = await db.query(
        `SELECT UrlImagen FROM ImagenesNegocios WHERE IDNegocio = ${negocios[i].ID}`
      );
      const resenas = await db.query(
        `SELECT Calificacion, Comentario FROM Resenas WHERE IDNegocio = ${negocios[i].ID}`
      );
      negocios[i].imagenes = imagenes.map((i) => i.UrlImagen);
      negocios[i].resenas = resenas.map((r) => {
        return {
          calificacion: r.Calificacion,
          comentario: r.Comentario,
        };
      });
    }

    res.json(
      negocios.map((n) => {
        return {
          id: n.ID,
          name: n.Nombre,
          description: n.Descripcion,
          address: n.Direccion,
          price: n.CostoPorDia,
          images: n.imagenes,
          reviews: calculateRatingAverage(n.resenas),
        };
      })
    );
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "Error al listar los negocios" });
  }
}

export async function businessDetails(req, res) {
  try {
    const { id } = req.params;

    // Business.findById(id)
    //   .populate({
    //     path: "owner",
    //     select: "firstName lastName profilePicture",
    //   })
    //   .populate({
    //     path: "reservations",
    //     select: "day",
    //   })
    //   .populate({
    //     path: "reviews.userId",
    //     select: "firstName lastName",
    //   })
    //   .exec()
    //   .then(function (business) {
    //     res.json({
    //       name: business.name,
    //       description: business.description,
    //       address: business.address,
    //       price: business.price,
    //       rating: calculateRatingAverage(business.reviews),
    //       images: business.images,
    //       ownerPicture: business.owner.profilePicture,
    //       reviews: business.reviews.map((r) => {
    //         return {
    //           rating: r.rating,
    //           comment: r.comment,
    //           date: r.date,
    //           user: `${r.userId.firstName} ${r.userId.lastName}`,
    //         };
    //       }),
    //       ownerName: `${business.owner.firstName} ${business.owner.lastName}`,
    //       bookedDates: business.reservations.map(
    //         (r) => r.day.toISOString().split("T")[0]
    //       ),
    //     });
    //   });

    let business = await db.query(
      `SELECT N.ID, N.Nombre, N.Descripcion, N.Direccion, N.CostoPorDia, CONCAT(U.Nombre, ' ', U.PrimerApellido, ' ', U.SegundoApellido) AS 'NombreDuenio', U.UrlFoto AS FotoDuenio FROM Negocios N INNER JOIN Usuarios U ON N.IDDueno = U.Identificacion WHERE N.ID = ${id}`
    );

    if (business.length === 0) {
      return res.status(404).json({ error: "Negocio no encontrado" });
    }
    business = business[0];

    const imagenes = await db.query(
      `SELECT UrlImagen FROM ImagenesNegocios WHERE IDNegocio = ${business.ID}`
    );

    const resenas = await db.query(
      `SELECT R.Calificacion, R.Comentario, R.Fecha, CONCAT(U.Nombre, ' ', U.PrimerApellido, ' ', U.SegundoApellido) FROM Resenas R JOIN Usuarios U ON R.IDUsuario = U.Identificacion WHERE IDNegocio = ${business.ID}`
    );

    res.json({
      name: business.Nombre,
      description: business.Descripcion,
      address: business.Direccion,
      price: business.CostoPorDia,
      rating: calculateRatingAverage(resenas),
      images: imagenes.map((i) => i.UrlImagen),
      reviews: calculateRatingAverage(resenas),
      ownerPicture: business.FotoDuenio,
      ownerName: business.NombreDuenio,
      reviews: resenas.map((r) => {
        return {
          rating: r.Calificacion,
          comment: r.Comentario,
          date: r.Fecha,
          user: r.Nombre,
        };
      }),
      bookedDates: [],
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
