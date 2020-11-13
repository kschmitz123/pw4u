const { readCommandLineArguments } = require("./lib/commandLine");
const { getPassword, setPassword } = require("./lib/passwords");
const { askForMasterPassword } = require("./lib/questions");
const { isMasterPasswordCorrect } = require("./lib/validation");
const { connect, close } = require("./lib/database");
require("dotenv").config();

async function run() {
  console.log("Connecting to database...");
  await connect(
    `mongodb+srv://${process.env.MONGODB_PASSWORD}@cluster0.ru8fl.mongodb.net/pw-manager?retryWrites=true&w=majority`,
    "pw-manager"
  );
  console.log("Connected to database 🎉");
  const masterPassword = await askForMasterPassword();

  if (!(await isMasterPasswordCorrect(masterPassword))) {
    console.error("WRONG 🤯. Enter correct password or leave.");
    return run();
  }

  const [passwordName, newPasswordValue] = readCommandLineArguments();
  if (!passwordName) {
    console.error("Unknown password");
    return process.exit(9);
  }

  if (newPasswordValue) {
    await setPassword(passwordName, newPasswordValue);
    console.log(`Password ${passwordName} set 🎉`);
  } else {
    const passwordValue = await getPassword(passwordName);
    console.log(`Your password is ${passwordValue} 🎉`);
  }
  await close();
}

run();
