import { EngagingHues } from "./EngagingHues";

const main = document.getElementById("main");
if (!(main instanceof SVGGraphicsElement)) {
	throw new Error("main not instance of SVGElement");
}

function* randomSequence() {
	while (true) {
		yield Math.random();
	}
}
// const touches: Map<Touch['identifier'], Pick<Touch, Pick<SVGCircleElement, 'cx' | 'cy'>> = new Map();
const engagingHues = new EngagingHues(randomSequence());

const touchHandler: (e: TouchEvent) => void = (e) => {
	console.log(e.type);
	// e.preventDefault();
	const m = main.getScreenCTM()?.inverse();
	if (m === undefined) {
		return;
	}
	const touchIds = new Set(
		e.changedTouches[Symbol.iterator]().map((t) => t.identifier),
	);
	engagingHues.set(touchIds);

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
		svgCircle.setAttribute(
			"fill",
			`hsl(${engagingHues.lookup(identifier)} 100% 50%)`,
		);
		main.append(svgCircle);
	}
};
main.addEventListener("touchstart", touchHandler);
main.addEventListener("touchmove", touchHandler);
main.addEventListener("touchend", touchHandler);
main.addEventListener("touchcancel", touchHandler);
