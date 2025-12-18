import path from 'node:path';
import {readFile, writeFile, copyFile, moveFile, deleteFile} from '../helper/fs.mjs';
import {config} from './vars.mjs';
import { parseInfo, extractInfo, removeInfo, extractMainInfo, removeMainInfo} from '../helper/info.mjs';
import { genDefault, genRoot } from '../helper/template.mjs';
import {marked} from '../lib/marked/marked.mjs';


export {process};


const infoPath = path.join(config.directories.info, config.files.info.build);
let mainInfo = await readFile(infoPath).catch(() => '{}').then(JSON.parse);

async function process() {
    const {uid = mainInfo.inventory.length + 1} = mainInfo;
    let itemInfo = {id: uid};
    const content = await readFile(config.files.in.markdown);
    await writeFile(path.join(config.directories.out.markdown, `item-${uid}.md`), content);
    const info = await processInfo(content);
    itemInfo = {...itemInfo, ...info};
    itemInfo.timestamp = performance.now();
    itemInfo.date = new Date().toLocaleDateString("en-US", {year: "numeric",month: "long",day: "numeric"});
    mainInfo.inventory.push(itemInfo);
    await writeFile(infoPath, JSON.stringify(mainInfo, null, 4));
    const updatedContent = await removeInfoContent(content);
    const htmlContent = await marked.parse(updatedContent);
    const finalHtml = genRoot(itemInfo.heading, htmlContent);
    await writeFile(path.join(config.directories.out.html, itemInfo.heading, '/index.html'), finalHtml);
    await writeFile(path.join(config.files.in.markdown), genDefault());
    console.log(`Processed item with UID: ${uid}`);
}

async function processInfo(content) {
    let info;
    const infoBlock = extractInfo(content);
    if (infoBlock) {
        info = parseInfo(infoBlock);
    }
    const mainInfo = extractMainInfo(content);

    return { ...mainInfo, ...info };
}

async function removeInfoContent(content) {
    let updatedContent = removeInfo(content);
    updatedContent = removeMainInfo(updatedContent);
    return updatedContent;
}