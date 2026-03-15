import multer from "multer";
import path from "path";

//max files to upload
const LIMIT = 5;

const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, "uploads/");
	},
	filename: (req, file, cb) => {
		cb(
			null,
			file.originalname + "-" + Date.now() + path.extname(file.originalname),
		);
	},
});
const upload = multer({ storage: storage });
const uploadFiles = upload.array("uploadedFiles", LIMIT);

export { uploadFiles };
