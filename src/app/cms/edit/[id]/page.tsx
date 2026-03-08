import PostEditor from "@/components/PostEditor";
import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";

export const dynamic = 'force-dynamic';

type Params = Promise<{ id: string }>;

export async function generateMetadata({ params }: { params: Params }) {
    const { id } = await params;
    const post = await prisma.post.findUnique({ where: { id } });
    if (!post) return { title: "Not Found | CMS" };
    return { title: `Edit ${post.title} | CMS` };
}

export default async function EditPostPage({ params }: { params: Params }) {
    const { id } = await params;
    const [post, categories] = await Promise.all([
        prisma.post.findUnique({
            where: { id },
            include: { categories: true }
        }),
        prisma.category.findMany({ orderBy: { name: 'asc' } })
    ]);

    if (!post) {
        notFound();
    }

    return <PostEditor post={post} categories={categories} />;
}
