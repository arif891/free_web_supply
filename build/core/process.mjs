import { inventoryService } from '../services/InventoryService.mjs';
import { contentService } from '../services/ContentService.mjs';

async function process() {
    try {
        const uid = await inventoryService.generateUid();
        console.log(`Processing item with UID: ${uid}`);

        const content = await contentService.readInput();

        await contentService.saveMarkdown(uid, content);

        const { html, info, slug } = await contentService.processContent(content);

        // Enhance info with build time data
        const finalItemInfo = {
            ...info,
            id: uid,
            timestamp: Date.now(),
            slug,
            date: new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" }),
            url: `${config.directories.out.html}${slug}/`
        };

        await inventoryService.addItem(finalItemInfo);
        await contentService.saveHtml(slug, html);
        await contentService.resetInput();

        console.log(`Successfully processed item: ${info.heading} (UID: ${uid})`);
    } catch (error) {
        console.error("Error during build process:", error);
        throw error;
    }
}

export { process };