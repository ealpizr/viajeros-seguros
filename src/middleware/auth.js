const EXCLUDED_PAGES = ["/app/login", "/app/forgot-password"];
const EXCLUDED_ENDPOINTS = [
  "/api/auth/login",
  "/api/auth/signup",
  "/api/auth/forgot-password",
];

export default function authMiddleware(req, res, next) {
  if (
    req.url.startsWith("/app") &&
    !EXCLUDED_PAGES.includes(req.url) &&
    !req.session.user
  ) {
    return res.redirect("/app/login");
  }

  if (req.url.includes("/admin") && req.session.user.role !== "Administrador") {
    return res.redirect("/app");
  }

  if (
    req.url.startsWith("/api") &&
    !EXCLUDED_ENDPOINTS.includes(req.url) &&
    !req.session.user
  ) {
    return res.status(401).json({
      statusCode: 401,
      error: "Unauthorized",
      message: "You need to be logged in to access this resource",
    });
  }

  return next();
}
