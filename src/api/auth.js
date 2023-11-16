import express from "express";

const router = express.Router();

router.post("/login", function (req, res) {
  // Validar que el usuario me envie el cuerpo del request
  // en formato JSON y que tenga username y password
  if (!req.body || !req.body.email || !req.body.password) {
    res.status(400).json({
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
});

export default router;
