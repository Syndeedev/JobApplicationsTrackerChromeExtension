const path = require("path");
const fs = require("fs");

// Generate pages object
const pages = {};

function getEntryFile(entryPath) {
  let files = fs.readdirSync(entryPath);
  return files;
}

const chromeName = getEntryFile(path.resolve(`src/entry`));
const CopyWebpackPlugin = require('copy-webpack-plugin');

function getFileExtension(filename) {
  return /[.]/.exec(filename) ? /[^.]+$/.exec(filename)[0] : undefined;
}
chromeName.forEach((name) => {
  const fileExtension = getFileExtension(name);
  const fileName = name.replace("." + fileExtension, "");
  pages[fileName] = {
    entry: `src/entry/${name}`,
    template: "public/index.html",
    filename: `${fileName}.html`,
  };
});

const isDevMode = process.env.NODE_ENV === "development";

module.exports = {
  pages,
  filenameHashing: false,
  configureWebpack: {
    plugins: [
      new CopyWebpackPlugin([
        {
          from: path.resolve(`src/manifest.${process.env.NODE_ENV}.json`),
          to: `${path.resolve("dist")}/manifest.json`,
        },
        {
          from: path.resolve(`public/`),
          to: `${path.resolve("dist")}/`,
        },
      ]),
    ],
    output: {
      filename: `[name].js`,
      chunkFilename: `[name].js`,
    },
    devtool: isDevMode ? "inline-source-map" : false,
  },
  css: {
    extract: false, // Make sure the css is the same
  },
};
