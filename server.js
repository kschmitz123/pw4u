const express = require("express");

const app = express();
const port = 3000;

app.get("/api/passwords/wifi", (request, response) => {
  response.send("Oassword is 123");
});

app.listen(port, () => {
  console.log(`App is listening at https://localhost:${port}`);
});
