import Business from "../schemas/business.js";

export async function listBusinessReservations(req, res) {
  try {
    const business = await Business.findOne({
      owner: req.session.user.id,
      _id: req.params.id,
    })
      .populate({
        path: "reservations",
        populate: {
          path: "userId",
          select: "firstName lastName",
        },
      })
      .exec();

    res.json(
      business.reservations.map((r) => {
        return {
          user: r.userId.firstName + " " + r.userId.lastName,
          date: r.day.toLocaleDateString("es-CR"),
        };
      })
    );
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "Error al listar las reservas" });
  }
}
