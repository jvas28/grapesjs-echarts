const path = require("path");
const webpack = require("webpack");
const VueLoaderPlugin = require("vue-loader/lib/plugin");
const pkg = require("./package.json");
const HtmlWebpackPlugin = require("html-webpack-plugin");
module.exports = (env = {}) => {
	const isProd = env.production;
	let corePlugins = [];
	if (isProd) {
		corePlugins = [new webpack.BannerPlugin(`${pkg.name} - ${pkg.version}`)];
	}
	const index = "index.html";
	const indexDev = "_" + index;
	corePlugins.push(
		new HtmlWebpackPlugin({
			template: isProd? index : indexDev,
			inject: false,
			minify: false,
		}),
	);
	return {
		mode: isProd ? "production" : "development",
		devtool: isProd ? "source-map" : "eval-cheap-module-source-map",
		entry: {
			"grapesjs-echarts": "./src",
			"grapesjs-echarts.min": "./src",
		},
		output: {
			path: path.resolve(__dirname),
			filename: "dist/[name].js",
			chunkFilename: "dist/[name].bundle.js",
			library: pkg.name,
			libraryTarget: "umd",
		},
		module: {
			rules: [
				{
					test: /\.svg$/,
					loader: "svg-inline-loader"
				},
				{
					test: /\.vue$/,
					loader: "vue-loader",
				},
				{
					test: /\.js$/,
					exclude: /(node_modules|bower_components)/,
					include: /src/,
					use: {
						loader: "babel-loader",
						options: {
							presets: ["@babel/preset-env"],
						},
					},
				},
				{
					test: /\.scss$/,
					use: [
						"vue-style-loader",
						{ loader: "css-loader", options: { esModule: false } },
						{ loader: "sass-loader", options: { api: "modern" } },
					],
				},
			],
		},
		plugins: [...corePlugins, new VueLoaderPlugin()],
		externals: { grapesjs: "grapesjs", echarts: "echarts" },
	};
};
