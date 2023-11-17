import express from "express";
import Category from "../schemas/category.js";

const router = express.Router();

router.get("/listar", function (req, res) {
  Category.find()
    .exec()
    .then(function (result) {
      res.json(result);
    });
});

export default router;
