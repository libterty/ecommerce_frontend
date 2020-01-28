const CompressionPlugin = require("compression-webpack-plugin");

module.exports = {
  transpileDependencies: ['vuetify'],
  configureWebpack: () => {
    if (process.env.NODE_ENV === 'production') {
      return {
        plugins: [
          new CompressionPlugin({
            test: /\.js$|\.html$|\.css/,
            threshold: 8192,
            deleteOriginalAssets: true
          })
        ]
      }
    }
  }
};
