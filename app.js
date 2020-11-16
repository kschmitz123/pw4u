require("dotenv").config();
const { readCommandLineArguments } = require("./lib/commandLine");
const { getPassword, setPassword, deletePassword } = require("./lib/passwords");
const { askForMasterPassword } = require("./lib/questions");
const { isMasterPasswordCorrect } = require("./lib/validation");
const { connect, close } = require("./lib/database");

async function run() {
  try {
    console.log("Connecting to database...");
    await connect(process.env.MONGODB_URL, process.env.MONGODB);
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

    if (passwordName === "delete") {
      const passwordToDelete = newPasswordValue;
      await deletePassword(passwordToDelete);
      console.log(`Password ${newPasswordValue} deleted 🎉`);
    } else if (newPasswordValue) {
      await setPassword(passwordName, newPasswordValue);
      console.log(`Password ${passwordName} set 🎉`);
    } else {
      const passwordValue = await getPassword(passwordName);
      console.log(`Your password is ${passwordValue} 🎉`);
    }
  } catch (error) {
    console.error(error);
  } finally {
    await close();
  }
}

run();
