import multer from "multer";
import path from "path";

const uploadsStorage = multer.diskStorage({
  destination: "uploads",
  filename: (req, file, cb) => {
    const { originalname } = file;
    const extension = path.extname(originalname);
    const filename = `${Date.now()}${extension}`;
    cb(null, filename);
  },
});

export default multer({
  storage: uploadsStorage,
  limits: { fileSize: 2000000 },
});
