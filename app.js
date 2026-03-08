import express from "express";
import path from "path";
import { fileURLToPath } from "url";

import indexRouter from "./routes/indexRouter.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const assetsPath = path.join(__dirname, "public");

const app = express();
const PORT = 3000;

app.use(express.static(assetsPath));
app.use(express.urlencoded({ extended: true }));

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use("/", indexRouter);

app.use((req, res) => {
	res.status(404).send("404 not found");
});

app.use((err, req, res, next) => {
	console.error(err);
	res.status(500).send("500 server error");
});

app.listen(PORT, (error) => {
	if (error) {
		throw error;
	}

	console.log(`Server running on port ${PORT}`);
});
