
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

# 0.1.0

### added a param to get a blurred image output

```js
import img from './image.jpg?lqip&blur&webp'
```

### added an option to set the blur amount

```js
const withLqipImages = require('next-lqip-images')

module.exports = withLqipImages({
  placeholderSize: 32,
  placeholderBlur: 3.2,
})
```

### added a param to get an array of dominant image colors

```js
import { src, width, height, colors } from './image.png?colors'
```