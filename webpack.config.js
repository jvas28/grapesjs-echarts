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
						"css-loader",
						{ loader: "sass-loader", options: { api: "modern" } },
					],
				},
			],
		},
		plugins: [...corePlugins, new VueLoaderPlugin()],
		externals: { grapesjs: "grapesjs", echarts: "echarts" },
		// vue-loader 15 emits a bare `import style0 from "*.vue?vue&type=style..."`
		// per <style> block purely for its side effect (triggering vue-style-loader's
		// runtime injection); style0 is never read. vue-style-loader's pitched output
		// is plain CommonJS with no `default` key, so webpack 5's stricter ESM/CJS
		// interop check warns even though nothing is broken.
		// https://github.com/vuejs/vue-loader/issues/1854
		ignoreWarnings: [/export 'default' \(imported as '\w+'\) was not found/],
	};
};
