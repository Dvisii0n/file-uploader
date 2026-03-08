import { Router } from "express";

const indexRouter = new Router();

indexRouter.get("/", (req, res, next) => {
	try {
		res.render("index");
	} catch (error) {
		next(err);
	}
});

export default indexRouter;
