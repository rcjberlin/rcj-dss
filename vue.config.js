module.exports = {
  lintOnSave: false,
  publicPath: "/rcj-dss/",
  pwa: {
    themeColor: "#fd5e53",
    msTileColor: "#fd5e53",
    manifestOptions: {
      name: "RCJ Rescue Line - Digital Scoring Sheet",
      short_name: "RCJ DSS", // eslint-disable-line
    },
    workboxOptions: {
      skipWaiting: true,
    },
  },
  chainWebpack: (config) => {
    config.plugin("html").tap((args) => {
      args[0].title = "RCJ Rescue Line - Digital Scoring Sheet";
      return args;
    });
  },
};
