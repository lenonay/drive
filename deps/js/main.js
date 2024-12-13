/////////// ELEMENTOS
// BOTONES
const upload_btn = document.querySelector(".upload_btn");
// INTPUS
const $files = document.querySelector("#files_inp")
// Extras
const domain = window.location;
////////// EVENTOS
upload_btn.addEventListener("click", () => $files.click());
$files.addEventListener("change", ProcessFiles);

////////// FUNCIONES
function ProcessFiles(){
    // Recuperamos los archivos del input
    const { files } = $files;

    // Si no hay ficheros salimos
    if(!files || files.length == 0) return;

    for(const file of files){
        UploadFile(file);
    }
}

async function UploadFile(file){
    // Instanciar un formulario y añadirle el fichero
    const form = new FormData;
    form.append("upload", file);
    
    // Enviar la peticion de subida al servidor
    const peticion = await fetch(`${domain}files`, {
        method: "POST",
        body: form
    });

    
    const resultado = (peticion.ok) ? await peticion.json() : null

    console.log(resultado);
}