export class FileController {
    static async Upload(req,res) {
        const { file } = req
        // En caso de que no se haya subido el archivo.
        if(!file) {
            res.json({status: "error", error: "No se ha subido el archivo"});
        }

        res.json(file);
    }
}