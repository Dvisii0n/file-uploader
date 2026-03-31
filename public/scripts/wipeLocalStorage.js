const loginBtn = document.querySelector(".loginBtn");
loginBtn.addEventListener("click", (e) => {
	localStorage.removeItem("history");
});
