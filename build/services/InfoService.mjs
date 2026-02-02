import path from 'node:path';
import { readFile, writeFile } from '../utils/fs.mjs';
import { config } from '../config/index.mjs';

class InfoService {
    constructor() {
        this.infoPath = path.join(config.directories.info, config.files.info.build);
        this.mainInfo = null;
    }

    async load() {
        if (!this.mainInfo) {
            this.mainInfo = await readFile(this.infoPath).catch(() => '{}').then(JSON.parse);
        }
        return this.mainInfo;
    }

    async save() {
        if (this.mainInfo) {
            await writeFile(this.infoPath, JSON.stringify(this.mainInfo, null, 4));
        }
    }

    async generateUid(type = 'manifest') {
        await this.load();
        if (!this.mainInfo[type]) {
            this.mainInfo[type] = [];
        }
        return this.mainInfo[type].length + 1;
    }

    async addItem(item, type = 'manifest') {
        await this.load();
        if (!this.mainInfo[type]) {
            this.mainInfo[type] = [];
        }
        this.mainInfo[type].push(item);
        await this.save();
    }

    getMainInfo() {
        return this.mainInfo;
    }
}

export const infoService = new InfoService();
