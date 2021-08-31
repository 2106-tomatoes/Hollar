module.exports = {
  entry: ["./server/index.js"],
  output: {
    path: __dirname,
    filename: "./public/bundle.js",
  },
  devtool: mode === "production" ? false : "source-map",
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
