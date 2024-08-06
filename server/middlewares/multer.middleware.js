import multer from "multer";

//implementation of multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "tempUploads");
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now();
    cb(null, file.fieldname + "-" + uniqueSuffix + "-" + file.originalname);
  },
});
export const upload = multer({ storage: storage });
