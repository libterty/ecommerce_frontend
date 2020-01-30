const path = require("path");
const CompressionPlugin = require("compression-webpack-plugin");
const productionGzipExtensions = ['js', 'css'];
// improving use
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer").BundleAnalyzerPlugin;
const prerenderSpaPlugin = require("prerender-spa-plugin");

module.exports = {
  transpileDependencies: ['vuetify', 'echarts', 'resize-detector'],
  chainWebpack: config => {
    config.plugins.delete('prefetch');
    config.plugin('CompressionPlugin').use(CompressionPlugin);
  },
  configureWebpack: () => {
    if (process.env.NODE_ENV === 'production') {
      return {
        plugins: [
          new BundleAnalyzerPlugin(),
          new CompressionPlugin({
            filename: '[path].gz[query]',
            algorithm: 'gzip',
            test: new RegExp('\\.(' + productionGzipExtensions.join('|') + ')$'),
            threshold: 8192,
            minRatio: 0.8
          }),
          new prerenderSpaPlugin({
            staticDir: path.join(__dirname, 'dist'),
            routes: [
              '/',
              '/furnitures',
              '/signin',
              '/signup'
            ]
          })
        ],
        resolve: {
          alias: {
            vue$: 'vue/dist/vue.runtime.esm.js'
          }
        }
      }
    }
  }
};
