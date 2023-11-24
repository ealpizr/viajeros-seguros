import mongoose from "mongoose";
import Business from "../schemas/business.js";

// Despues lo vamos a sacar de la sesion del usuario
const userId = "655638cc9e4fb7afc0eb39dc";

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

    res.status(500).json({ error: "Error al crear un nuevo negocio" });
  }
}
