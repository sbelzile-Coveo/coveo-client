const webpack = require("webpack");
const html = require('html-webpack-plugin');
const minimize = process.argv.indexOf("--optimize-minimize") !== -1;

var plugins = [
  new html({
    template: './templates/template.ejs',
    inject: "head"
  })
];

if (minimize) {
  plugins.push(new webpack.optimize.UglifyJsPlugin({
    sourceMap: true
  }));
}

const packageName = "[name]";

module.exports = [{
  entry: {
    "Coveo": "./src/Index.ts",
  },
  output: {
    path: require("path").resolve("./dist/"),
    filename: minimize ? `${packageName}.min.js` : `${packageName}.js`,
    chunkFilename: minimize ? `${packageName}.min.js` : `${packageName}.js`,
    libraryTarget: "umd",
    library: "[name]",
    publicPath: "",
    devtoolModuleFilenameTemplate: "[resource-path]"
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  },
  devtool: "source-map",
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: "ts-loader",
        options: {
          configFile: 'tsconfig.json',
        }
      },
    ]
  },
  plugins: plugins,
  bail: true
}]