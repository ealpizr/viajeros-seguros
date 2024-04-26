import db from "../db/connection.js";

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

export async function listUserBusinesses(req, res) {
  const negocios = await db.query(
    `SELECT ID, Nombre, Direccion, Descripcion, CostoPorDia FROM Negocios WHERE IDDueno = '${req.session.user.id}'`
  );

  for (let i = 0; i < negocios.length; i++) {
    const reviews = await db.query(
      `SELECT Calificacion FROM Resenas WHERE IDNegocio = ${negocios[i].ID}`
    );
    const imagenes = await db.query(
      `SELECT UrlImagen FROM ImagenesNegocios WHERE IDNegocio = ${negocios[i].ID}`
    );

    negocios[i].rating = calculateRatingAverage(reviews);
    negocios[i].images = imagenes.map((imagen) => {
      return imagen.UrlImagen;
    });
  }

  res.json(
    negocios.map((n) => {
      return {
        id: n.ID,
        name: n.Nombre,
        price: n.CostoPorDia,
        address: n.Direccion,
        description: n.Descripcion,
        images: n.images,
        rating: n.rating,
      };
    })
  );
}
