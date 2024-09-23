import { decompressString } from "$lib/utils.js";

export function load({ params }) {
	const text = params.text;
	const decompressedText = decompressString(text);
	return { text: decompressedText };
}
