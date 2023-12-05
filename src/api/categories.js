import Category from "../schemas/category.js";

export function listCategories(req, res) {
  Category.find()
    .exec()
    .then(function (result) {
      res.json(result);
    });
}
