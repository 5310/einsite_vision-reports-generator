const HtmlWebpackPlugin = require('html-webpack-plugin')
const HtmlInlineScriptPlugin = require('html-inline-script-webpack-plugin')

module.exports = {
  entry: './index.js',
  mode: 'development',
  output: {
    path: `${__dirname}`,
    publicPath: '',
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.vm',
      template: 'index.html',
    }),
    new HtmlInlineScriptPlugin(),
  ],
}
