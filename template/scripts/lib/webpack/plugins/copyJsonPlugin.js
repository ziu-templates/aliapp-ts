const path = require("path"),
  { getAppJson } = require("miniapp-auto-webpack-plugin"),
  CopyWebpackPlugin = require("copy-webpack-plugin"),
  conf = require("../../../etc/index");

module.exports = function (entryJsonFiles, codePath) {
  if (!entryJsonFiles) {
    return [];
  }
  let entryJson = Object.entries(entryJsonFiles).map(([page, pathurl]) => {
    if (pathurl[0].includes("app.json")) {
      return {
        context: process.cwd(),
        from: pathurl[0],
        to: path.join(codePath, `${page}.json`),
        transform() {
          return JSON.stringify(
            getAppJson({
              autoImportAppConfigPath: conf.autoImportAppConfigPath,
            }),
          );
        },
      };
    }

    return {
      context: process.cwd(),
      from: pathurl[0],
      to: path.join(codePath, `${page}.json`),
      transform(content) {
        try {
          const jsonData = JSON.parse(content.toString());
          if (!jsonData || !jsonData.usingComponents) {
            return content;
          }
          const tmp = {};
          Object.entries(jsonData.usingComponents).forEach(([componentName, pathurl]) => {
            if (!entryJsonFiles[pathurl] || entryJsonFiles[pathurl].length === 0) {
              tmp[componentName] = pathurl;
              return;
            }
            tmp[componentName] = entryJsonFiles[pathurl][0].includes("node_modules") ? `/${pathurl}` : pathurl;
          });
          jsonData.usingComponents = tmp;
          return JSON.stringify(jsonData);
        } catch (e) {
          console.error(e);
          return content;
        }
      },
    };
  });
  return [new CopyWebpackPlugin([...entryJson])];
};
