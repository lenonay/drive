import path from "node:path"

export function getMime(_path) {
    const images = ["png", "jpg", "gif", "jpeg", "webp"];
    const videos = ["mp4", "mov"];

    const ext = path.extname(_path).toLowerCase().slice(1);

    switch (true) {
        case images.includes(ext):
            return "image";
        case videos.includes(ext):
            return "video"
        default:
            return "doc"
    }
}