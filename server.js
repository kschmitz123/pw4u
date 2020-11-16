require("dotenv").config();
const express = require("express");
const { getPassword } = require("./lib/passwords");
const { connect } = require("./lib/database");

const app = express();
const port = 3000;

app.get("/api/passwords/:name", async (request, response) => {
  const { name } = request.params;
  passwordValue = await getPassword(name);
  response.send(`The password is ${passwordValue}`);
});

app.listen(port, () => {
  console.log(`App is listening at https://localhost:${port}`);
});

async function run() {
  try {
    console.log("Connecting to database...");
    await connect(process.env.MONGODB_URL, process.env.MONGODB);
    console.log("Connected to database 🎉");
  } catch (error) {
    console.error(error);
  }
}
run();
