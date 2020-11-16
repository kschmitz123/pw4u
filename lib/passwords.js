const fs = require("fs").promises;
const CryptoJS = require("crypto-js");
const { collection } = require("./database");
const { readMasterPassword } = require("./masterPassword");

async function getPassword(passwordName) {
  const password = await collection("passwords").findOne({
    name: passwordName,
  });
  if (!password) {
    throw new Error("Password not found");
  }
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

  const filter = { name: passwordName };
  const update = { $set: { value: encryptedValue } };
  await collection("passwords").updateOne(filter, update, { upsert: true });
}

async function deletePassword(passwordName) {
  const filter = { name: passwordName };
  await collection("passwords").deleteOne(filter);
}

exports.getPassword = getPassword;
exports.setPassword = setPassword;
exports.deletePassword = deletePassword;
