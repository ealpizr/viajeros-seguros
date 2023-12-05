import Business from "../schemas/business.js";
import Reservation from "../schemas/reservation.js";
import User from "../schemas/user.js";

export async function listReservations(req, res) {
  try {
    const user = await User.findById(req.session.user.id).exec();
    const reservations = [];
    const reservationIds = user.reservations;

    for (let i = 0; i < reservationIds.length; i++) {
      const reservation = await Reservation.findById(reservationIds[i])
        .populate({
          path: "businessId",
          select: "name description images",
          // The schema property here is not required.
          // We just add it here so that VSCode's remove unused imports
          // functionallity doesn't break the code.
          schema: Business,
        })
        .exec();

      reservations.push(reservation);
    }

    res.json(reservations);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "Error al listar las reservas" });
  }
}
