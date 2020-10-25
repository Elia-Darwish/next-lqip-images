interface LqipImage {
  src: string
  width: number
  height: number
  dataURI: string
}

declare module "*.jpeg" {
  const value: string;
  export = value;
}

declare module "*.jpg" {
  const value: string;
  export = value;
}

declare module "*.png" {
  const value: string;
  export = value;
}

declare module "*.svg" {
  const value: string;
  export = value;
}

declare module "*.gif" {
  const value: string;
  export = value;
}

declare module "*.ico" {
  const value: string;
  export = value;
}

declare module "*.webp" {
  const value: string;
  export = value;
}

declare module "*.jp2" {
  const value: string;
  export = value;
}


declare module '*.jpg?lqip' {
  export const src: string
  export const width: number
  export const height: number
  export const dataURI: string
  const value: LqipImage
  export default value
}

declare module '*.jpeg?lqip' {
  export const src: string
  export const width: number
  export const height: number
  export const dataURI: string
  const value: LqipImage
  export default value
}

declare module '*.png?lqip' {
  export const src: string
  export const width: number
  export const height: number
  export const dataURI: string
  const value: LqipImage
  export default value
}

declare module '*.jpg?lqip&webp' {
  export const src: string
  export const width: number
  export const height: number
  export const dataURI: string
  const value: LqipImage
  export default value
}

declare module '*.jpeg?lqip&webp' {
  export const src: string
  export const width: number
  export const height: number
  export const dataURI: string
  const value: LqipImage
  export default value
}

declare module '*.png?lqip&webp' {
  export const src: string
  export const width: number
  export const height: number
  export const dataURI: string
  const value: LqipImage
  export default value
}
