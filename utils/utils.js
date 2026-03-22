export function capitalize(str) {
	return `${str.charAt(0).toUpperCase()}${str.slice(1)}`;
}

export function getBodyErrors(errorsArr) {
	const names = new Set();
	errorsArr.forEach((err) => names.add(err.path));
	const nameObj = {};
	for (let name of names.entries()) {
		nameObj[`${name[0]}Errors`] = errorsArr.filter(
			(err) => err.path === name[0],
		);
	}

	return nameObj;
}
