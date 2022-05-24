const nodeResolver = require('eslint-import-resolver-node');
const path = require('path');

exports.interfaceVersion = 2;

exports.resolve = function (source, file, config) {
  const { moduleAliases = {} } = config;
  const moduleName = source.split('/')[0];
  const filePathInModule = source.split('/').slice(1).join('/');

  const finalRequirePath = moduleAliases[moduleName] ?
    path.join(projectRoot, moduleAliases[moduleName], filePathInModule) :
    source;

  return nodeResolver.resolve(finalRequirePath, file, config);
}
