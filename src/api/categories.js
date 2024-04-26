import db from "../db/connection.js";

export async function listCategories(req, res) {
  const categorias = await db.query(`SELECT ID, Nombre FROM Categorias`);

  res.json(
    categorias.map((c) => {
      return {
        _id: c.ID,
        name: c.Nombre,
      };
    })
  );
}
