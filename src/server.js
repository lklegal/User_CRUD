const express = require("express");
const router = require("./routes/users.routes")
const app = express();

app.use("/users", router);

const port = 3000;
app.listen(port, () => {
    console.log("It's alive on port ", port);
});