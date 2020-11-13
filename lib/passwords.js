const fs = require("fs").promises;
const CryptoJS = require("crypto-js");
const { collection } = require("./database");
const { readMasterPassword } = require("./masterPassword");

async function getPassword(passwordName) {
  const password = await collection("passwords").findOne({
    name: passwordName,
  });

  const decryptedValue = CryptoJS.AES.decrypt(
    password.value,
    await readMasterPassword()
  );

  return decryptedValue.toString(CryptoJS.enc.Utf8);
}

async function setPassword(passwordName, newPasswordValue) {
  const encryptedValue = CryptoJS.AES.encrypt(
    newPasswordValue,
    await readMasterPassword()
  ).toString();
  await collection("passwords").insertOne({
    name: passwordName,
    value: encryptedValue,
  });
}

exports.getPassword = getPassword;
exports.setPassword = setPassword;
