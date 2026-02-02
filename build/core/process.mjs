import { infoService } from '../services/InfoService.mjs';
import { contentService } from '../services/ContentService.mjs';
import { config } from '../config/index.mjs';

async function process() {
    try {
        const content = await contentService.readInput();
        const { html, info, slug } = await contentService.processContent(content);

        const type = info.type || 'manifest';

        const uid = await infoService.generateUid(type);
        console.log(`Processing item with UID: ${uid} (Type: ${type})`);

        await contentService.saveMarkdown(uid, content);

        // Enhance info with build time data
        const outDir = config.directories.out.html[type] || config.directories.out.html.inventory;
        const finalItemInfo = {
            ...info,
            id: uid,
            timestamp: Date.now(),
            slug,
            date: new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" }),
            url: `/${outDir}${slug}/`
        };

        await infoService.addItem(finalItemInfo, type);
        await contentService.saveHtml(slug, html, type);
        await contentService.resetInput();

        console.log(`Successfully processed item: ${info.heading} (UID: ${uid})`);
    } catch (error) {
        console.error("Error during build process:", error);
        throw error;
    }
}

export { process };