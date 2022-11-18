# [astro-compress] 🗜️

This **[Astro integration][astro-integration]** brings compression utilities to
your Astro project.

[CSS][csso] [HTML][html-minifier-terser] [JavaScript][terser] [Images][sharp]
[SVG][svgo]

## Installation

There are two ways to add integrations to your project. Let's try the most
convenient option first!

### `astro add` command

Astro includes a CLI tool for adding first party integrations: `astro add`. This
command will:

1. (Optionally) Install all necessary dependencies and peer dependencies
2. (Also optionally) Update your `astro.config.*` file to apply this integration

To install `astro-compress`, run the following from your project directory and
follow the prompts:

```sh
# Using NPM
npx astro add astro-compress
# Using Yarn
yarn astro add astro-compress
# Using PNPM
pnpx astro add astro-compress
```

### Install dependencies manually

First, install the `astro-compress` integration like so:

```
npm install -D -E astro-compress
```

Then, apply this integration to your `astro.config.*` file using the
`integrations` property:

**`astro.config.ts`**

```ts
import compress from "astro-compress";

export default { integrations: [compress()] };
```

> **Note**
>
> Use `astro-compress` last in your integration list for the best optimizations.

## Getting started

The utility should now automatically compress all your CSS, HTML and JavaScript
files in the `dist` folder.

The following image file types will also be compressed:

-   avci
-   avcs
-   avif
-   avifs
-   gif
-   heic
-   heics
-   heif
-   heifs
-   jfif
-   jif
-   jpe
-   jpeg
-   jpg
-   png
-   raw
-   tiff
-   webp

SVG compression is supported, as well via [svgo].

You can override any of the default options from the configurations of:

-   [csso](src/options/css.ts)
-   [html-minifier-terser](src/options/html.ts)
-   [sharp](src/options/img.ts)
-   [svgo](src/options/svg.ts)
-   [terser](src/options/js.ts)

or disable them entirely:

**`astro.config.ts`**

```ts
import compress from "astro-compress";

export default {
	integrations: [
		compress({
			css: false,
			html: false,
			img: false,
			js: false,
			svg: false,
		}),
	],
};
```

If your path is different than `dist` be sure to update it accordingly:

**`astro.config.ts`**

```ts
import compress from "astro-compress";

export default {
	outDir: "./build",
	integrations: [
		compress({
			path: "./build",
		}),
	],
};
```

You can add multiple paths to compress by specifying an array as the `path`
variable.

**`astro.config.ts`**

```ts
import compress from "astro-compress";

export default {
	integrations: [
		compress({
			path: ["./build", "./dist"],
		}),
	],
};
```

Set `logger` to `0` if you do not want to see debug messages. Default is `2`.

**`astro.config.ts`**

```ts
import compress from "astro-compress";

export default {
	integrations: [
		compress({
			logger: 0,
		}),
	],
};
```

You can provide a filter to exclude files in your build. A filter can be an
array of regexes or a single match. You can use functions, as well to match on
file names.

**`astro.config.ts`**

```ts
import compress from "astro-compress";

export default {
	integrations: [
		compress({
			exclude: [
				"my-awesome.png",
				(file: string) =>
					file === "./dist/img/favicon/safari-pinned-tab.svg",
			],
		}),
	],
};
```

[astro-compress]: https://npmjs.org/astro-compress
[csso]: https://npmjs.org/csso
[html-minifier-terser]: https://npmjs.org/html-minifier-terser
[terser]: https://npmjs.org/terser
[sharp]: https://npmjs.org/sharp
[svgo]: https://npmjs.org/svgo
[astro-integration]: https://docs.astro.build/en/guides/integrations-guide/

## Changelog

See [CHANGELOG.md](CHANGELOG.md) for a history of changes to this integration.

[![Lightrix logo](https://raw.githubusercontent.com/Lightrix/npm/main/.github/img/favicon.png "Built with Lightrix/npm")](https://github.com/Lightrix/npm)
