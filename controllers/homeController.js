import { prisma } from "../lib/prisma.js";

async function getHome(req, res, next) {
	try {
		const folderData = await prisma.$transaction(async (tx) => {
			const homeFolder = await tx.folder.findFirst({
				where: { parentFolderId: null, AND: { ownerId: req.user.id } },
				select: {
					folders: true,
					files: true,
					name: true,
					id: true,
				},
			});

			const currentDate = new Date();
			await tx.sharedFolder.deleteMany({
				where: {
					expiresAt: { lte: currentDate },
					AND: { sharedFolder: { ownerId: req.user.id } },
				},
			});

			return homeFolder;
		});

		res.render("home", { folderData: folderData });
	} catch (err) {
		next(err);
	}
}

export default {
	getHome,
};
