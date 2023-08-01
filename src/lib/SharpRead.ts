import type { optionExecutionsFile } from "files-pipe/dist/options/Index.js";
import type { Sharp } from "sharp";
import type { IMG } from "../options/IMG.js";
import defaults from "../options/Index.js";

export interface sharpBuffer extends Sharp {
	// rome-ignore lint/suspicious/noExplicitAny:
	[key: string]: any;
}

export interface ongoingSharp extends Omit<optionExecutionsFile, "buffer"> {
	buffer: sharpBuffer;
}

export default async (options: IMG, ongoing: ongoingSharp) => {
	const fileType = ongoing["inputPath"].split(".").pop();

	if (!fileType) {
		return;
	}

	const typeToOption: {
		[key: string]: string;
	} = {
		avci: "avif",
		avcs: "avif",
		avifs: "avif",
		heic: "heif",
		heics: "heif",
		heifs: "heif",
		jfif: "jpeg",
		jif: "jpeg",
		jpe: "jpeg",
		apng: "png",
		jpg: "jpeg",
	};

	const optionType =
		typeof typeToOption[fileType] !== "undefined"
			? typeToOption[fileType]
			: typeof options[fileType] !== "undefined"
			? fileType
			: false;

	const validOptionCalls = [
		"avif",
		"gif",
		"heif",
		"jpeg",
		"png",
		"raw",
		"tiff",
		"webp",
	];

	if (
		optionType &&
		validOptionCalls.includes(optionType) &&
		typeof options[optionType] !== "undefined" &&
		options[optionType] !== false
	) {
		if (optionType in ongoing.buffer) {
			return await ongoing.buffer[optionType](
				options[optionType] !== true
					? options[optionType]
					: defaults["img"]
			).toBuffer();
		}
	}
};