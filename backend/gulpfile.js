const gulp = require("gulp");
const tsNode = require("ts-node");
require("dotenv").config();

tsNode.register({
  transpileOnly: true,
});

require("./gulp/database");
