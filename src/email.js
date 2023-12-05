import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: "smtp.zoho.com",
  port: 465,
  secure: true,
  auth: {
    user: "viajeros.solos@ealpizar.com",
    pass: "C^VZ^NL#z*ooQR5b$f8rKUZt^UhswJ",
  },
});

export function testEmailConnection() {
  return transporter.verify();
}

export default transporter;
