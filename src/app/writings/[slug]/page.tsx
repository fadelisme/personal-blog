import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import parse from "html-react-parser";
import { format } from "date-fns";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

type Params = Promise<{ slug: string }>;

export async function generateMetadata({ params }: { params: Params }) {
    const { slug } = await params;
    const post = await prisma.post.findUnique({ where: { slug } });
    if (!post) return { title: "404 - Not Found" };
    return { title: `${post.title} | Fadelisme` };
}

export default async function PostPage({ params }: { params: Params }) {
    const { slug } = await params;
    const post = await prisma.post.findUnique({
        where: { slug }
    });

    if (!post) {
        notFound();
    }

    return (
        <article className="max-w-3xl mx-auto px-4 w-full py-24 sm:py-32">

            <div className="w-full max-w-3xl mx-auto mt-24 md:mt-32">
                <Link href="/writings" className="inline-flex items-center text-sm font-medium text-zinc-500 hover:text-foreground transition-colors mb-10 group">
                    <ArrowLeft size={16} className="mr-2 group-hover:-translate-x-1 transition-transform" />
                    Back
                </Link>

                <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-foreground leading-[1.1] mb-6 pb-2">
                    {post.title}
                </h1>

                <div className="flex items-center gap-4 text-sm text-zinc-600 dark:text-zinc-500 border-b border-black/10 dark:border-white/10 pb-8">
                    <time dateTime={post.createdAt.toISOString()}>
                        {format(new Date(post.createdAt), 'MMMM d, yyyy')}
                    </time>
                    <span className="w-1 h-1 rounded-full bg-zinc-700" />
                </div>
            </div>

            {/* Content Body Using Tailwind Typography */}
            <div className="prose prose-zinc dark:prose-invert prose-lg md:prose-xl max-w-none text-zinc-700 dark:text-zinc-400 hover:prose-a:text-indigo-600 dark:hover:prose-a:text-indigo-400 prose-a:transition-colors prose-pre:bg-zinc-100 dark:prose-pre:bg-zinc-900/50 prose-pre:border prose-pre:border-black/5 dark:prose-pre:border-white/10 prose-pre:backdrop-blur prose-img:rounded-xl prose-img:border prose-img:border-black/5 dark:prose-img:border-white/10 prose-headings:text-zinc-900 dark:prose-headings:text-zinc-100 prose-strong:text-zinc-900 dark:prose-strong:text-zinc-200 prose-blockquote:border-l-indigo-500 prose-blockquote:text-zinc-600 dark:prose-blockquote:text-zinc-400 font-sans leading-relaxed tracking-normal mt-12 mb-24">
                {parse(post.content)}
            </div>

            <div className="mt-24 pt-8 border-t border-black/10 dark:border-white/10 flex items-center justify-between text-sm text-zinc-600 dark:text-zinc-500">
                <span>End of Document</span>
                <span className="font-mono opacity-50">{post.id.slice(-8).toUpperCase()}</span>
            </div>
        </article>
    );
}
