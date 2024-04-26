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

export async function listUnapprovedBusinesses(req, res) {
  try {
    const business = await db.query(
      `SELECT N.ID, N.Nombre, N.Descripcion, N.Direccion, N.CostoPorDia, N.Telefono, C.Nombre AS 'NombreCategoria' FROM Negocios N JOIN Categorias C ON N.IDCategoria = C.ID WHERE Aprobado = 0`
    );

    for (let i = 0; i < business.length; i++) {
      const imagen = (
        await db.query(
          `SELECT TOP 1 UrlImagen FROM ImagenesNegocios WHERE IDNegocio = ${business[i].ID}`
        )
      )[0].UrlImagen;

      business[i].imagen = imagen;
    }

    res.json(
      business.map((n) => {
        return {
          id: n.ID,
          name: n.Nombre,
          description: n.Descripcion,
          category: n.NombreCategoria,
          address: n.Direccion,
          price: n.CostoPorDia,
          image: n.imagen,
          phone: n.Telefono,
        };
      })
    );
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "Error al listar los negocios" });
  }
}

export async function listBusinesses(req, res) {
  const businesses = await db.query(
    `SELECT N.ID, N.Nombre, N.Direccion, N.Descripcion, N.CostoPorDia, U.Nombre AS NombreDueno, U.PrimerApellido AS ApellidoDueno, C.Nombre AS NombreCategoria FROM Negocios N JOIN Usuarios U ON N.IDDueno = U.Identificacion JOIN Categorias C ON N.IDCategoria = C.ID WHERE N.Aprobado = 1 AND N.Activo = 1`
  );

  for (let i = 0; i < businesses.length; i++) {
    const reviews = await db.query(
      `SELECT Calificacion FROM Resenas WHERE IDNegocio = ${businesses[i].ID}`
    );

    businesses[i].rating = calculateRatingAverage(reviews);
  }

  res.json(
    businesses.map((business) => {
      return {
        id: business.ID,
        name: business.Nombre,
        address: business.Direccion,
        description: business.Descripcion,
        price: business.CostoPorDia,
        owner: business.NombreDueno + " " + business.ApellidoDueno,
        category: business.NombreCategoria,
        rating: business.rating,
      };
    })
  );
}

export async function listUsers(req, res) {
  const users = await db.query(
    `SELECT Identificacion, CONCAT(Nombre, ' ', PrimerApellido, ' ', SegundoApellido) AS NombreCompleto, Correo FROM Usuarios`
  );

  res.json(
    users.map((user) => {
      return {
        identification: user.Identificacion,
        fullName: user.NombreCompleto,
        email: user.Correo,
      };
    })
  );
}

export async function approveBusiness(req, res) {
  const { id } = req.params;

  db.execute(`UPDATE Negocios SET Aprobado = 1 WHERE ID = ${id}`);

  res.status(200).json({
    message: "Business approved",
  });
}

export function denyBusiness(req, res) {
  const { id } = req.params;

  db.execute(`DELETE FROM Negocios WHERE ID = ${id}`);

  res.status(200).json({
    message: "Business denied",
  });
}
