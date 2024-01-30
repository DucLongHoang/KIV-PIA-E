// const path = require("path")

// module.exports = function override(config, env) {
//   // Disable ModuleScopePlugin to allow relative imports from outside of src/
//   config.resolve.plugins = config.resolve.plugins.filter((plugin) => plugin.constructor.name !== "ModuleScopePlugin")

//   config.resolve.alias = {
//     ...(config.resolve.alias || {}),
//     "@types": path.resolve(__dirname, "../backend/src/types"),
//   }

//   return config
// }

const path = require("path")

module.exports = function override(config, env) {
  // Disable ModuleScopePlugin to allow relative imports from outside of src/
  config.resolve.plugins = config.resolve.plugins.filter((plugin) => plugin.constructor.name !== "ModuleScopePlugin")

  // Set up an alias for importing types
  config.resolve.alias = {
    ...(config.resolve.alias || {}),
    types: path.resolve(__dirname, "../backend/src/types"),
  }

  return config
}
