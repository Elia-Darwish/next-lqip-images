
# 0.0.4

adeed a **placeholderSize** option to set the size of the placeholder image.

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
module.exports = {
  module: {
    rules: [
      {
        test: /\.(gif|png|jpe?g)$/i,
        use: [
          {
            loader: 'lqip-modern-loader',
            options: {
              placeholderSize: [32, 32],
            },
          },
          'url-loader',
        ],
      },
    ],
  },
}
// an example output would be
{
  src: '...', //image source
  width: 32, // placeholder width
  height: 32, // placeholder height
  dataURI: '...', // placeholder image URI
}
```