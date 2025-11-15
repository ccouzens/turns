import { describe, expect, test } from "vitest";
import { wrappingDifference } from "./wrappingDifference.ts";

describe(wrappingDifference, () => {
	test.for([
		[0, 0, 0],
		[0, 180, 180],
		[180, 0, 180],
		[0, 179, 179],
		[0, 181, 179],
		[0, 359, 1],
		[359, 0, 1],
		[0, 1, 1],
		[1, 0, 1],
	])("wrappingDifference(%i, %i) === %i", ([a, b, expected]) => {
		expect(wrappingDifference(a, b)).toBe(expected);
	});
});
