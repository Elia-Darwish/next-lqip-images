# Next.js Lqip images

[![npm][npm]][npm-url]

A Next.js plugin that helps you import images into your project and provide
either a low quality image or an array of dominant colors to use as a
placeholder while the image loads.

## Features

- import local or CDN images into your Next.js project.
- Provide a low quality image to use as a placeholder until the original
  downloads for better user experience.
- Provide an array of hex values that represents the dominant colors of the
  image along with the width and height to use as a placeholder while the image
  loads.

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
  [
    withLqipImages,
    {
      /// your options here!!!
    },
  ],

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

### lqip

add the **?lqip** query param at the end of your import to generate a low
quality image placeholder

```js
import {src, width, height, dataURI} from './image.jpg?lqip'
```

by default, the loader will return the placeholder in `jpeg` format for maximum
browser support. it is however possible to switch to `webp` using the **&webp**
query param, which will result in a much smaller image size

```js
import image from './image.jpg?lqip&webp'
```

commonly, a blur is added to the image placeholder using `css` for better looks.
the scale is used here together with an `overflow: hidden` on the parent to hide
the
[artifacts around the edges](http://volkerotto.net/2014/07/03/css-background-image-blur-without-blury-edges/)

```css
.placeholder {
  filter: blur(24px);
  transform: scale(1.1);
}
```

to avoid going throw that, you can just simply add the **&blur** query param to
get a blurred placeholder image by default.

```js
import image from './image.jpg?lqip&webp&blur'
import image2 from './image.png?lqip&blur'
```

> **Note:** the query params are composable but the `lqip` must be added at the
> beginning!

the above mentioned imports will return the following:

```ts
{
  src: string // the source of the original image (using file-loader in the background)
  width: number // the width of the placeholder image
  height: number // the height of the placeholder image
  dataURI: string // the placeholder image Base64-URI
}
```

### color palette

to get an array of the dominant colors to use as a placeholder instead, simply
add the **?colors** query param at the end of your imported image

```js
import {src, width, height, colors} from './image.jpg?colors'
```

in this case, the returned values will be like following:

```ts
{
  src: string // the source of the original image (using file-loader in the background)
  width: number // the width of the original image
  height: number // the height of the original image
  colors: string[] // an array of the hex color codes representing the dominant colors of the image
}
```

## Options

### assetPrefix

Will prefix your assets with the provided URL (for example if you are using a
CDN)

you can also enable the dynamic (runtime) asset prefix be setting
**_dynamicAssetPrefix_** to `true`.

```js
const withLqipImages = require('next-lqip-images')

module.exports = withLqipImages({
  assetPrefix: 'https://example.com',
  dynamicAssetPrefix: true,
})
```

### InlineLimit

will return images smaller that the provided value as a `base64` URI. default
size is `2000`

Example:

```js
const withLqipImages = require('next-lqip-images')

module.exports = withLqipImages({
  inlineLimit: 12000,
})
```

in this case an image placeholder is most likely not necessary as the image will
be included in your bundle.

### Exclude

excludes folder from being handled by the plugin.

Example :

```js
const path = require('path')
const withLqipImages = require('next-lqip-images')

module.exports = withLqipImages({
  exclude: path.resolve(__dirname, 'src/assets/svg'),
})
```

### File Extensions

the file extensions should be handled by this plugin.

**Using with TypeScript:** If you exclude a file suffix you might need to use
declaration merging or override dependencies for the same file suffixes as
needed.

Example usage:

```js
const withLqipImages = require('next-lqip-images')

module.exports = withLqipImages({
  fileExtensions: ['jpg', 'jpeg', 'png', 'gif'],
})
```

### placeholderSize

`default: 24`

by setting this to a **number**, it will set the width and height of the
placeholder image to a maximum of the provided number while maintaining the
aspect ratio.

example:

```js
const withLqipImages = require('next-lqip-images')

module.exports = withLqipImages({
  placeholderSize: 32,
})
// an example output would be
{
  src: '...', //image source
  width: 16, // placeholder width
  height: 32, // placeholder height
  dataURI: '...', // placeholder image URI
}
```

and by setting this to an **Array of numbers**, you can specify the width and
height of the placeholder image.

example:

```js
const withLqipImages = require('next-lqip-images')

module.exports = withLqipImages({
  placeholderSize: [32, 32],
})
// an example output would be
{
  src: '...', //image source
  width: 32, // placeholder width
  height: 32, // placeholder height
  dataURI: '...', // placeholder image URI
}
```

### placeholderBlur

`default: 2.4`

you can also set the amount of blur you want to be applied to the images. I
found that deviding the size by 10 is a good point to start with!

example:

```js
const withLqipImages = require('next-lqip-images')

module.exports = withLqipImages({
  placeholderSize: 32,
  placeholderBlur: 3.2,
})
```

### Typescript

For Typescript users, you will need to include a reference to the
`next-lqip-images` types for your imports to work properly

in your `next-env.d.ts` file at the root of your project, add the following
line:

```diff
/// <reference types="next" />
/// <reference types="next/types/global" />

+ /// <reference types="next-lqip-images" />
```

[npm]: https://img.shields.io/npm/v/next-lqip-images.svg
[npm-url]: https://www.npmjs.com/package/next-lqip-images
