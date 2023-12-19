/** @type {import('@remix-run/dev').AppConfig} */
export default {
  tailwind: true,
  ignoredRouteFiles: ["**/.*"],
  browserNodeBuiltinsPolyfill: {
    modules: {
      fs: true,
      path: true,
    },
  },
  // appDirectory: "app",
  // assetsBuildDirectory: "public/build",
  // publicPath: "/build/",
  // serverBuildPath: "build/index.js",
};
