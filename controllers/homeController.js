async function getHome(req, res, next) {
	try {
		if (!req.isAuthenticated()) return res.redirect("/login");
		res.render("home");
	} catch (err) {
		next(err);
	}
}

async function uploadFiles(req, res, next) {
	try {
		if (!req.isAuthenticated()) return res.redirect("/login");
		console.log(req.files);
		res.redirect("/home");
	} catch {
		next(err);
	}
}

export default { getHome, uploadFiles };
