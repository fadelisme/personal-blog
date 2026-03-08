"use client";

import { useState, useTransition } from "react";
import { createPost, updatePost, createCategory } from "@/app/cms/actions";
import Link from "next/link";
import { ArrowLeft, Save, Terminal, Plus, Loader2 } from "lucide-react";
import { Post, Category } from "@prisma/client";
import dynamic from "next/dynamic";

const BlockNoteEditor = dynamic(() => import("./BlockNoteEditor"), { ssr: false });

type PostWithCategories = Post & { categories: Category[] };

export default function PostEditor({
    post,
    categories: initialCategories
}: {
    post?: PostWithCategories | null,
    categories: Category[]
}) {
    const [loading, setLoading] = useState(false);
    const [isPending, startTransition] = useTransition();
    const [contentHtml, setContentHtml] = useState(post?.content || "");
    const [categories, setCategories] = useState<Category[]>(initialCategories);
    const [newCategoryName, setNewCategoryName] = useState("");
    const [selectedCategoryIds, setSelectedCategoryIds] = useState<Set<string>>(
        new Set(post?.categories.map((c: Category) => c.id) || [])
    );

    const handleCategoryToggle = (id: string) => {
        const newSet = new Set(selectedCategoryIds);
        if (newSet.has(id)) {
            newSet.delete(id);
        } else {
            newSet.add(id);
        }
        setSelectedCategoryIds(newSet);
    };

    const handleCreateCategory = async (e: React.MouseEvent) => {
        e.preventDefault();
        if (!newCategoryName.trim()) return;

        startTransition(async () => {
            const result = await createCategory(newCategoryName.trim());
            if (result.success && result.category) {
                setCategories((prev) => [...prev, result.category!].sort((a, b) => a.name.localeCompare(b.name)));
                setSelectedCategoryIds((prev) => new Set(prev).add(result.category!.id));
                setNewCategoryName("");
            } else {
                alert("Failed to create category. It might already exist.");
            }
        });
    };

    async function handleSubmit(formData: FormData) {
        setLoading(true);
        // Append selected category IDs to the form data
        formData.append("selectedCategoryIds", Array.from(selectedCategoryIds).join(','));

        try {
            if (post) {
                await updatePost(post.id, formData);
            } else {
                await createPost(formData);
            }
        } catch (error) {
            console.error(error);
            setLoading(false);
            alert("Failed to save post");
        }
    }

    return (
        <div className="max-w-4xl mx-auto px-4 w-full py-20 font-sans">
            <Link href="/cms" className="inline-flex items-center text-sm font-medium text-zinc-500 hover:text-white mb-10 transition-colors group">
                <ArrowLeft size={16} className="mr-2 transition-transform group-hover:-translate-x-1" /> Back to CMS
            </Link>

            <div className="glass-panel rounded-2xl p-8 md:p-12 shadow-2xl relative overflow-hidden">
                {/* Subtle gradient accent */}
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-indigo-500 opacity-50" />

                <div className="flex items-center gap-3 text-indigo-400 mb-6">
                    <Terminal size={18} />
                    <span className="text-xs font-mono tracking-widest uppercase">
                        {post ? "UPDATE_RECORD" : "NEW_RECORD"}
                    </span>
                </div>

                <h1 className="text-3xl font-bold tracking-tight text-white mb-10">
                    {post ? "Edit Post" : "Draft New Idea"}
                </h1>

                <form action={handleSubmit} className="space-y-8">
                    <div className="space-y-3">
                        <label htmlFor="title" className="text-xs font-mono text-zinc-400 uppercase tracking-wider block">Title</label>
                        <input
                            id="title"
                            name="title"
                            required
                            defaultValue={post?.title}
                            placeholder="A brilliant thought..."
                            className="w-full bg-black/50 border border-white/10 rounded-lg p-4 text-white text-lg focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all font-medium placeholder:text-zinc-700"
                        />
                    </div>

                    <div className="space-y-3">
                        <label htmlFor="slug" className="text-xs font-mono text-zinc-400 uppercase tracking-wider block">Slug</label>
                        <div className="flex items-center bg-black/50 border border-white/10 rounded-lg overflow-hidden focus-within:border-indigo-500 focus-within:ring-1 focus-within:ring-indigo-500 transition-all">
                            <span className="pl-4 text-zinc-600 font-mono text-sm select-none">/writings/</span>
                            <input
                                id="slug"
                                name="slug"
                                required
                                defaultValue={post?.slug}
                                placeholder="my-brilliant-thought"
                                className="w-full bg-transparent p-3 text-indigo-300 focus:outline-none font-mono text-sm placeholder:text-zinc-700"
                            />
                        </div>
                    </div>

                    <div className="space-y-3">
                        <label htmlFor="excerpt" className="text-xs font-mono text-zinc-400 uppercase tracking-wider block">Description (Optional)</label>
                        <textarea
                            id="excerpt"
                            name="excerpt"
                            defaultValue={post?.excerpt || ""}
                            placeholder="A short summary description of this piece..."
                            className="w-full bg-black/50 border border-white/10 rounded-lg p-4 text-zinc-300 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all h-24 placeholder:text-zinc-700 leading-relaxed resize-none"
                        />
                    </div>

                    <div className="space-y-3">
                        <label className="text-xs font-mono text-zinc-400 uppercase tracking-wider flex justify-between items-end">
                            <span>Categories</span>
                            <div className="flex items-center gap-2">
                                <input
                                    type="text"
                                    placeholder="New category..."
                                    value={newCategoryName}
                                    onChange={(e) => setNewCategoryName(e.target.value)}
                                    className="bg-black/50 border border-white/10 rounded px-3 py-1 text-sm text-white focus:outline-none focus:border-indigo-500 transition-colors w-32 md:w-48 placeholder:text-zinc-600"
                                    onKeyDown={(e) => {
                                        if (e.key === 'Enter') {
                                            e.preventDefault();
                                            handleCreateCategory(e as any);
                                        }
                                    }}
                                />
                                <button
                                    type="button"
                                    onClick={handleCreateCategory}
                                    disabled={isPending || !newCategoryName.trim()}
                                    className="bg-indigo-500/20 text-indigo-400 border border-indigo-500/30 rounded px-2 py-1 flex items-center gap-1 text-xs hover:bg-indigo-500/30 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {isPending ? <Loader2 size={14} className="animate-spin" /> : <Plus size={14} />} Add
                                </button>
                            </div>
                        </label>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 bg-black/30 border border-white/5 rounded-xl p-5 max-h-60 overflow-y-auto custom-scrollbar">
                            {categories.map((cat) => {
                                const isChecked = selectedCategoryIds.has(cat.id);
                                return (
                                    <label key={cat.id} className="flex items-center gap-2 cursor-pointer group">
                                        <input
                                            type="checkbox"
                                            name="categories"
                                            value={cat.id}
                                            checked={isChecked}
                                            onChange={() => handleCategoryToggle(cat.id)}
                                            className="h-4 w-4 rounded border-white/20 bg-black/50 text-indigo-500 focus:ring-indigo-500 focus:ring-offset-black cursor-pointer"
                                        />
                                        <span className="text-sm text-zinc-400 group-hover:text-zinc-200 transition-colors">{cat.name}</span>
                                    </label>
                                );
                            })}
                        </div>
                    </div>

                    <div className="space-y-3">
                        <label htmlFor="content" className="text-xs font-mono text-zinc-400 uppercase tracking-wider flex justify-between">
                            <span>Content</span>
                            <span className="text-indigo-500/50">BLOCK_EDITOR</span>
                        </label>
                        <input type="hidden" name="content" value={contentHtml} />
                        <div className="w-full bg-[#050505] border border-white/10 rounded-lg p-2 text-zinc-300 transition-all font-sans">
                            <BlockNoteEditor initialHTML={post?.content} onChange={setContentHtml} />
                        </div>
                    </div>

                    <div className="flex items-center gap-4 py-6 border-t border-white/10 mt-8">
                        <div className="relative flex items-start">
                            <div className="flex h-6 items-center">
                                <input
                                    type="checkbox"
                                    id="published"
                                    name="published"
                                    defaultChecked={post ? post.published : true}
                                    className="h-5 w-5 rounded border-white/20 bg-black/50 text-indigo-500 focus:ring-indigo-500 focus:ring-offset-black cursor-pointer"
                                />
                            </div>
                            <div className="ml-3 text-sm leading-6">
                                <label htmlFor="published" className="font-medium text-white cursor-pointer">Published to public</label>
                                <p className="text-zinc-500">Enable to make this post visible on your site.</p>
                            </div>
                        </div>
                    </div>

                    <div className="flex justify-end pt-4">
                        <button
                            type="submit"
                            disabled={loading}
                            className="group relative flex items-center gap-2 px-8 py-3 bg-white text-black font-medium text-sm rounded-full hover:bg-zinc-200 transition-all active:scale-95 glow-btn disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            <Save size={16} /> {loading ? "Executing..." : "Save Record"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
