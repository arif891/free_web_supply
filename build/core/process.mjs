import { infoService } from '../services/InfoService.mjs';
import { contentService } from '../services/ContentService.mjs';
import { config } from '../config/index.mjs';
import { genInventorySection, genManifestSection } from '../utils/template.mjs';

async function process() {
    try {
        const content = await contentService.readInput();
        const { html, info, slug } = await contentService.processContent(content);

        const type = info.type || 'manifest';

        const uid = await infoService.generateUid(type);
        console.log(`Processing item with UID: ${uid} (Type: ${type})`);

        await contentService.saveMarkdown(uid, content);

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

        const newInfo = await infoService.getMainInfo();

        const inventoryItems = (newInfo.inventory || []).slice().reverse();
        const manifestItems = (newInfo.manifest || []).slice().reverse();

        const homeInventoryHtml = genInventorySection([...inventoryItems], newInfo.inventory?.length, true);
        const homeManifestHtml = genManifestSection([...manifestItems], newInfo.manifest?.length, true);

        const fullInventoryHtml = genInventorySection([...inventoryItems], newInfo.inventory?.length, false);
        const fullManifestHtml = genManifestSection([...manifestItems], newInfo.manifest?.length, false);

        await contentService.updateHomePage(homeInventoryHtml, homeManifestHtml);
        await contentService.updateInventoryPage(fullInventoryHtml);
        await contentService.updateManifestPage(fullManifestHtml);

        await contentService.resetInput();

        console.log(`Successfully processed item: ${info.heading} (UID: ${uid})`);
    } catch (error) {
        console.error("Error during build process:", error);
        throw error;
    }
}

export { process };