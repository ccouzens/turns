export function wrappingDifference(a: number, b: number): number {
	return Math.abs(((a - b + 360 + 180) % 360) - 180);
}
