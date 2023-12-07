export default function requiresAdminMiddleware(req, res, next) {
  console.log("asd");
  if (req.session.user.role !== "Administrador") {
    return res.status(403).json({
      statusCode: 403,
      error: "Forbidden",
      message: "You need to be an admin to access this resource",
    });
  }

  return next();
}
