var mode = process.env.NODE_ENV || "development";
module.exports = {
  entry: ["./server/index.js"],
  output: {
    path: __dirname,
    filename: "./public/bundle.js",
  },
  devtool: mode === "development" ? "source-map" : false,
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: "babel-loader",
        options: {
          presets: ["@babel/preset-react"],
        },
      },
    ],
  },
};
