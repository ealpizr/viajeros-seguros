import bcrypt from "bcrypt";
import db from "../db/connection.js";
import emailTransporter from "../email.js";
import User from "../schemas/user.js";
import forgotPasswordValidationSchema from "../validation/forgot-password.js";
import loginValidationSchema from "../validation/login.js";
import resetPasswordValidationSchema from "../validation/reset-password.js";
import signUpValidationSchema from "../validation/signup.js";

export async function signup(req, res) {
  const { error, value: data } = signUpValidationSchema.validate(req.body);

  if (error) {
    return res.status(400).json({
      statusCode: 400,
      error: "Bad request",
      message: error.message,
      code: `${error.details[0].path}.${error.details[0].type}`,
    });
  }

  if (!req.file) {
    return res.status(400).json({
      statusCode: 400,
      error: "Bad request",
      message: "profile picture is required",
      code: "photo.any.required",
    });
  }

  try {
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(data.password, salt);

    await db.execute(
      `INSERT INTO Usuarios (Identificacion, Nombre, PrimerApellido, SegundoApellido, Correo, Telefono, FechaNacimiento, UrlFoto, HashContrasena, SaltContrasena, IDRol) VALUES ('${
        data.identification
      }', '${data.firstName}', '${data.firstLastName}', '${
        data.secondLastName
      }', '${data.email}', '${data.phoneNumber}', '${
        data.dateOfBirth.toISOString().split("T")[0]
      }', '${req.file.filename}', '${passwordHash}', '${salt}', 2)`
    );

    res.status(201).json({
      statusCode: 201,
      message: "User created",
      objectId: data.identification,
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

export async function login(req, res) {
  const { error, value: data } = loginValidationSchema.validate(req.body);
  const unautorizedResponse = {
    statusCode: 401,
    error: "Unauthorized",
    message: "Invalid credentials",
  };

  if (error) {
    return res.status(400).json({
      statusCode: 400,
      error: "Bad request",
      message: error.message,
    });
  }

  let userLogin = await db.query(
    `SELECT U.Identificacion, R.Descripcion AS 'Rol', U.HashContrasena, U.SaltContrasena FROM Usuarios U JOIN Roles R ON U.IDRol = R.ID WHERE Correo = '${data.email}'`
  );
  console.log(userLogin);

  if (userLogin.length === 0) {
    return res.status(401).json(unautorizedResponse);
  }

  userLogin = userLogin[0];

  const passwordHash = await bcrypt.hash(
    data.password,
    userLogin.SaltContrasena
  );

  if (passwordHash !== userLogin.HashContrasena) {
    return res.status(401).json(unautorizedResponse);
  }

  req.session.user = {
    id: userLogin.Identificacion,
    role: userLogin.Rol,
  };

  res.status(200).json({
    status: 200,
    message: "Logged in successfully",
    role: userLogin.Rol,
  });
}

export async function logout(req, res) {
  req.session.destroy();

  res.json({
    statusCode: 200,
    message: "Logged out successfully",
  });
}

export async function forgotPassword(req, res) {
  const { error, value: data } = forgotPasswordValidationSchema.validate(
    req.body
  );

  if (error) {
    return res.status(400).json({
      statusCode: 400,
      error: "Bad request",
      message: error.message,
      code: `${error.details[0].path}.${error.details[0].type}`,
    });
  }

  const newPassword = Math.random().toString(36).slice(-8);
  const salt = await bcrypt.genSalt(10);
  const passwordHash = await bcrypt.hash(newPassword, salt);

  const user = await User.findOneAndUpdate(
    { email: data.email },
    { passwordHash, passwordSalt: salt }
  ).exec();

  if (user) {
    await emailTransporter.sendMail({
      from: '"Viajeros Seguros" <viajeros.seguros@ealpizar.com>',
      to: data.email,
      subject: "Nueva contraseña",
      html: `
        <div style="text-align: center;">
          <img src="https://raw.githubusercontent.com/cenfotec-codexpress/viajeros-solos/main/src/public/assets/images/logo-green.png" alt="Viajeros Seguros Logo" style="max-width: 350px;">
          <h2 style="color: #008000;">Nueva Contraseña</h2>
          <p style="font-size: 16px;">Hola ${user.firstName}, tu nueva contraseña es: <br/><strong>${newPassword}</strong></p>
        </div>
      `,
    });
  }

  return res.status(200).json({
    statusCode: 200,
    message: "If email exists, a new password has been sent to it",
  });
}

export async function resetPassword(req, res) {
  const { error, value: data } = resetPasswordValidationSchema.validate(
    req.body
  );

  if (error) {
    return res.status(400).json({
      statusCode: 400,
      error: "Bad request",
      message: error.message,
      code: `${error.details[0].path}.${error.details[0].type}`,
    });
  }

  const user = await User.findById(req.session.user.id).exec();
  const oldPasswordHash = await bcrypt.hash(
    data.oldPassword,
    user.passwordSalt
  );

  if (oldPasswordHash !== user.passwordHash) {
    return res.status(401).json({
      statusCode: 401,
      error: "Unauthorized",
      message: "Invalid credentials",
    });
  }

  const salt = await bcrypt.genSalt(10);
  const newPasswordHash = await bcrypt.hash(data.password, salt);

  await User.findByIdAndUpdate(req.session.user.id, {
    passwordHash: newPasswordHash,
    passwordSalt: salt,
  }).exec();

  res.status(200).json({
    statusCode: 200,
    message: "Password changed successfully",
  });
}
