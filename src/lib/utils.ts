import LZString from "lz-string";

export function compressString(input: string) {
	let compressedString = LZString.compressToEncodedURIComponent(input);
	return compressedString;
}

export function decompressString(input: string) {
	let decompressedString = LZString.decompressFromEncodedURIComponent(input);
	return decompressedString;
}