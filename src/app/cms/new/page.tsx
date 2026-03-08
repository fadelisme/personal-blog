import PostEditor from "@/components/PostEditor";
import { prisma } from "@/lib/prisma";

export const dynamic = 'force-dynamic';
export const metadata = { title: "New Post | CMS" };

export default async function NewPostPage() {
    const categories = await prisma.category.findMany({ orderBy: { name: 'asc' } });
    return <PostEditor categories={categories} />;
}
