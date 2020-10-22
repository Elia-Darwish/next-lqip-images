# Next.js Lqip images

[![npm][npm]][npm-url]

A Next.js plugin that helps you import images into your project and provide a low quality image to use as a placeholder.

## Features

* import local or CDN images into your Next.js project.
* Provide a low quality image to use as a placeholder until the original downloads for better user experience.

## Installation

```bash
npm install --save next-lqip-images
```

or

```bash
yarn add next-lqip-images
```

## Usage

Add the following to the `next.config.js` at the root of your project.

```js
const withLqipImages = require('next-lqip-images')

module.exports = withLqipImages()
```

you can also supply your custom Next.js configuration as well

```js
const withLqipImages = require('next-lqip-images')

module.exports = withImages({
	// Your Next.js config goes here!!!
})
```

Or with the `next-compose-plugins` plugin if you are using multiple plugins

```js
const withPlugins = require('next-compose-plugins')
const withLqipImages = require('next-lqip-images')

module.exports = withPlugins(
	[withLqipImages, {
		/// your options here!!!
	}],
	
	/// other plugins here!!!
)
```

Now in your project you can either import images like normally

```js
import image from 'path/to/your/image/here'
// this will give you back either a url or a base64 image uri
// based on how big the image is and your line file limit

export const myComponent = () => {
	return (
		<div>
		  <img src={image} />
		</div>
	)
}
```
or you can add the `lqip` query param to your import to get a low quality placeholder for your image
```js
import { src, width, height, dataURI } from './some-big-image.jpg?lqip'

export const myComponent = () => {
	return (
		<div>
		  <Image src={src} placeholder={dataURI} />
		</div>
	)
}
```
by default the image placeholder is a `jpg` image for maximum browser support, but you
can opt in to webp by providing the `webp` query param like so:

```js
import { src, width, height, dataURI } from './some-big-image.jpg?lqip&webp'
// this results in a significantly smaller placeholder image

export const myComponent = () => {
	return (
		<div>
		  <Image src={src} placeholder={dataURI} />
		</div>
	)
}
```
the signature of the returned object is like the following:

```ts
{

 src: string;  // a url or a base64 image uri (depends of file size and inline limit)
 width: number;  // the width of the placeholder image
 height: number;  // the height of the placeholder image
 dataURI: string;  // the placeholder image Base64-URI
}
```

## Options

### assetPrefix 
Will prefix your assets with the provided URL (for example if you are using a CDN)

you can also enable the dynamic (runtime) asset prefix be setting ***dynamicAssetPrefix***  to `true`.

```js
const withLqipImages = require('next-lqip-images')

module.exports = withLqipImages({
  assetPrefix: 'https://example.com',
  dynamicAssetPrefix: true
})
```

### InlineLimit
will return images smaller that the provided value as a `base64` URI. default size is `2000`

Example:
```js
const withLqipImages = require('next-lqip-images')

module.exports = withLqipImages({
  inlineLimit: 12000,
})
```
in this case an image placeholder is most likely not necessary as the image will be included in your bundle.

### Exclude
excludes folder from being handled by the plugin.

Example :
```js
const path = require('path');
const withLqipImages = require('next-lqip-images')

module.exports = withLqipImages({
  exclude: path.resolve(__dirname, 'src/assets/svg'),
})
```

### File Extensions
the file extensions should be handled by this plugin. 

**Using with TypeScript:** If you exclude a file suffix you might need to use declaration merging or override dependencies for the same file suffixes as needed.

Example usage:
```js
const withLqipImages = require('next-lqip-images')

module.exports = withLqipImages({
  fileExtensions: ["jpg", "jpeg", "png", "gif"],
})
```

### Typescript
For Typescript users, you will need to include a reference to the `next-lqip-images` types for your imports to work properly

in your `next-env.d.ts` file at the root of your project, add the following line:

```diff
/// <reference types="next" />
/// <reference types="next/types/global" />

+ /// <reference types="next-lqip-images" />
```

[npm]: https://img.shields.io/npm/v/next-lqip-images.svg
[npm-url]: https://www.npmjs.com/package/next-lqip-images