const createdAtDate = document.querySelectorAll(".createdAt");

createdAtDate.forEach((el) => {
	const createdAt = el.textContent;
	el.textContent = new Date(createdAt).toLocaleString("en-GB", {
		timeZone: "UTC",
	});
});

const fileSizesInBytes = document.querySelectorAll(".fileSize");

fileSizesInBytes.forEach((el) => {
	const size = el.textContent;
	const sizeMB = size / 1000000;
	const sizeKB = size / 1000;

	if (sizeMB < 1) {
		el.textContent = sizeKB.toFixed(2) + "KB";
	} else {
		el.textContent = sizeMB.toFixed(2) + "MB";
	}
});
