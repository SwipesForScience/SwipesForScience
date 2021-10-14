module.exports = {
  runtimeCompiler: true,
  configureWebpack: {
    devtool: "source-map",
  },
  css: {
    loaderOptions: {
      scss: {
        additionalData: `@import "~@/scss/_base.scss";`,
      },
    },
  },

  lintOnSave: false, //TODO: remove later to fix linting errors
};
