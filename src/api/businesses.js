import Business from "../schemas/business.js";
import mongoose from "mongoose";
// Despues lo vamos a sacar de la sesion del usuario
const userId = "655638cc9e4fb7afc0eb39dc";

export function listBusinesses(req, res) {
  Business.find()
    .exec()
    .then(function (businesses) {
      const cleanedUpBusinesses = [];

      for (let i = 0; i < businesses.length; i++) {
        const name = businesses[i].name;
        const ownerId = businesses[i].ownerId;
        const categoriesIds = businesses[i].categoriesIds;

        const business = {
          name: name,
          ownerId: ownerId,
          categoriesIds: categoriesIds,
        };

        cleanedUpBusinesses.push(business);
      }

      res.json(cleanedUpBusinesses);
    });
}

export function getTotalBusinesses(req, res) {
  User.find()
    .exec()
    .then(function (businesses) {
      const totalBusinesses = businesses.length;

      res.json(totalBusinesses);
    });
}

export async function createNewBusiness(req, res) {
  try {

    const { name, address, categoriesIds, description, images } = req.body;
    


    const business = new Business({
      _id: new mongoose.Types.ObjectId(),
      name,
      ownerId: userId,
      address,
      categoriesIds,
      description,
      images,
      isApproved: false,
    });

    await business.save();

    res.status(201).json(business);
  } catch (error) {
    console.error(error);

    res.status(500).json({ error: 'Error al crear un nuevo negocio' });
  }
}


