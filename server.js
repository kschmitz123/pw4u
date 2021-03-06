require("dotenv").config();
const express = require("express");
const path = require("path");
const { getPassword, setPassword, deletePassword } = require("./lib/passwords");
const { connect } = require("./lib/database");

const app = express();
app.use(express.json());
const port = process.env.PORT || 3600;

app.get("/api/passwords/:name", async (request, response) => {
  const { name } = request.params;
  try {
    passwordValue = await getPassword(name);
    if (!passwordValue) {
      response.status(404).send("Could not find password.");
    }
    response.send(`The password is ${passwordValue}`);
  } catch (error) {
    console.error(error);
    response.status(500).send("An internal server error occurred.");
  }
});

app.post("/api/passwords/", async (request, response) => {
  const password = request.body;
  try {
    await setPassword(password.name, password.value);
    response.send(`Successfully set ${password.name}`);
  } catch (error) {
    console.error(error);
    response.status(500).send("An internal server error occurred.");
  }
});

app.patch("/api/passwords/", async (request, response) => {
  const password = request.body;
  try {
    await setPassword(password.name, password.value);
    response.send(`Successfully set ${password.name}`);
  } catch (error) {
    console.error(error);
    response.status(500).send("An internal server error occurred.");
  }
});

app.delete("/api/passwords/:name", async (request, response) => {
  const { name } = request.params;
  try {
    await deletePassword(name);
    response.send(`Password for ${name} successfully deleted`);
  } catch (error) {
    console.error(error);
    response.status(500).send("An internal server error occurred.");
  }
});

app.use(express.static(path.join(__dirname, "client/build")));

app.use(
  "/storybook",
  express.static(path.join(__dirname, "client/storybook-static"))
);

app.get("*", (request, response) => {
  response.sendFile(path.join(__dirname, "client/build", "index.html"));
});

async function run() {
  try {
    console.log("Connecting to database...");
    await connect(process.env.MONGODB_URL, process.env.MONGODB);
    console.log("Connected to database 🎉");
    app.listen(port, () => {
      console.log(`App is listening at https://localhost:${port}`);
    });
  } catch (error) {
    console.error(error);
  }
}
run();
