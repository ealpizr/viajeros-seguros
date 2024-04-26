import db from "../db/connection.js";
import newBusiness from "../validation/new-business.js";

function calculateRatingAverage(reviews) {
  if (reviews.length === 0) {
    return 0;
  }

  const ratings = reviews.map((review) => {
    return review.Calificacion;
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
      `SELECT R.Calificacion, R.Comentario, R.Fecha, CONCAT(U.Nombre, ' ', U.PrimerApellido, ' ', U.SegundoApellido) AS 'NombreUsuario' FROM Resenas R JOIN Usuarios U ON R.IDUsuario = U.Identificacion WHERE IDNegocio = ${business.ID}`
    );

    const fechasReservas = await db.query(
      `SELECT FechaReserva FROM Reservaciones WHERE IDNegocio = ${business.ID}`
    );

    res.json({
      name: business.Nombre,
      description: business.Descripcion,
      address: business.Direccion,
      price: business.CostoPorDia,
      rating: calculateRatingAverage(resenas),
      images: imagenes.map((i) => i.UrlImagen),
      ownerPicture: business.FotoDuenio,
      ownerName: business.NombreDuenio,
      reviews: resenas.map((r) => {
        return {
          rating: r.Calificacion,
          comment: r.Comentario,
          date: r.Fecha,
          user: r.NombreUsuario,
        };
      }),
      bookedDates: fechasReservas.map(
        (r) => r.FechaReserva.toISOString().split("T")[0]
      ),
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

  await db.execute(
    `INSERT INTO Negocios (Nombre, IDDueno, Descripcion, IDCategoria, Direccion, CostoPorDia, Telefono, Correo, Horario, Aprobado, Activo) VALUES ('${data.name}', '${req.session.user.id}', '${data.description}', '${data.categoryId}', '${data.address}', '${data.price}', '${data.phone}', NULL, '', 0, 1)`
  );

  const id = (
    await db.query(
      `SELECT ID FROM Negocios WHERE IDDueno = '${req.session.user.id}' ORDER BY ID DESC`
    )
  )[0].ID;

  data.images = req.files;

  for (let i = 0; i < data.images.length; i++) {
    await db.execute(
      `INSERT INTO ImagenesNegocios (IDNegocio, UrlImagen) VALUES (${id}, '${data.images[i].filename}')`
    );
  }

  res.status(201).json({
    code: 201,
    message: "Business created successfully",
  });
}

export async function rateBusiness(req, res) {
  const { rating, comment } = req.body;

  if (!rating || !comment) {
    return res.status(400).json({ error: "Required fields missing" });
  }

  const business = await db.query(
    `SELECT ID FROM Negocios WHERE ID = ${req.params.id}`
  );

  if (business.length === 0) {
    return res.status(404).json({ error: "Business not found" });
  }

  await db.execute(
    `INSERT INTO Resenas (IDNegocio, IDUsuario, Calificacion, Comentario, Fecha) VALUES (${req.params.id}, '${req.session.user.id}', ${rating}, '${comment}', GETDATE())`
  );

  res.status(201).json({ message: "Review created successfully" });
}
