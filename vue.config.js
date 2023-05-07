const path = require("path");
const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  transpileDependencies: true,

  chainWebpack: (config) => {
    config.module
      .rule("typescript")
      .test(/\.ts$/)
      .use("ts-loader")
      .loader("ts-loader")
      .end();
  },

  configureWebpack: {
    resolve: {
      extensions: [".js", ".ts"],
    },
    module: {
      rules: [
        {
          test: /\.ts$/,
          loader: "ts-loader",
          exclude: [path.resolve(__dirname, "src/relation-graph/relation-graph-vue3")],
        },
      ],
    },
  },

  lintOnSave: false,
  parallel: false,
});
