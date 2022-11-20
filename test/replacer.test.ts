import { it, describe, expect } from "vitest";
import { replacePatWithMap, dedupeArray } from "../src/str";

describe("replacements", () => {

	it("should remove duplicate values", () => {
		expect(dedupeArray([
			...'AAAAABBBBCCCCAAAAABBBBCCCC'.split('')
		])).toEqual("ABCABC")
	})

	it("should replace value in string", () => {
		const map = new Map([
			["l", "1"],
			["e", "3"],
			["o", "0"],
		]);

		const pattern = new RegExp(
			"[" + Array.from(map.keys()).join("") + "]",
			"g"
		);
		const str = "Hello, world";
		expect(replacePatWithMap(str, pattern, map)).toEqual("H3110, w0r1d");
		expect(replacePatWithMap("1234", pattern, map)).toEqual("1234");
		expect(replacePatWithMap("", pattern, map)).toEqual("");
	});
});
