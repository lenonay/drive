import e, { json } from "express";
import { INT, PORT } from "./config.js";

import { FilesRouter } from "./routes/files.js";
import cookieParser from "cookie-parser";

const app = e();
//  Midleware
app.use(json());
app.use(cookieParser());

// Rutas estáticas
app.use("/public", e.static("./public"));
app.use("/deps", e.static("./deps"));

app.get("/favicon.ico", (_, res) => {
    res.header("Content-Type: image/png").sendFile("logo.png", { root: "./public" });
});

app.get("/", (_, res) => {
    res.sendFile("./main.html", { root: "./views" });
});

app.use("/files", FilesRouter);

app.listen(PORT, INT, () => {
    console.log("Server listening on:", INT, PORT);
})