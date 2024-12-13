import e, { json } from "express";
import { INT, PORT } from "./config.js";
import { DepsRouter } from "./routes/deps.js";

const app = e();

app.use(json());

app.get("/favicon.ico", (_, res) => {
    res.header("Content-Type: image/png").sendFile("logo.png", { root: "./public" });
});

app.get("/", (_, res) => {
    res.sendFile("./main.html", { root: "./views" });
});

app.use("/deps", DepsRouter);

app.listen(PORT, INT, () => {
    console.log("Server listening on:", INT, PORT);
})