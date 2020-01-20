const express = require("express");

const app = express();
const port = 3000;

app.use(express.static("public"));

app.get("/page.js", function(req, res) {
  res.sendFile(__dirname + "/node_modules/page/page.js");
});
app.get("/*", (req, res) => {
  res.sendFile(`${__dirname}/public/index.html`);
});
app.listen(port, () => {
  console.log(`listening on http://127.0.0.1:${port}`);
});
