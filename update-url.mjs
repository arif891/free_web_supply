import { getFilesWithExtension, readFile, writeFile } from './src/utils/fs.js';

const htmlFiles = await getFilesWithExtension('./', 'html', true);

htmlFiles.forEach(async file => {
    const content = await readFile(file);
    // Matches href="/pages/..." or href='/pages/...'
    const updatedContent = content.replace(/href=(['"])\/pages\/([^'"]+)\1/g, (match, quote, path) => {
        return `href=${quote}/${path}${quote}`;
    });
    await writeFile(file, updatedContent);
});