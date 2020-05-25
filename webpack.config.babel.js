import path from 'path';
import HtmlWebpackPlugin from "html-webpack-plugin";
import {CleanWebpackPlugin} from "clean-webpack-plugin";

export default {
  mode: process.env.npm_lifecycle_event === 'build' ? 'production' : 'development',
  entry: {
    main: ['@babel/polyfill', `${path.resolve(__dirname)}/src/main.js`]
  },
  output: {
    path: path.resolve(__dirname, 'public'),
    filename: 'main_[hash].js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: ['babel-loader']
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: `${path.resolve(__dirname)}/src/index.html`
    }),
    new CleanWebpackPlugin()
  ],
  devServer: {
    contentBase: path.resolve(__dirname, 'public'),
    compress: true,
    port: 3000
  }
}
