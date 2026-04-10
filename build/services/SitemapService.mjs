import { infoService } from './InfoService.mjs';
import { writeFile } from '../utils/fs.mjs';
import { config } from '../config/index.mjs';

class SitemapService {
    async update() {
        const info = await infoService.load();
        const baseUrl = 'https://fws-supply.website';
        
        const allItems = [
            ...(info.inventory || []),
            ...(info.manifest || []),
            ...(info.asset || [])
        ];

        // Sort items by timestamp descending to find latest
        const sortedItems = [...allItems].sort((a, b) => (b.timestamp || 0) - (a.timestamp || 0));
        const latestTimestamp = sortedItems[0]?.timestamp || Date.now();
        const lastModDate = new Date(latestTimestamp).toISOString().split('T')[0];

        let xml = `<?xml version="1.0" encoding="UTF-8"?>\n`;
        xml += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;
        
        // Root Page
        xml += `  <url>\n    <loc>${baseUrl}/</loc>\n    <lastmod>${lastModDate}</lastmod>\n    <changefreq>daily</changefreq>\n    <priority>1.0</priority>\n  </url>\n`;

        // Other main pages
        const mainPages = [
            { url: '/pages/inventory', priority: '0.8' },
            { url: '/pages/manifest', priority: '0.8' },
            { url: '/pages/asset', priority: '0.8' }
        ];

        for (const page of mainPages) {
            xml += `  <url>\n    <loc>${baseUrl}${page.url}</loc>\n    <lastmod>${lastModDate}</lastmod>\n    <changefreq>weekly</changefreq>\n    <priority>${page.priority}</priority>\n  </url>\n`;
        }

        // Inventory & Manifest Items
        for (const item of allItems) {
            const itemDate = new Date(item.timestamp || latestTimestamp).toISOString().split('T')[0];
            
            if (item.url) {
                xml += `  <url>\n    <loc>${baseUrl}${item.url}</loc>\n    <lastmod>${itemDate}</lastmod>\n    <changefreq>monthly</changefreq>\n    <priority>0.6</priority>\n  </url>\n`;
            }

            if (item.demo) {
                // Ensure demo URL starts with / if not empty and doesn't already
                const demoUrl = item.demo.startsWith('/') ? item.demo : `/${item.demo}`;
                xml += `  <url>\n    <loc>${baseUrl}${demoUrl}</loc>\n    <lastmod>${itemDate}</lastmod>\n    <changefreq>monthly</changefreq>\n    <priority>0.5</priority>\n  </url>\n`;
            }
        }

        xml += `</urlset>`;

        await writeFile(config.files.sitemap, xml);
    }
}

export const sitemapService = new SitemapService();
