import fs from "node:fs/promises";
import path from "node:path";

export { readFile, writeFile, copyFile, moveFile, deleteFile };

async function readFile(filePath, encoding = 'utf8') {
    return await fs.readFile(filePath, { encoding });
}

async function writeFile(filePath, content, flag = 'w') {
    await fs.mkdir(path.dirname(filePath), { recursive: true });
    return await fs.writeFile(filePath, content, { flag });
}

async function copyFile(source, destination) {
    await fs.mkdir(path.dirname(destination), { recursive: true });
    return await fs.copyFile(source, destination);
}

async function moveFile(source, destination) {
    await fs.mkdir(path.dirname(destination), { recursive: true });
    return await fs.rename(source, destination);
}

async function deleteFile(filePath) {
    return await fs.unlink(filePath);
}
