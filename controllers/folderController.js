import { prisma } from "../lib/prisma.js";

async function getFolder(req, res, next) {
	try {
		const folderId = parseInt(req.params.id);
		const folder = await prisma.folder.findUnique({
			where: { id: folderId },
			include: { folders: true, files: true },
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

export default { getFolder, editFolder, createFolder, deleteFolder };
