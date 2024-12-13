import fs from "node:fs";
import { Router } from "express";

export const DepsRouter = Router();

// CSS

DepsRouter.get("/css/:file", (req, res) => {
    const { file } = req.params;

    // Si no hay archivo 404
    if (!file) {
        res.status(404).send();
        return;
    }

    // Construimos el path
    const path = `./deps/css/${file}`;

    // Si no existe 404
    if (!fs.existsSync(path)){
        res.status(404).send();
        return;
    }

    res.sendFile(file, {root: "./deps/css/"});
});

DepsRouter.get("/js/:file", (req, res) => {
    const { file } = req.params;

    // Si no hay archivo 404
    if (!file) {
        res.status(404).send();
        return;
    }

    // Construimos el path
    const path = `./deps/js/${file}`;

    // Si no existe 404
    if (!fs.existsSync(path)){
        res.status(404).send();
        return;
    }

    res.sendFile(file, {root: "./deps/js/"});
});