import { it, expect, describe } from "vitest";
import { override } from "../src/str";

describe("string utils", () => {
	it("should replace string with two indices", () => {
		expect(override("ABC", "__REPLACED__", 0, 1)).toEqual("__REPLACED__BC");
		expect(override("ABC", "__REPLACED__", 0, 100)).toEqual("__REPLACED__");
		expect(override("ABC", "__REPLACED__", 1, 100)).toEqual("A__REPLACED__");
		expect(override("ABC", "__REPLACED__", 1, 2)).toEqual("A__REPLACED__C");
		expect(override("ABC", "__REPLACED__", 4, 100)).toEqual("ABC");
		expect(() => override("ABC", "__REPLACED__", 10, 0)).toThrowError();
	});
});
