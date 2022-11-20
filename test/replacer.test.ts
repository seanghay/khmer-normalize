import { it, describe, expect } from "vitest";
import { dedupeArray } from "../src/str";

describe("replacements", () => {

	it("should remove duplicate values", () => {
		expect(dedupeArray([
			...'AAAAABBBBCCCCAAAAABBBBCCCC'.split('')
		])).toEqual("ABCABC")
	})
});
