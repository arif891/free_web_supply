import path from 'node:path';
import fs from "node:fs/promises";

export {getFilesWithExtension, replaceURLs, createSlug};

async function getFilesWithExtension(directory, extension, subDir = false, exclude = ['layx', 'setup']) {
    const entries = await fs.readdir(directory, { withFileTypes: true });
    let files = [];

    for (const entry of entries) {
        const fullPath = path.join(directory, entry.name);

        if (entry.isDirectory() && subDir && !exclude.includes(entry.name)) {
            files = files.concat(await getFilesWithExtension(fullPath, extension, subDir, exclude));
        } else if (entry.isFile() && path.extname(entry.name) === `.${extension}` && !exclude.includes(entry.name)) {
            files.push(fullPath);
        }
    }

    return files;
}

function replaceURLs(input, from = '/pages/', to = '/', where = 'start') {
    
    const escapedFrom = from.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const noExternal = '(?!https?:\\/\\/|\\/\\/)';
    let regex;

    switch (where) {
        case 'start':
            regex = new RegExp(`(href="${noExternal})${escapedFrom}([^"]*?")`, 'g');
            break;
            
        case 'end':
            regex = new RegExp(`(href="${noExternal}[^"]*?)${escapedFrom}(")`, 'g');
            break;
            
        case 'anywhere':
        default:
            regex = new RegExp(`(href="${noExternal}[^"]*?)${escapedFrom}([^"]*?")`, 'g');
            break;
    }

    return input.replace(regex, `$1${to}$2`);
}

function createSlug(text) {
  return text
    .toString()
    .replace(/&/g, 'and')           
    .replace(/\+/g, 'plus')        
    .normalize('NFD')             
    .replace(/[\u0300-\u036f]/g, '') 
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-_]/g, '')  
    .replace(/[\s_]+/g, '-')        
    .replace(/-+/g, '-')          
    .replace(/^-+|-+$/g, '');
}