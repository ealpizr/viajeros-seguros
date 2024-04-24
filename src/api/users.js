import db from "../db/connection.js";
import Business from "../schemas/business.js";

function calculateRatingAverage(reviews) {
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

export async function getCurrentUser(req, res) {
  let usuario = await db.query(
    `SELECT Identificacion, CONCAT(Nombre, ' ', PrimerApellido, ' ', SegundoApellido) AS NombreCompleto, Correo, Telefono, FechaNacimiento, UrlFoto FROM Usuarios WHERE Identificacion = '${req.session.user.id}'`
  );

  if (usuario.length === 0) {
    return res.status(404).json({ error: "Something bad happened" });
  }
  usuario = usuario[0];

  res.json({
    identification: usuario.Identificacion,
    fullName: usuario.NombreCompleto,
    email: usuario.Correo,
    phone: usuario.Telefono,
    dateOfBirth: usuario.FechaNacimiento,
    photo: usuario.UrlFoto,
  });
}

export function listUserBusinesses(req, res) {
  Business.find({ owner: req.session.user.id })
    .exec()
    .then((businesses) => {
      res.json(
        businesses.map((b) => {
          return {
            id: b._id,
            name: b.name,
            price: b.price,
            address: b.address,
            description: b.description,
            images: b.images,
            rating: calculateRatingAverage(b.reviews),
          };
        })
      );
    });
}
