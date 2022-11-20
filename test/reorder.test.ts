import { it, describe, expect } from "vitest";
import { regularize, reorderSyllable, reorderText } from "../src/main";

function strToChars(str: string) {
	return [...str].map((it) => it);
}

describe("reordering", () => {
	it("should replace deprecated chars", () => {
		expect(regularize("ឨ")).toEqual("ឧក");
		expect(regularize("ឣ")).toEqual("អ");
		expect(regularize("ឤ")).toEqual("អា");
	});

	it("should transform misplaced syllable", () => {
		expect(strToChars(reorderText("ស្រី្ត"))).toEqual(strToChars("ស្ត្រី"));
		expect(strToChars(reorderText("ស្រ្តី"))).toEqual(strToChars("ស្ត្រី"));
		expect(strToChars(reorderText("ឥស្រ្តី"))).toEqual(strToChars("ឥស្ត្រី"));
		expect(strToChars(reorderText("\u200bឥស្រ្តី"))).toEqual(strToChars("\u200bឥស្ត្រី"));
		expect(strToChars(reorderText("ឥ\u200bស្រ្តី"))).toEqual(strToChars("ឥស្រ្តី"));
	});
});

