export function override(
	str: string,
	replacement: string,
	start: number,
	end: number
): string {
	if (start > end) throw new RangeError("start index is larger than end index");
	if (start >= str.length) return str;
	if (start <= 0) return replacement + str.slice(end, str.length);
	if (end > str.length) return str.slice(0, start) + replacement;
	const left = str.slice(0, start);
	const right = str.slice(end, str.length);
	return left + replacement + right;
}

export function replacePatWithMap(
	str: string,
	pat: RegExp,
	map: Map<string, string>
): string {
	if (str.length == 0) return str;
	let result: RegExpExecArray | null = null;
	while ((result = pat.exec(str))) {
		const charToReplace = result[0];
		const replacement = map.get(charToReplace);
		str = override(
			str,
			replacement!,
			result.index,
			charToReplace.length + result.index
		);
	}
	return str;
}

export function dedupeArray(values: string[]): string {
	for (let i = 1; i < values.length; i++) {
		if (values[i] === values[i - 1]) {
			values[i - 1] = "";
		}
	}
	return values.join('');
}
