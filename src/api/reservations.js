import db from "../db/connection.js";

export async function listReservations(req, res) {
  try {
    const reservaciones = await db.query(
      `SELECT R.ID, R.IDUsuario, R.IDNegocio, R.Total, R.IDMetodoPago, R.FechaReserva, R.FechaCreada, N.Nombre AS 'NombreNegocio', N.Descripcion AS 'DescripcionNegocio' FROM Reservaciones R JOIN Negocios N ON R.IDNegocio = N.ID WHERE IDUsuario = '${req.session.user.id}'`
    );

    res.json(
      reservaciones.map((r) => {
        return {
          id: r.ID,
          userId: r.IDUsuario,
          businessId: {
            _id: r.IDNegocio,
            name: r.NombreNegocio,
            description: r.DescripcionNegocio,
          },
          totalPaid: r.Total,
          paymentMethodId: r.IDMetodoPago,
          day: r.FechaReserva,
        };
      })
    );
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "Error al listar las reservas" });
  }
}

export async function bookReservations(req, res) {
  const { paymentMethodId, reservations } = req.body;

  if (!paymentMethodId || !reservations) {
    return res.status(400).json({ error: "Required fields missing" });
  }

  const metodoPago = await db.query(
    `SELECT ID, IDUsuario FROM MetodosPagoUsuario WHERE ID = ${paymentMethodId}`
  );
  if (
    metodoPago.length === 0 ||
    metodoPago[0].IDUsuario !== req.session.user.id
  ) {
    return res.status(400).json({ error: "Payment method not found" });
  }

  for (let i = 0; i < reservations.length; i++) {
    const negocio = await db.query(
      `SELECT ID, CostoPorDia FROM Negocios WHERE ID = ${reservations[i].businessId}`
    );

    if (negocio.length === 0) {
      continue;
    }

    db.execute(
      `INSERT INTO Reservaciones (IDUsuario, IDNegocio, Total, IDMetodoPago, FechaReserva, FechaCreada) VALUES ('${req.session.user.id}', '${reservations[i].businessId}', '${negocio[0].CostoPorDia}', '${paymentMethodId}', '${reservations[i].day}', GETDATE())`
    );
  }

  res.status(200).json({ message: "Reservations booked" });
}
