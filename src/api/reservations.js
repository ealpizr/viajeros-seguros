import mongoose from "mongoose";
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

export async function bookReservations(req, res) {
  const { paymentMethodId, reservations } = req.body;

  if (!paymentMethodId || !reservations) {
    return res.status(400).json({ error: "Required fields missing" });
  }

  const user = await User.findById(req.session.user.id).exec();

  if (
    !user.paymentMethods
      .map((pm) => pm._id.toString())
      .includes(paymentMethodId)
  ) {
    return res.status(400).json({ error: "Payment method not found" });
  }

  for (let i = 0; i < reservations.length; i++) {
    const business = await Business.findById(reservations[i].businessId).exec();
    if (!business) {
      continue;
    }

    const mongoId = new mongoose.Types.ObjectId();

    const reservation = new Reservation({
      _id: mongoId,
      userId: req.session.user.id,
      businessId: reservations[i].businessId,
      totalPaid: business.price,
      day: new Date(`${reservations[i].day}T00:00:00-06:00`),
      paymentMethodId,
    });
    await reservation.save();

    business.reservations.push(mongoId);
    await business.save();

    user.reservations.push(mongoId);
  }

  await user.save();

  res.status(200).json({ message: "Reservations booked" });
}
