module.exports = ({dynamicAssetPrefix = false, ...nextConfig} = {}) => {
  return {
    ...nextConfig,
    publicRuntimeConfig: dynamicAssetPrefix
      ? {
          ...nextConfig.publicRuntimeConfig,
          nextImagesAssetPrefix: nextConfig.assetPrefix,
        }
      : nextConfig.publicRuntimeConfig,
    webpack(config, options) {
      const {isServer} = options
      nextConfig = {
        inlineLimit: 2000,
        assetPrefix: '',
        basePath: '',
        fileExtensions: [
          'jpg',
          'jpeg',
          'png',
          'svg',
          'gif',
          'ico',
          'webp',
          'jp2',
        ],
        ...nextConfig,
      }

      if (!options.defaultLoaders) {
        throw new Error(
          'This plugin is not compatible with Next.js versions below 5.0.0 https://err.sh/next-plugins/upgrade',
        )
      }

      config.module.rules.push({
        test: new RegExp(`.(${nextConfig.fileExtensions.join('|')})$`),
        // Next.js already handles url() in css/sass/scss files
        issuer: /\.\w+(?<!(s?c|sa)ss)$/i,
        exclude: nextConfig.exclude,
        use: [
          {
            loader: require.resolve('lqip-modern-loader'),
          },
          {
            loader: require.resolve('url-loader'),
            options: {
              limit: nextConfig.inlineLimit,
              fallback: require.resolve('file-loader'),
              publicPath: `${
                nextConfig.assetPrefix || nextConfig.basePath
              }/_next/static/images/`,
              outputPath: `${isServer ? '../' : ''}static/images/`,
              postTransformPublicPath: (p) => {
                if (dynamicAssetPrefix && !nextConfig.assetPrefix) {
                  return `(require("next/config").default().publicRuntimeConfig.nextImagesAssetPrefix || '') + ${p}`
                }
                return p
              },
              name: '[name]-[hash].[ext]',
              esModule: false,
            },
          },
        ],
      })

      if (typeof nextConfig.webpack === 'function') {
        return nextConfig.webpack(config, options)
      }

      return config
    },
  }
}
