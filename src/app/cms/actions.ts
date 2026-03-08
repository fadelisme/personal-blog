"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function createPost(formData: FormData) {
    const title = formData.get("title") as string;
    const slug = formData.get("slug") as string;
    const content = formData.get("content") as string;
    const excerpt = formData.get("excerpt") as string;
    const published = formData.get("published") === "on";
    const selectedCategoryIdsStr = formData.get("selectedCategoryIds") as string;
    const categoryIds = selectedCategoryIdsStr ? selectedCategoryIdsStr.split(",") : [];

    try {
        await prisma.post.create({
            data: {
                title, slug, content, excerpt, published,
                categories: {
                    connect: categoryIds.map((id) => ({ id }))
                }
            }
        });
    } catch (error) {
        console.error("Failed to create post", error);
        throw new Error("Failed to create post");
    }

    revalidatePath("/writings");
    revalidatePath("/cms");
    redirect("/cms");
}

export async function updatePost(id: string, formData: FormData) {
    const title = formData.get("title") as string;
    const slug = formData.get("slug") as string;
    const content = formData.get("content") as string;
    const excerpt = formData.get("excerpt") as string;
    const published = formData.get("published") === "on";
    const categoryIds = formData.getAll("categories") as string[];

    try {
        await prisma.post.update({
            where: { id },
            data: {
                title, slug, content, excerpt, published,
                categories: {
                    set: categoryIds.map((id) => ({ id }))
                }
            }
        });
    } catch (error) {
        console.error("Failed to update post", error);
        throw new Error("Failed to update post");
    }

    revalidatePath("/writings");
    revalidatePath(`/writings/${slug}`);
    revalidatePath("/cms");
    redirect("/cms");
}

export async function deletePost(id: string) {
    await prisma.post.delete({ where: { id } });
    revalidatePath("/writings");
    revalidatePath("/cms");
}

export async function createCategory(name: string) {
    const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');

    try {
        const category = await prisma.category.create({
            data: { name, slug }
        });
        revalidatePath("/cms/new");
        revalidatePath("/cms/edit/[id]", "page");
        return { success: true, category };
    } catch (error) {
        console.error("Failed to create category", error);
        return { success: false, error: "Failed to create category" };
    }
}
