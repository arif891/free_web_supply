import path from 'node:path';
import { readFile, writeFile } from '../utils/fs.mjs';
import { createSlug } from '../utils/helper.mjs';
import { parseInfo, extractInfo, removeInfo, extractMainInfo, removeMainInfo } from '../utils/info.mjs';
import { genDefault, genRoot } from '../utils/template.mjs';
import { marked } from '../lib/marked/marked.mjs';
import { config } from '../config/index.mjs';

class ContentService {
    async readInput() {
        return await readFile(config.files.in.markdown);
    }

    async resetInput() {
        await writeFile(path.join(config.files.in.markdown), genDefault());
    }

    async processContent(content) {
        const itemInfo = await this.extractMetadata(content);
        const cleanedContent = await this.cleanContent(content);
        const htmlFragment = await marked.parse(cleanedContent);
        const fullHtml = genRoot(htmlFragment, undefined, undefined, itemInfo);

        return {
            html: fullHtml,
            info: itemInfo,
            slug: createSlug(itemInfo.heading)
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

    async cleanContent(content) {
        let updatedContent = removeInfo(content);
        updatedContent = removeMainInfo(updatedContent);
        return updatedContent;
    }
}

export const contentService = new ContentService();
