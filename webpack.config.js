const path = require("path");
const webpack = require('webpack');
const VueLoaderPlugin = require("vue-loader/lib/plugin");
const pkg = require("./package.json");
const MinifyPlugin = require("babel-minify-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const fs = require("fs");

module.exports = (env = {}) => {
  const isProd = env.production;
  let corePlugins = [];

  if (isProd) {
    corePlugins = [new webpack.BannerPlugin(`${pkg.name} - ${pkg.version}`), new MinifyPlugin({},{})];
  } else {
    const index = "index.html";
    const indexDev = "_" + index;
    corePlugins.push(
      new HtmlWebpackPlugin({
        template: fs.existsSync(indexDev) ? indexDev : index,
        inject: false
      })
    );
  }
  return {
    mode: isProd ? "production" : "development",
    devtool: isProd ? "source-map" : "cheap-module-eval-source-map",
    entry: {
      "grapesjs-echarts": "./src",
      "grapesjs-echarts.min": "./src"
    },
    output: {
      path: path.resolve(__dirname),
      filename: "dist/[name].js",
      library: pkg.name,
      libraryTarget: "umd"
    },
    module: {
      rules: [
        {
          test: /\.vue$/,
          loader: "vue-loader"
        },
        {
          test: /\.js$/,
          exclude: /(node_modules|bower_components)/,
          include: /src/,
          use: {
            loader: "babel-loader",
            options: {
              presets: ["@babel/preset-env"]
            }
          }
        },
        {
          test: /\.scss$/,
          use: ["vue-style-loader", "css-loader", "sass-loader"]
        }
      ]
    },
    plugins: [...corePlugins, new VueLoaderPlugin()],
    externals: { grapesjs: "grapesjs" }
  };
};
