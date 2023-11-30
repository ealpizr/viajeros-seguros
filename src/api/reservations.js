import User from "../schemas/user.js";
import Reservation from "../schemas/reservation.js";
const userId = "65655817c7cfd62135ae90a4";

export async function listReservations(req, res) {
  try {
    User.findById(userId)
      .exec()
      .then(function (user) {
        const reservations = [];
        const reservationIds = user.reservations;
        reservationIds.forEach(Id => {
          Reservation.findById(Id).exec().then(function (reservation) {
            console.log(reservation)
            reservations.push(reservation)
          });
        });

        res.json(reservations);
      })

    
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "Error al listar las reservas" });
  }
}


