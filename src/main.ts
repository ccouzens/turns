const main = document.getElementById("main");
if (!(main instanceof SVGGraphicsElement)) {
	throw new Error("main not instance of SVGElement");
}

const colours = [
	"white",
	"green",
	"purple",
	"yellow",
	"blue",
	"orange",
	"pink",
	"grey",
	"black",
];

const m = main.getScreenCTM();
if (m === null) {
	throw new Error("getScreenCTM not expected to be null");
}

const touchHandler: (e: TouchEvent) => void = (e) => {
	// e.preventDefault();
	const m = main.getScreenCTM()?.inverse();
	if (m === undefined) {
		return;
	}
	for (const { pageX, pageY, identifier } of e.changedTouches) {
		const svgX = m.a * pageX + m.c * pageY + m.e;
		const svgY = m.b * pageX + m.d * pageY + m.f;
		const svgCircle = document.createElementNS(
			"http://www.w3.org/2000/svg",
			"circle",
		);
		svgCircle.setAttribute("r", 0.1);
		svgCircle.setAttribute("cx", svgX);
		svgCircle.setAttribute("cy", svgY);
		svgCircle.setAttribute("fill", colours[identifier] ?? "yellow");
		main.append(svgCircle);
		console.log(identifier);
	}
};
main.addEventListener("touchstart", touchHandler);
main.addEventListener("touchmove", touchHandler);
