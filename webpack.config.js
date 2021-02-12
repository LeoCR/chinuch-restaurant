var path = require("path");
var HtmlWebPackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
module.exports = {
  entry:{
    app: path.resolve(__dirname, "src/app.js"),
    user: path.resolve(__dirname, "src/user.js"),
    checkout:path.resolve(__dirname,"src/checkout.js")
  },
  output: {
    path: path.resolve(__dirname, "build"),
    filename: '[name].js'
  },
  resolve: {
    extensions: [".js", ".jsx"]
  },
  watch: true,
  module: {
    rules: [
      {
        test: /\.html$/,
        use: [
          {
            loader: "html-loader"
          }
        ]
      },
      {
        test: /\.(png|jpg|gif)$/i,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192,
            },
          },
        ],
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options:{
            presets: ["@babel/preset-env", "@babel/preset-react"],
            plugins: ["@babel/plugin-proposal-class-properties","@babel/plugin-transform-runtime"]
          }
        }
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader']
      }
    ]
  },
  /* resolve: {
    alias: {
      "animejs":path.resolve('node_modules','animejs/lib/anime.es.js'),
      "TweenLite": path.resolve('node_modules', 'gsap/src/uncompressed/TweenLite.js'),
      "TweenMax": path.resolve('node_modules', 'gsap/src/uncompressed/TweenMax.js'),
      "TimelineLite": path.resolve('node_modules', 'gsap/src/uncompressed/TimelineLite.js'),
      "TimelineMax": path.resolve('node_modules', 'gsap/src/uncompressed/TimelineMax.js'),
      "ScrollMagic": path.resolve('node_modules', 'scrollmagic/scrollmagic/uncompressed/ScrollMagic.js'),
      "animation.gsap": path.resolve('node_modules', 'scrollmagic/scrollmagic/uncompressed/plugins/animation.gsap.js')
    }
  }, */
  plugins:[
    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: '[id].css',
    }),
    new HtmlWebPackPlugin({
      filename:'./index.html',
      template: "./public/index.html",
    }),
    new HtmlWebPackPlugin({
      filename:'./user.html',
      template: "./public/user.html",
    }),  
    new HtmlWebPackPlugin({
      filename:'./checkout.html',
      template: "./public/checkout.html",
    })  
  ]
};