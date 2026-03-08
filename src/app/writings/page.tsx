import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { format } from "date-fns";
import { ArrowLeft, ArrowRight } from "lucide-react";

export const metadata = {
    title: "Writings | Fadelisme",
    description: "Collection of thoughts, essays, and stories.",
};

export default async function WritingsPage({
    searchParams,
}: {
    searchParams: Promise<{ cat?: string }>;
}) {
    const activeCategory = (await searchParams).cat;

    const [categories, posts] = await Promise.all([
        prisma.category.findMany({
            where: { posts: { some: { published: true } } },
            orderBy: { name: 'asc' },
        }),
        prisma.post.findMany({
            where: {
                published: true,
                ...(activeCategory && { categories: { some: { slug: activeCategory } } })
            },
            orderBy: { createdAt: "desc" },
        })
    ]);

    // Assuming filteredPosts is derived from 'posts' based on some filter logic,
    // but for this faithful edit, it will just be 'posts' if no filtering state is introduced.
    const filteredPosts = posts;

    // Assuming setSelectedTag and selectedTag are state variables that would be defined
    // if this component were a client component or if a different state management was used.
    // For a server component, these would typically be handled via searchParams.
    // The provided edit introduces these, but they are not defined in the original context.
    // I will make the change as literally as possible, which might result in undefined variables
    // if this is a server component and these are meant for client-side interaction.
    // Given the context, I will assume `selectedTag` would be `activeCategory` and `setSelectedTag`
    // would be handled by `Link` components changing `searchParams`.
    const selectedTag = activeCategory;
    const setSelectedTag = (tag: string | null) => { /* This would typically navigate */ };


    return (
        <div className="flex flex-col min-h-screen px-4 py-20 bg-background relative selection:bg-indigo-500/30 selection:text-white pb-32">
            {/* Soft gradient orb for writings page - Removed as per instruction's new structure */}

            <div className="w-full max-w-4xl mx-auto mt-16 md:mt-24">
                <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground mb-6">
                    Writings
                </h1>
                <p className="text-zinc-400 text-lg max-w-xl">
                    A log of thoughts, reflections, and explorations.
                </p>
            </div>

            {/* Category Filter Pills (Ammo) */}
            {categories.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-10 relative z-10 w-full max-w-4xl mx-auto"> {/* Added max-w-4xl mx-auto */}
                    <Link
                        href="/writings"
                        className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-300 border ${!activeCategory
                            ? "bg-foreground text-background shadow-black/20" // Updated class
                            : "bg-black/5 dark:bg-white/5 text-zinc-600 dark:text-zinc-400 hover:bg-black/10 dark:hover:bg-white/10 hover:text-foreground" // Updated class
                            }`}
                    >
                        All
                    </Link>
                    {categories.map((cat: { id: string, name: string, slug: string }) => (
                        <Link // Changed from button to Link to maintain server component behavior
                            key={cat.id}
                            href={`/writings?cat=${cat.slug}`}
                            className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-300 border ${activeCategory === cat.slug
                                ? "bg-foreground text-background shadow-black/20" // Updated class
                                : "bg-black/5 dark:bg-white/5 text-zinc-600 dark:text-zinc-400 hover:bg-black/10 dark:hover:bg-white/10 hover:text-foreground" // Updated class
                                }`}
                        >
                            {cat.name}
                        </Link>
                    ))}
                </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative z-10 w-full max-w-4xl mx-auto"> {/* Added max-w-4xl mx-auto */}
                {filteredPosts.map((post: any) => ( // Changed posts to filteredPosts
                    <Link href={`/writings/${post.slug}`} key={post.id} className="group">
                        <article className="h-full rounded-2xl border border-black/10 dark:border-white/10 bg-white/5 dark:bg-white/5 backdrop-blur-sm p-6 sm:p-8 flex flex-col relative overflow-hidden transition-all duration-500 hover:bg-black/10 dark:hover:bg-white/10 hover:border-indigo-500/30"> {/* Updated class */}
                            {/* Subtle hover gradient */}
                            <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/5 blur-[50px] rounded-full pointer-events-none group-hover:bg-indigo-500/10 transition-colors duration-500" />

                            <h2 className="text-xl font-semibold text-foreground mb-3 group-hover:text-foreground transition-colors line-clamp-2"> {/* Updated class */}
                                {post.title}
                            </h2>

                            <p className="text-sm text-zinc-400 leading-relaxed line-clamp-3 mb-8 grow">
                                {post.excerpt || "Click to read more about this exploration."}
                            </p>

                            <div className="flex items-center justify-between mt-auto pt-4 border-t border-black/5 dark:border-white/5"> {/* Updated class */}
                                <time dateTime={post.createdAt.toISOString()} className="text-xs font-mono text-zinc-600 dark:text-zinc-500 uppercase tracking-wider"> {/* Updated class and formatDate */}
                                    {format(new Date(post.createdAt), 'MMM d, yyyy')}
                                </time>

                                <div className="w-8 h-8 rounded-full border border-black/10 dark:border-white/10 flex items-center justify-center bg-black/5 dark:bg-white/5 group-hover:bg-black/10 dark:group-hover:bg-white/10 transition-colors"> {/* Updated class */}
                                    <ArrowRight size={14} className="text-zinc-600 dark:text-zinc-400 group-hover:text-foreground group-hover:-rotate-45 transition-all duration-300" /> {/* Replaced ArrowLeft with ArrowRight and updated class */}
                                </div>
                            </div>
                        </article>
                    </Link>
                ))}
            </div>
            {filteredPosts.length === 0 && ( // Changed posts to filteredPosts
                <div className="py-24 text-center w-full max-w-4xl mx-auto border border-dashed border-black/10 dark:border-white/10 rounded-2xl bg-white/5 dark:bg-white/5"> {/* Updated class and added max-w-4xl mx-auto */}
                    <p className="text-zinc-600 dark:text-zinc-500 font-mono text-sm">No records found.</p> {/* Updated class */}
                </div>
            )}
        </div>
    );
}
