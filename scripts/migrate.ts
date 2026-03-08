import 'dotenv/config';
import { PrismaClient } from '@prisma/client';
import * as fs from 'fs';
import * as xml2js from 'xml2js';

const prisma = new PrismaClient();

async function main() {
    const xml = fs.readFileSync('/Users/fadhel/Downloads/fadelisme.WordPress.2026-03-07.xml', 'utf-8');
    const parser = new xml2js.Parser();
    const parsed = await parser.parseStringPromise(xml);

    const channel = parsed.rss.channel[0];
    const items = channel.item || [];

    console.log(`Found ${items.length} total items in XML`);
    let importedCount = 0;

    for (const item of items) {
        const title = item.title ? item.title[0] : 'Untitled';
        let slug = item['wp:post_name'] ? item['wp:post_name'][0] : undefined;

        if (!slug) {
            slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
        }

        // Fallback if slug is still empty
        if (!slug) {
            slug = `post-${Date.now()}-${Math.random().toString(36).substring(7)}`;
        }

        const content = item['content:encoded'] ? item['content:encoded'][0] : '';
        const postType = item['wp:post_type'] ? item['wp:post_type'][0] : '';
        const status = item['wp:status'] ? item['wp:status'][0] : '';
        const postDate = item['wp:post_date'] ? item['wp:post_date'][0] : new Date().toISOString();

        if (postType !== 'post' || status !== 'publish') {
            continue;
        }

        // Extract categories
        const rawCategories = item.category || [];
        const wpCategories = rawCategories
            .filter((c: any) => c.$ && c.$.domain === 'category')
            .map((c: any) => ({
                name: c._ || c.$.nicename,
                slug: c.$.nicename,
            }))
            .filter((c: any) => c.name && c.slug);

        const categoryConnections = wpCategories.map((cat: any) => ({
            where: { slug: cat.slug },
            create: { name: cat.name, slug: cat.slug },
        }));

        try {
            await prisma.post.upsert({
                where: { slug: slug },
                update: {
                    title,
                    content,
                    published: true,
                    createdAt: new Date(postDate),
                    categories: {
                        connectOrCreate: categoryConnections,
                    }
                },
                create: {
                    title,
                    slug,
                    content,
                    published: true,
                    createdAt: new Date(postDate),
                    updatedAt: new Date(postDate),
                    categories: {
                        connectOrCreate: categoryConnections,
                    }
                }
            });
            importedCount++;
            if (importedCount % 10 === 0) {
                console.log(`Imported ${importedCount} posts...`);
            }
        } catch (error) {
            console.error(`Error importing: ${title}`, error);
        }
    }

    console.log(`Migration complete! Successfully imported ${importedCount} published posts.`);
}

main()
    .catch(e => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
