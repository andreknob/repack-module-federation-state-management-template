import webpack from "webpack";

export default {
  entry: "./index.js",
  output: {
    publicPath: "http://localhost:8083/",
  },
  resolve: {
    extensions: [".tsx", ".ts", ".jsx", ".js", ".json"],
  },
  devServer: {
    port: 8083,
    hot: false,
  },
  module: {
    rules: [
      {
        test: /\.m?js/,
        type: "javascript/auto",
        resolve: {
          fullySpecified: false,
        },
      },
      {
        test: /\.(css|s[ac]ss)$/i,
        use: ["style-loader", "css-loader", "postcss-loader"],
      },
      {
        test: /\.(ts|tsx|js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
    ],
  },
  plugins: [
    new webpack.container.ModuleFederationPlugin({
      name: "testingModule",
      filename: "remoteEntry.js",
      exposes: {
        "./test": "./index.js",
      },
    }),
  ],
};