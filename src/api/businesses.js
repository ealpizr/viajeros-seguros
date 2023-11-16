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
