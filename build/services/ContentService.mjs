import path from 'node:path';
import { infoService } from './InfoService.mjs';
import { readFile, writeFile } from '../utils/fs.mjs';
import { createSlug, replaceCommentContent } from '../utils/helper.mjs';
import { parseInfo, extractInfo, removeInfo, extractMainInfo, removeMainInfo } from '../utils/info.mjs';
import { genDefault, genRoot, genWidget, genInventorySection, genManifestSection } from '../utils/template.mjs';
import { marked } from '../lib/marked/marked.mjs';
import { config } from '../config/index.mjs';

class ContentService {
    async readInput() {
        return await readFile(config.files.in.markdown);
    }

    async readHome() {
        return await readFile(config.files.home);
    }

    async resetInput() {
        await writeFile(path.join(config.files.in.markdown), genDefault());
    }

    async processContent(content) {
        const itemInfo = await this.extractMetadata(content);
        const cleanedContent = await this.cleanContent(content);
        const htmlFragment = await marked.parse(cleanedContent);

        const uid = await infoService.generateUid(itemInfo?.type || 'manifest');
        const outDir = config.directories.out.html[itemInfo?.type] || config.directories.out.html.manifest;
        const finalItemInfo = {
            ...itemInfo,
            id: uid,
            timestamp: Date.now(),
            slug: createSlug(itemInfo.heading),
            date: new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" }),
            url: `/${outDir}${createSlug(itemInfo.heading)}/`
        };

        let leftContent = '';
        let rightContent = '';

        if (finalItemInfo?.type === 'manifest') {
            leftContent += genWidget('toc');
        }

        if (finalItemInfo?.type === 'inventory') {
            leftContent += genWidget('detail', finalItemInfo);

            if (finalItemInfo?.demo) {
                const actionInfo = {
                    buttons: {
                        'preview': finalItemInfo.demo,
                    }
                };
                rightContent += genWidget('action', actionInfo);
            }
        }

        const fullHtml = genRoot(htmlFragment, leftContent, rightContent, finalItemInfo);

        return {
            html: fullHtml,
            info: finalItemInfo,
        };
    }


    async saveMarkdown(uid, content) {
        await writeFile(path.join(config.directories.out.markdown, `item-${uid}.md`), content);
    }

    async saveHtml(slug, html, type = 'manifest') {
        const outDir = config.directories.out.html[type];
        await writeFile(path.join(outDir, slug, '/index.html'), html);
    }

    async extractMetadata(content) {
        let info = {};
        const infoBlock = extractInfo(content);
        if (infoBlock) {
            info = parseInfo(infoBlock);
        }
        const mainInfo = extractMainInfo(content);

        if (!mainInfo.heading) {
            throw new Error('At least one heading with # is required');
        }

        if (!mainInfo.thumbnail) {
            mainInfo.thumbnail = config.files.default.thumbnail;
            console.log('Thumbnail not found, using default thumbnail');
        }

        return { ...mainInfo, ...info };
    }

    async updateHomePage(inventoryHtml, manifestHtml) {
        let homeHtml = await this.readHome();

        if (inventoryHtml) {
            homeHtml = replaceCommentContent(homeHtml, inventoryHtml, 'inventory');
        }

        if (manifestHtml) {
            homeHtml = replaceCommentContent(homeHtml, manifestHtml, 'manifest');
        }

        await writeFile(config.files.home, homeHtml);
    }

    async updateInventoryPage(html) {
        let indexHtml = await readFile(path.join(config.directories.out.html.inventory, 'index.html'));
        indexHtml = replaceCommentContent(indexHtml, html, 'inventory');
        await writeFile(path.join(config.directories.out.html.inventory, 'index.html'), indexHtml);
    }

    async updateManifestPage(html) {
        let indexHtml = await readFile(path.join(config.directories.out.html.manifest, 'index.html'));
        indexHtml = replaceCommentContent(indexHtml, html, 'manifest');
        await writeFile(path.join(config.directories.out.html.manifest, 'index.html'), indexHtml);
    }

    async cleanContent(content) {
        let updatedContent = removeInfo(content);
        updatedContent = removeMainInfo(updatedContent);
        return updatedContent;
    }
}

export const contentService = new ContentService();
