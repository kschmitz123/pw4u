const fs = require("fs").promises;

function readMasterPassword() {
  return process.env.MASTER_PASSWORD;
}

exports.readMasterPassword = readMasterPassword;
