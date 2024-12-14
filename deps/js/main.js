/////////// ELEMENTOS
// HTML
const $main = document.querySelector("main");
const alerta_div = document.querySelector(".alertas");
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
function ProcessFiles() {
    // Recuperamos los archivos del input
    const { files } = $files;

    // Si no hay ficheros salimos
    if (!files || files.length == 0) return;

    for (const file of files) {
        UploadFile(file);
    }
}

async function UploadFile(file) {
    // Instanciar un formulario y añadirle el fichero
    const form = new FormData;
    form.append("upload", file);

    // Enviar la peticion de subida al servidor
    const peticion = await fetch(`${domain}files`, {
        method: "POST",
        body: form
    });


    const resultado = (peticion.ok) ? await peticion.json() : null

    if (resultado.status == "error") {
        ShowMsg({ status: "error", msg: resultado.error });
    }
}

async function GetPathContent(path = "/") {
    const peticion = await fetch(`${domain}files?path=${path}`, { method: "GET" });

    const resultado = (peticion.ok) ? await peticion.json() : null;

    if (!resultado) {
        ShowMsg({ status: "error", msg: "No se ha podido conectar al servidor" });
        return
    }

    if (resultado.status !== "OK"){
        ShowMsg({status: "error", msg: "No se pudo obtener los datos"});
        return
    }

    DisplayFiles(resultado.content);
}

function DisplayFiles(files) {
    // Vacíamos el html
    $main.innerHTML = "";
    
    for(const file of files){
        // Creamos la carta
        const card = document.createElement("div");
        card.className = "card"

        card.setAttribute("type", file.type);

        card.innerHTML = `
            <span class="titulo">${file.name}</span>
            <img src="${domain}files/${file.name}" alt="${file.name}"/>
        `;

        $main.append(card);
    }
}

function ShowMsg(alerta) {
    // Creamos un elememento P
    const p = document.createElement("p");
    // Metemos la clase error si el estado es distinto de OK
    p.className = (alerta.status !== "OK") ? "error" : "";

    // Metemos el mensaje a mostrar
    p.textContent = alerta.msg;

    alerta_div.append(p);

    // Pasados 3 segundos borramos la alerta.
    setTimeout(() => { alerta_div.innerHTML = "" }, 3000)
}
////////// CUERPO
GetPathContent();