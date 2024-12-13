import e, { json } from "express";
import { INT, PORT } from "./config.js";

const app = e();

app.use(json());

app.get("/", (_, res) => {
    res.send("Hola");
});

app.listen(PORT, INT, () => {
    console.log("Server listening on:",INT, PORT);
})