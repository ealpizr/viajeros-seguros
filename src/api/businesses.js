import express from "express";
import Business from "../schemas/business.js";

const router = express.Router();

router.get("/listar", function (req, res) {
  Business.find()
    .exec()
    .then(function (result) {
      res.json(result);
    });
});

export default router;

export function getTotalBusinesses(req, res) {
  User.find()
    .exec()
    .then(function (businesses) {

      const totalBusinesses = businesses.length;

      res.json(totalBusinesses);
    });
}