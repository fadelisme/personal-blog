"use client";

import { useCreateBlockNote } from "@blocknote/react";
import { BlockNoteView } from "@blocknote/shadcn";
import "@blocknote/core/fonts/inter.css";
import "@blocknote/shadcn/style.css";
import { useEffect, useState } from "react";
import { PartialBlock } from "@blocknote/core";

function BlockNoteInner({
    initialBlocks,
    onChange
}: {
    initialBlocks?: PartialBlock[];
    onChange: (html: string) => void;
}) {
    const editor = useCreateBlockNote({
        initialContent: initialBlocks,
    });

    return (
        <div className="relative min-h-[500px]">
            <BlockNoteView
                editor={editor}
                theme="dark"
                onChange={async () => {
                    const html = await editor.blocksToHTMLLossy(editor.document);
                    onChange(html);
                }}
            />
        </div>
    );
}

export default function BlockNoteEditor({
    initialHTML,
    onChange,
}: {
    initialHTML?: string;
    onChange: (html: string) => void;
}) {
    const [initialBlocks, setInitialBlocks] = useState<PartialBlock[] | undefined | "loading">("loading");

    useEffect(() => {
        if (!initialHTML) {
            setInitialBlocks(undefined);
            return;
        }

        // Parse HTML asynchronously using a temporary editor
        import("@blocknote/core").then(({ BlockNoteEditor }) => {
            const tempEditor = BlockNoteEditor.create();
            // tryParseHTMLToBlocks is synchronous in recent versions
            const blocks = tempEditor.tryParseHTMLToBlocks(initialHTML);
            setInitialBlocks(blocks as any);
        });
    }, [initialHTML]);

    if (initialBlocks === "loading") {
        return (
            <div className="flex items-center justify-center min-h-[500px] text-zinc-500 font-mono text-sm animate-pulse">
                Initializing Editor System...
            </div>
        );
    }

    return <BlockNoteInner initialBlocks={initialBlocks as PartialBlock[] | undefined} onChange={onChange} />;
}
