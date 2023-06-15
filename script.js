function pageFunc(id) {
	const textToReplace = document.querySelector(".replace");
	const newText = document.getElementById(id);
	textToReplace.innerHTML = newText.innerHTML;
	const page = document.querySelector(".page");
	page.classList.remove("hidden");
	newText.classList.add("hidden");
	window.scrollTo(0, 0);
}

function menuChange(x) {
	x.classList.toggle("change");
	const menu = document.querySelector(".mobile-menu");
	if (x.classList.contains("change")) {
		menu.classList.add("change");
	} else {
		menu.classList.remove("change");
	}
}

function itemClicked() {
	const menu = document.querySelector(".mobile-menu");
	const burger = document.querySelector(".hamburger")
	if (menu.classList.contains("change")){
		menu.classList.remove("change");
		burger.classList.remove("change");
	}
}

