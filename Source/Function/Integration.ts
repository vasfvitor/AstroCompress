/**
 * @module Integration
 *
 */
import { bgGreen, cyan } from 'kleur/colors'
import { performance } from 'perf_hooks';

export default ((...[_Option = {}]: Parameters<Type>) => {
	Object.entries(_Option).forEach(([Key, Value]) =>
		Object.defineProperty(_Option, Key, {
			value:
				Value === true
					? Default[Key as keyof typeof Default]
					: _Option[Key as keyof typeof _Option],
		})
	);

	const {
		Path,
		Cache,
		Logger,
		Map: _Map,
		Exclude,
		Action,
		CSS,
		HTML,
		Image,
		JavaScript,
		SVG,
		Parser,
	} = Merge(Default, _Option);

	const Paths = new Set<Path>();

	if (typeof Path !== "undefined") {
		if (Array.isArray(Path) || Path instanceof Set) {
			Path.forEach((Path) => Paths.add(Path));
		}
	}

	if (typeof Parser === "object") {
		Object.entries(Parser).forEach(([Key, Value]) =>
			Object.defineProperty(Parser, Key, {
				value: Array.isArray(Value) ? Value : [Value],
			})
		);
	}

	return {
		name: "astro-compress",
		hooks: {
			"astro:build:done": async ({ dir }) => {
				process.stdout.write(`${bgGreen(" astro-compress processing ")}\n`);
				// start timer for whole integration
				const startAbs = performance.now();

				if (typeof _Map !== "object") {
					return;
				}

				if (!Paths.size) {
					Paths.add(dir);
				}

				if (typeof Cache === "object" && Cache.Search === Search) {
					Cache.Search = dir;
				}

				for (const [File, Setting] of Object.entries({
					CSS,
					HTML,
					Image,
					JavaScript,
					SVG,
				})) {
					if (
						!(Setting && _Map[File]) ||
						typeof Setting !== "object"
					) {
						return;
					}
					// start timer for each batch
					const start = performance.now()
					_Action = Merge(
						Action,
						Merge(Action, {
							Wrote: async ({ Buffer, Input }) => {

								switch (File) {
									case "CSS": {
										// TODO: Implement lightningcss
										// console.log(
										// 	(await import("lightningcss"))
										// 		.transform({
										// 			code: (
										// 				await import("buffer")
										// 			).Buffer.from(
										// 				Buffer.toString()
										// 			),
										// 			filename: Input,
										// 			// minify: true,
										// 			sourceMap: false,
										// 		})
										// 		.code.toString()
										// );

										return (await import("csso")).minify(
											Buffer.toString(),
											// @ts-expect-error
											Setting["csso"]
										).css;
									}

									case "HTML": {
										return await (
											await import("html-minifier-terser")
										).minify(
											Buffer.toString(),
											// @ts-expect-error
											Setting["html-minifier-terser"]
										);
									}

									case "JavaScript": {
										return (
											(
												await (
													await import("terser")
												).minify(
													Buffer.toString(),
													// @ts-expect-error
													Setting["terser"]
												)
											).code ?? Buffer
										);
									}

									case "Image": {
										return await (
											await import(
												"../Function/Image/Writesharp.js"
											)
										)
											// @ts-expect-error
											.default(Setting["sharp"], {
												Buffer,
												Input,
											} as Onsharp);
									}

									case "SVG": {
										const { data: Data } = (
											await import("svgo")
										).optimize(
											Buffer.toString(),
											// @ts-expect-error
											Setting["svgo"]
										);

										return Data ?? Buffer;
									}

									default: {
										return Buffer;
									}
									
								}
								
							},
							
							Fulfilled: async (Plan) => {
								// end and print time for each batch
								// TODO: Add pretty-ms or handle minutes, seconds
								const end = performance.now();
								const time = ((end - start) / 1000).toFixed(2);
								return Plan.Files > 0
									? "└▶ " + cyan(`Successfully compressed a total of ${Plan.Files
										} ${File} ${Plan.Files === 1 ? "file" : "files"
										} for ${await (
											await import(
												"files-pipe/Target/Function/Bytes.js"
											)
										).default(Plan.Info.Total)}.`) + `(+${time}s)`
									: false
							},
						} satisfies Action)
					);

					if (File === "Image") {
						_Action = Merge(_Action, {
							Read: async ({ Input }) => {
								const { format } =
									await Defaultsharp(Input).metadata();

								return Defaultsharp(Input, {
									failOn: "none",
									sequentialRead: true,
									unlimited: true,
									animated:
										format === "webp" || format === "gif"
											? true
											: false,
								});
							},
						} satisfies Action);
					}

					for (const Path of Paths) {
						await (
							await (
								await (
									await new (
										await import("files-pipe")
									).default(Cache, Logger).In(Path)
								).By(_Map[File] ?? "**/*")
							).Not(Exclude)
						).Pipe(_Action);
					}

				}
				// end and print timer for whole integration
				// TODO: Add pretty-ms or handle minutes, seconds
				const endAbs = performance.now();
				const time = ((endAbs - startAbs) / 1000).toFixed(2);
				process.stdout.write(`Completed in ${time}s.\n`);
			},
		},
	};
}) satisfies Type as Type;

import type Onsharp from "../Interface/Image/Onsharp.js";
import type Type from "../Interface/Integration.js";

import type Action from "files-pipe/Target/Interface/Action.js";
import type Path from "files-pipe/Target/Type/Path.js";

export const { default: Default } = await import("../Variable/Option.js");

export const {
	default: {
		Cache: { Search },
	},
} = await import("files-pipe/Target/Variable/Option.js");

export const { default: Merge } = await import(
	"typescript-esbuild/Target/Function/Merge.js"
);

export const { default: Defaultsharp } = await import("sharp");

export let _Action: Action;
