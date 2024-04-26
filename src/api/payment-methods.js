import db from "../db/connection.js";

export async function listPaymentMethods(req, res) {
  const metodosDePago = await db.query(
    `SELECT ID, Tipo, Detalles FROM MetodosPagoUsuario WHERE IDUsuario = '${req.session.user.id}'`
  );

  res.json(
    metodosDePago.map((m) => {
      return {
        _id: m.ID,
        type: m.Tipo,
        details: m.Detalles,
      };
    })
  );
}

export async function createPaymentMethod(req, res) {
  const { type, details } = req.body;
  if (!type || !details) {
    res.status(400).json({ message: "Missing required fields" });
    return;
  }

  await db.execute(
    `INSERT INTO MetodosPagoUsuario (IDUsuario, Tipo, Detalles) VALUES ('${req.session.user.id}', '${type}', '${details}')`
  );

  return res.status(201).json({ message: "Payment method created" });
}

export async function deletePaymentMethod(req, res) {
  const { id } = req.params;

  await db.execute(
    `DELETE FROM MetodosPagoUsuario WHERE ID = ${id} AND IDUsuario = '${req.session.user.id}'`
  );

  return res.status(200).json({ message: "Payment method deleted" });
}
