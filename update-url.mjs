import { getFilesWithExtension, readFile, writeFile } from './src/utils/fs.js';

try {
    const htmlFiles = await getFilesWithExtension('./', 'html', true);
    
    if (htmlFiles.length === 0) {
        console.log('No HTML files found.');
        process.exit(0);
    }

    // Process all files in parallel
    await Promise.all(htmlFiles.map(async file => {
        try {
            const content = await readFile(file);
            // Remove /pages/ prefix from href paths: href="/pages/..." → href="/..."
            const updatedContent = content.replace(/href=(['"])\/pages\/([^'"]+)\1/g, (match, quote, path) => {
                return `href=${quote}/${path}${quote}`;
            });
            
            if (content !== updatedContent) {
                await writeFile(file, updatedContent);
                console.log(`✓ Updated: ${file}`);
            }
        } catch (error) {
            console.error(`✗ Error processing ${file}:`, error.message);
        }
    }));

    console.log('URL update complete.');
} catch (error) {
    console.error('Fatal error:', error.message);
    process.exit(1);
}