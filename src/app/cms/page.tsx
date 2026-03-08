import { prisma } from "@/lib/prisma";
import { format } from "date-fns";
import Link from "next/link";
import { Plus, PenTool, Trash2, Terminal, ExternalLink } from "lucide-react";
import { deletePost } from "./actions";

export const metadata = { title: "CMS Dashboard" };

export default async function CMSDashboard() {
    const posts = await prisma.post.findMany({
        orderBy: { createdAt: "desc" },
    });

    return (
        <div className="max-w-5xl mx-auto px-4 w-full py-20 font-sans">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-12 gap-6">
                <div>
                    <div className="flex items-center gap-3 text-indigo-400 mb-2">
                        <Terminal size={18} />
                        <span className="text-xs font-mono tracking-widest uppercase">System Console</span>
                    </div>
                    <h1 className="text-3xl font-bold tracking-tight text-white">CMS Dashboard</h1>
                    <p className="text-zinc-500 mt-2 text-sm">Manage your writings and publications.</p>
                </div>
                <Link
                    href="/cms/new"
                    className="group relative flex items-center gap-2 px-5 py-2.5 bg-white text-black font-medium text-sm rounded-full hover:bg-zinc-200 transition-all active:scale-95 glow-btn"
                >
                    <Plus size={16} /> New Post
                </Link>
            </div>

            <div className="glass-panel rounded-2xl overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm">
                        <thead className="bg-white/[0.02] border-b border-white/10 text-zinc-500 text-xs uppercase tracking-wider font-mono">
                            <tr>
                                <th className="px-6 py-4 font-medium">Title</th>
                                <th className="px-6 py-4 font-medium hidden sm:table-cell">Status</th>
                                <th className="px-6 py-4 font-medium">Date</th>
                                <th className="px-6 py-4 font-medium text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/[0.05]">
                            {posts.map((post: any) => (
                                <tr key={post.id} className="hover:bg-white/[0.02] transition-colors group">
                                    <td className="px-6 py-4">
                                        <Link href={`/cms/edit/${post.id}`} className="block">
                                            <div className="font-medium text-zinc-200 group-hover:text-indigo-400 transition-colors py-1">{post.title}</div>
                                            <div className="text-zinc-600 text-xs mt-1 max-w-[300px] truncate">{post.slug}</div>
                                        </Link>
                                    </td>
                                    <td className="px-6 py-4 hidden sm:table-cell">
                                        <span className={`inline-flex items-center px-2 py-1 rounded bg-white/[0.05] border text-xs font-mono
                                            ${post.published
                                                ? 'border-indigo-500/30 text-indigo-400'
                                                : 'border-zinc-500/30 text-zinc-400'}`}
                                        >
                                            <span className={`w-1.5 h-1.5 rounded-full mr-2 ${post.published ? 'bg-indigo-500' : 'bg-zinc-500'}`} />
                                            {post.published ? 'Published' : 'Draft'}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-zinc-500 font-mono text-xs whitespace-nowrap">
                                        {format(new Date(post.createdAt), 'MMM d, yyyy')}
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <div className="flex items-center justify-end gap-1 opacity-50 group-hover:opacity-100 transition-opacity">
                                            <Link href={`/writings/${post.slug}`} target="_blank" className="text-zinc-400 hover:text-white transition p-2 bg-transparent hover:bg-white/10 rounded-md" title="View Public Post">
                                                <ExternalLink size={14} />
                                            </Link>
                                            <Link href={`/cms/edit/${post.id}`} className="text-zinc-400 hover:text-indigo-400 transition p-2 bg-transparent hover:bg-white/10 rounded-md" title="Edit Post">
                                                <PenTool size={14} />
                                            </Link>
                                            <form action={async () => {
                                                "use server";
                                                await deletePost(post.id);
                                            }}>
                                                <button type="submit" className="text-zinc-400 hover:text-red-400 transition p-2 bg-transparent hover:bg-white/10 rounded-md" title="Delete Post">
                                                    <Trash2 size={14} />
                                                </button>
                                            </form>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                            {posts.length === 0 && (
                                <tr>
                                    <td colSpan={4} className="px-6 py-12 text-center text-zinc-500 font-mono text-sm border-t border-white/5">
                                        &gt; No records located in the database.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
