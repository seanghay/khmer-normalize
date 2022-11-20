import { dedupeArray, override } from "./str";

const consonant = "[\u1780-\u17A2]";
const ro = "\u179A";
const indepVowel = "[\u17A3-\u17B3]";
const depVowel = "[\u17B6-\u17C5]";
const coeng = "\u17D2";
const diacritic = "[\u17C6-\u17D1\u17DD]";
const regShifter = "[\u17C9\u17CA]";
const robat = "\u17CC";
const nonSpacing = "[\u17C6\u17CB\u17CD-\u17D1\u17DD]";
const spacing = "[\u17C7\u17C8]";
const zeroWidth = "[\u200B-\u200D\u00AD\u2063]";
const coengRo = coeng + ro;

export function regularize(text: string): string {
	text = text.replace(/\u17A8/g, "\u17A7\u1780"); // replace obsolete ligature ឨ with ឧក
	text = text.replace(/\u17A3/g, "\u17A2"); // replace deprecated independent vowel ឣ with អ
	text = text.replace(/\u17A4/g, "\u17A2\u17B6"); // replace deprecated independent vowel digraph ឤ with អា
	text = text.replace(/\u17B2/g, "\u17B1"); // replace ឲ as a variant of ឱ
	text = text.replace(/\u17B4/g, ""); // delete non-visible inherent vowel (឴)
	text = text.replace(/\u17B5/g, ""); // delete non-visible inherent vowel (឵)
	text = text.replace(/\u17DD/g, "\u17D1"); // replace obsolete ATTHACAN ៝ with VIRIAM ៑
	text = text.replace(/\u17D3/g, "\u17C6"); // replace deprecated BATHAMASAT ៓ with NIKAHIT ំ as error
	text = text.replace(/\u17D8/g, "\u17D4\u179B\u17D4"); // replace deprecated trigraph ៘ with ។ល។
	// text = text.replace(/\u17bb\u17d0/g, "\u17c9\u17d0"); // replace ុ ័ -> ៉ ័
	// text = text.replace(/\u17bb\u17c6/g, "\u17c9\u17c6"); // replace ុ ំ -> ៉ ំ
	return text;
}

export function reorderSyllable(s: string) {
	const coengChunks: string[] = [];
	const depVowelChunks: string[] = [];
	const regShifterChunks: string[] = [];
	const robatChunks: string[] = [];
	const nonSpacingChunks: string[] = [];
	const spacingChunks: string[] = [];
	const allChunks: string[] = [];

	const base = s[0];
	const chunkDef = `(?:${coeng}+(?:${consonant}|${indepVowel})${regShifter}?)`;
	const chunkOrCharPat = new RegExp(chunkDef + "|.", "g");
	const sub = s.substring(1);

	let m: RegExpExecArray | null;

	while ((m = chunkOrCharPat.exec(sub))) {
		let chunk = m[0];
		if (chunk.match(depVowel)) {
			depVowelChunks.push(chunk);
		} else if (chunk.startsWith(coeng)) {
			// remove duplicate coengs, if any
			chunk = chunk.replace(new RegExp(coeng + "+", "g"), coeng);
			coengChunks.push(chunk);
		} else if (chunk.match(nonSpacing)) {
			nonSpacingChunks.push(chunk);
		} else if (chunk.match(spacing)) {
			spacingChunks.push(chunk);
		} else if (chunk.match(regShifter)) {
			regShifterChunks.push(chunk);
		} else if (chunk === robat) {
			robatChunks.push(chunk);
		}
	}

	let numCoeng = coengChunks.length - 1;
	for (let i = 0; i < numCoeng; i++) {
		if (coengChunks[i].startsWith(coengRo)) {
			coengChunks.push(coengChunks[i]);
			coengChunks[i] = "";
		}
	}

	allChunks.push(base);
	allChunks.push(...regShifterChunks);
	allChunks.push(...robatChunks);
	allChunks.push(...coengChunks);
	allChunks.push(...depVowelChunks);
	allChunks.push(...nonSpacingChunks);
	allChunks.push(...spacingChunks);

	return dedupeArray(allChunks)
		.replace(/\u17C1\u17B8/g, "\u17BE") // replace េ + ី with ើ
		.replace(/\u17B8\u17C1/g, "\u17BE") // replace ី + េ with ើ
		.replace(/\u17C1\u17B6/g, "\u17C4"); // replace េ + ា  with ោ
}

export function reorderText(s: string) {
	s = regularize(s);
	let m: RegExpExecArray | null = null;
	const syllDef = `(?:${consonant}|${indepVowel})(?:${coeng}+(?:${consonant}|${indepVowel})|(?:${depVowel}|${diacritic}|${zeroWidth})+)*`;
	const syllPat = new RegExp(syllDef, "g");

	while ((m = syllPat.exec(s))) {
		let syll = m[0];
		if (syll.length <= 1) continue;
		s = override(s, reorderSyllable(syll), m.index, m.index + syll.length);
	}
	return s;
}

