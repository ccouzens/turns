const main = document.getElementById("main");
if (!(main instanceof SVGGraphicsElement)) {
	throw new Error("main not instance of SVGElement");
}

const m = main.getScreenCTM();
if (m === null) {
	throw new Error("getScreenCTM not expected to be null");
}

main.addEventListener("touchstart", (e) => {
	// e.preventDefault();
	console.log(
		[...e.changedTouches].map((t) => ({ pageX: t.pageX, pageY: t.pageY })),
	);
	const m = main.getScreenCTM()?.inverse();
	if (m === undefined) {
		return;
	}
	for (const { pageX, pageY } of e.changedTouches) {
		const svgX = m.a * pageX + m.c * pageY + m.e;
		const svgY = m.b * pageX + m.d * pageY + m.f;
		console.log(svgX, svgY);
	}
});
