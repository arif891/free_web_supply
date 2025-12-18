import path from 'node:path';
import { readFile, writeFile } from '../utils/fs.mjs';
import { config } from '../config/index.mjs';

class InventoryService {
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

    async generateUid() {
        await this.load();
        // Assuming inventory is an array in mainInfo
        // If mainInfo is empty object, inventory might be undefined. Handle that.
        if (!this.mainInfo.inventory) {
            this.mainInfo.inventory = [];
        }
        return this.mainInfo.inventory.length + 1;
    }

    async addItem(item) {
        await this.load();
        if (!this.mainInfo.inventory) {
            this.mainInfo.inventory = [];
        }
        this.mainInfo.inventory.push(item);
        await this.save();
    }

    getMainInfo() {
        return this.mainInfo;
    }
}

export const inventoryService = new InventoryService();
