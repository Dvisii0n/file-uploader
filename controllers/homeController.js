import { prisma } from "../lib/prisma.js";

async function getHome(req, res, next) {
	try {
		const homeFolder = await prisma.folder.findFirst({
			where: { parentFolderId: null, AND: { ownerId: req.user.id } },
			include: {
				folders: true,
			},
		});

		res.render("home", { folderData: homeFolder });
	} catch (err) {
		next(err);
	}
}

async function fileUpload(req, res, next) {
	try {
		const files = req.files;
		files.forEach((file) => {
			console.log(file.path);
		});
		res.redirect("/home");
	} catch (err) {
		next(err);
	}
}

async function getFolder(req, res, next) {
	try {
		const folderId = parseInt(req.params.id);
		const folder = await prisma.folder.findUnique({
			where: { id: folderId },
			include: { folders: true },
		});

		res.render("home", { folderData: folder });
	} catch (err) {
		next(err);
	}
}

async function createFolder(req, res, next) {
	try {
		const { folderName } = req.body;
		const ownerId = req.user.id;
		const parentFolderId = parseInt(req.params.parentId);

		await prisma.folder.create({
			data: {
				name: folderName,
				ownerId: ownerId,
				parentFolderId: parentFolderId,
			},
		});

		res.redirect(req.get("referer"));
	} catch (err) {
		next(err);
	}
}

async function deleteFolder(req, res, next) {
	try {
		const folderId = parseInt(req.params.id);
		await prisma.folder.delete({ where: { id: folderId } });
		res.redirect(req.get("referer"));
	} catch (err) {
		next(err);
	}
}

async function editFolder(req, res, next) {
	try {
		const folderId = parseInt(req.params.id);
		const { newFolderName } = req.body;
		await prisma.folder.update({
			where: { id: folderId },
			data: {
				name: newFolderName,
			},
		});
		res.redirect(req.get("referer"));
	} catch (err) {
		next(err);
	}
}

export default {
	getHome,
	fileUpload,
	createFolder,
	getFolder,
	deleteFolder,
	editFolder,
};
