import bcrypt from "bcrypt";
import User from "../schemas/user.js";
import signUpValidationSchema from "../validation/signup.js";

export async function signup(req, res) {
  const { error, value: data } = signUpValidationSchema.validate(req.body);

  if (error) {
    return res.status(400).json({
      statusCode: 400,
      error: "Bad request",
      message: error.message,
    });
  }

  try {
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(data.password, salt);

    const user = new User({
      identification: data.identification,
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      passwordHash: passwordHash,
      passwordSalt: salt,
      role: "Viajero",
      paymentMethods: [],
      reservations: [],
    });

    await user.save();

    res.status(201).json({
      statusCode: 201,
      message: "User created",
      objectId: user._id,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      statusCode: 500,
      error: "Internal server error",
      message: "Something went wrong creating the user",
    });
  }
}

export function login(req, res) {
  // Validar que el usuario me envie el cuerpo del request
  // en formato JSON y que tenga username y password
  if (!req.body || !req.body.email || !req.body.password) {
    return res.status(400).json({
      message: "Invalid request",
    });
  }

  const email = req.body.email;
  const password = req.body.password;

  if (email == "admin@admin.com" && password == "admin") {
    res.status(200).json({
      message: "Login successful",
    });
  } else {
    res.status(401).json({
      message: "Invalid credentials",
    });
  }
}
