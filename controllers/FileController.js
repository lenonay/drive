import fs from "node:fs/promises";

import { ROUTE } from "../config.js"
import { getMime } from "../utils/mime.js";

export class FileController {
    static async Upload(req, res) {
        const { file } = req
        // En caso de que no se haya subido el archivo.
        if (!file) {
            res.json({ status: "error", error: "No se ha subido el archivo" });
        }

        res.json(file);
    }

    static async GetPathContent(req, res) {
        const { path } = req.query;
        // Validamos el path para evitar LFI
        const currentPath = (path && !path.includes("..")) ? path : "/";

        const dirContent = await fs.readdir(ROUTE + currentPath, { encoding: "utf-8" });

        let elements = [];

        for (const content of dirContent) {
            // Montamos la ruta del fichero
            const fileRoute = ROUTE + currentPath + content;
            // Recuperamos true|false si es un directorio
            const directory = (await fs.lstat(fileRoute)).isDirectory();
            // Añadimos un bloque con la información del archivo
            elements.push({
                type: (directory) ? "dir" : "file",
                mime: (directory) ? "folder" : getMime(fileRoute),
                name: content
            });
        }

        res.json({status: "OK", content: elements});
    }
}