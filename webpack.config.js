var path = require('path');

modules.export = {
  entry: "./app/scripts/app.js",

  output: {
    // options related to how webpack emits results
    path: path.resolve(__dirname, "./app/temp/scripts"), // string
    // the target directory for all output files
    // must be an absolute path (use the Node.js path module)
    filename: "app.js" // string
  }
}
