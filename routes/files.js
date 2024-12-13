import { Router } from "express";
import multer from "multer";

import { ROUTE } from "../config.js";
import { FileController } from "../controllers/FileController.js";

export const FilesRouter = Router();

// Creamos las opciones de la subida
const storage = multer.diskStorage({
    destination: ROUTE,
    // Guardamos el nombre original
    filename: (_, file, cb) => {
        cb(null, file.originalname)
    }
});

const Upload = multer({ storage });

// Subida de un archivo
FilesRouter.post("/", Upload.single("upload"));


// Gestionar los errores de subida de archivos
FilesRouter.use((err, req, res, next) => {
    if (err instanceof multer.MulterError) {
        // Errores específicos de multer
        return res.json({ error: err.message });
    } else if (err) {
        // Otros errores
        return res.json({ error: err.message });
    }
    next();
});