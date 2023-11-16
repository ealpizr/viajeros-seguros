import express from "express";
import Reservation from "../schemas/reservation.js";

const router = express.Router();

router.get("/listar", function (req, res) {
  Reservation.find()
    .exec()
    .then(function (result) {
      res.json(result);
    });
});

export default router;
