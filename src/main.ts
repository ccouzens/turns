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
const touches: Map<Touch["identifier"], SVGCircleElement> = new Map();
const engagingHues = new EngagingHues(randomSequence());

const touchHandler: (e: TouchEvent) => void = (e) => {
	const m = main.getScreenCTM()?.inverse();

	for (const { identifier, pageX, pageY } of e.changedTouches) {
		const svgX = m === undefined ? undefined : m.a * pageX + m.c * pageY + m.e;
		const svgY = m === undefined ? undefined : m.b * pageX + m.d * pageY + m.f;
		if (e.type === "touchstart" && svgX !== undefined && svgY !== undefined) {
			const hue = engagingHues.add(identifier);
			const circle = document.createElementNS(
				"http://www.w3.org/2000/svg",
				"circle",
			);
			circle.setAttribute("r", "0.1");
			circle.setAttribute("cx", `${svgX}`);
			circle.setAttribute("cy", `${svgY}`);
			circle.setAttribute("fill", `hsl(${hue} 100% 50%)`);
			touches.set(identifier, circle);
			main.appendChild(circle);
		} else if (
			e.type === "touchmove" &&
			svgX !== undefined &&
			svgY !== undefined
		) {
			const circle = touches.get(identifier);
			if (circle) {
				circle.setAttribute("cx", `${svgX}`);
				circle.setAttribute("cy", `${svgY}`);
			}
		} else if (e.type === "touchend" || e.type === "touchcancel") {
			engagingHues.remove(identifier);
			const circle = touches.get(identifier);
			touches.delete(identifier);
			if (circle) {
				main.removeChild(circle);
			}
		}
	}
};
for (const t of ["start", "move", "end", "cancel"] as const) {
	main.addEventListener(`touch${t}`, touchHandler);
}

const gpuAdapter = await navigator.gpu?.requestAdapter();
if (!gpuAdapter) {
	document.getElementById("webgpu-unsupported")?.classList.add("applicable");
} else {
	const gpuDevice = await gpuAdapter.requestDevice();
}
