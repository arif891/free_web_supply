import { infoService } from '../services/InfoService.mjs';
import { contentService } from '../services/ContentService.mjs';
import { config } from '../config/index.mjs';
import { genInventorySection, genManifestSection } from '../utils/template.mjs';

async function process() {
    try {
        const content = await contentService.readInput();
        const { html, info } = await contentService.processContent(content);

        console.log(`Processing item with UID: ${info.id} (Type: ${info.type})`);

        await contentService.saveMarkdown(info.id, content);

        await infoService.addItem(info, info.type);
        await contentService.saveHtml(info.slug, html, info.type);

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

        console.log(`Successfully processed item: ${info.heading} (UID: ${info.id})`);
    } catch (error) {
        console.error(`\n\x1b[31m[ERROR]\x1b[0m ${error.message}\n`);
        process.exit(1);
    }
}

export { process };