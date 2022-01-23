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
  lintOnSave: true,
  chainWebpack: config => {
    config.plugin("html").tap(args => {
      args[0].title = "Swipes for Science";
      return args;
    });
  },
};
